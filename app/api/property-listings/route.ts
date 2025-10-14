// app/api/property-listings/route.ts
import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { logger } from "@/app/lib/utils/logger";
import { deletePropertyImages } from "@/app/lib/utils/s3";
import { propertyListingRatelimit } from "@/app/lib/ratelimit";
import {
  logActivity,
  getIpFromRequest,
  getUserAgentFromRequest,
} from "@/app/lib/utils/activityLogger";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});

// Validation schema
const propertyListingSchema = z.object({
  title: z.string().min(10).max(200),
  description: z.string().min(50),
  street_address: z.string().min(5).max(255),
  city: z.string().min(2).max(100),
  state: z.string().length(2),
  zipcode: z.string().min(5).max(10),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  property_type: z.string().min(1),
  listing_type: z.enum(["sale", "rent"]),
  // Allow -1 for N/A, or any number >= 0
  bedrooms: z.number().int().refine((val) => val === -1 || val >= 0, {
    message: "Must be -1 (N/A) or a positive number",
  }),
  bathrooms: z.number().refine((val) => val === -1 || val >= 0, {
    message: "Must be -1 (N/A) or a positive number",
  }),
  square_feet: z.number().int().refine((val) => val === -1 || val >= 1, {
    message: "Must be -1 (N/A) or at least 1",
  }),
  lot_size: z.number().refine((val) => val === -1 || val >= 0, {
    message: "Must be -1 (N/A) or a positive number",
  }),
  lot_size_unit: z.string().optional(),
  year_built: z
    .number()
    .int()
    .refine((val) => val === -1 || (val >= 1800 && val <= new Date().getFullYear() + 2), {
      message: `Must be -1 (N/A) or between 1800 and ${new Date().getFullYear() + 2}`,
    }),
  stories: z.number().int().min(1).optional(),
  garage_spaces: z.number().int().min(0).optional(),
  list_price: z.number().min(0),
  hoa_fees: z.number().min(0).optional(),
  property_tax: z.number().min(0).optional(),
  contact_name: z.string().min(1).max(100),
  contact_email: z.string().email().max(255),
  contact_phone: z.string().min(1).max(20),
  features: z.record(z.string(), z.any()).optional(),
  images: z
    .array(
      z.object({
        s3Key: z.string(),
        s3Url: z.string(),
        thumbnailSmallUrl: z.string(),
        thumbnailMediumUrl: z.string(),
        thumbnailLargeUrl: z.string(),
        displayOrder: z.number(),
        isPrimary: z.boolean(),
        width: z.number(),
        height: z.number(),
        fileSize: z.number(),
        mimeType: z.string(),
        caption: z.string().optional(),
      }),
    )
    .min(1)
    .max(35),
  status: z.enum(["draft", "pending"]).optional(),
});

// GET - Fetch user's listings
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = supabase
      .from("property_listings")
      .select(`
        *,
        images:property_images(*)
      `)
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      logger.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch listings" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        listings: data || [],
        count: data?.length || 0,
      },
      { status: 200 },
    );
  } catch (error) {
    logger.error("Fetch listings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST - Create new property listing
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting - use user ID for authenticated requests
    const identifier = session.user.email || session.user.id;
    const { success, limit, reset, remaining } = await propertyListingRatelimit.limit(identifier);

    if (!success) {
      return NextResponse.json(
        {
          error: "Too many listing submissions. Please try again later.",
          rateLimit: {
            limit,
            remaining,
            reset: new Date(reset).toISOString(),
          },
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        },
      );
    }

    const body = await req.json();

    // Validate input
    try {
      var validatedData = propertyListingSchema.parse(body);
    } catch (validationError) {
      logger.error("Validation error:", validationError);
      if (validationError instanceof z.ZodError) {
        const errorMessages = validationError.issues
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");
        return NextResponse.json(
          {
            error: "Validation failed",
            message: errorMessages,
            details: validationError.issues,
          },
          { status: 400 },
        );
      }
      return NextResponse.json(
        { error: "Validation failed", message: String(validationError) },
        { status: 400 },
      );
    }
    const { images, ...listingData } = validatedData;

    // Prepare listing data with defaults for optional fields
    const listingToInsert = {
      user_id: session.user.id,
      ...listingData,
      features: listingData.features || {},
      status: listingData.status || "pending",
    };

    // Start a transaction-like operation
    // 1. Insert the property listing
    logger.log("Attempting to insert listing for user:", session.user.id);
    logger.log("Listing data:", listingToInsert);

    const { data: listing, error: listingError } = await supabase
      .from("property_listings")
      .insert(listingToInsert)
      .select()
      .single();

    if (listingError) {
      logger.error("Listing creation error:", listingError);
      logger.error("Error details:", JSON.stringify(listingError, null, 2));
      return NextResponse.json(
        {
          error: "Failed to create listing",
          details: listingError.message || listingError,
        },
        { status: 500 },
      );
    }

    // 2. Insert the images
    const imageRecords = images.map((img) => ({
      property_listing_id: listing.id,
      s3_key: img.s3Key,
      s3_url: img.s3Url,
      thumbnail_small_url: img.thumbnailSmallUrl,
      thumbnail_medium_url: img.thumbnailMediumUrl,
      thumbnail_large_url: img.thumbnailLargeUrl,
      display_order: img.displayOrder,
      is_primary: img.isPrimary,
      width: img.width,
      height: img.height,
      file_size: img.fileSize,
      mime_type: img.mimeType,
      caption: img.caption,
    }));

    const { error: imagesError } = await supabase
      .from("property_images")
      .insert(imageRecords);

    if (imagesError) {
      logger.error("Images insertion error:", imagesError);
      // Rollback: delete the listing and cleanup S3 images
      await supabase.from("property_listings").delete().eq("id", listing.id);

      // Cleanup S3 images to prevent orphaned files
      try {
        const s3Keys = images.map((img) => img.s3Key);
        await deletePropertyImages(s3Keys);
        logger.log("Cleaned up S3 images after listing creation failure");
      } catch (s3Error) {
        logger.error("Failed to cleanup S3 images:", s3Error);
        // Don't fail the request, but log the error
      }

      return NextResponse.json(
        { error: "Failed to save images" },
        { status: 500 },
      );
    }

    // Fetch complete listing with images
    const { data: completeListing } = await supabase
      .from("property_listings")
      .select(`
        *,
        images:property_images(*)
      `)
      .eq("id", listing.id)
      .single();

    // Log listing creation activity
    try {
      await logActivity({
        userId: session.user.id,
        activityType: "listing_created",
        metadata: {
          listing_id: listing.id,
          title: listingData.title,
          property_type: listingData.property_type,
          listing_type: listingData.listing_type,
          list_price: listingData.list_price,
          status: listingToInsert.status,
          city: listingData.city,
          state: listingData.state,
        },
        ipAddress: getIpFromRequest(req),
        userAgent: getUserAgentFromRequest(req),
      });
    } catch (logError) {
      logger.error("Failed to log listing creation:", logError);
      // Don't fail the listing creation if logging fails
    }

    return NextResponse.json(
      {
        success: true,
        listing: completeListing,
      },
      { status: 201 },
    );
  } catch (error) {
    logger.error("Create listing error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create listing",
      },
      { status: 500 },
    );
  }
}
