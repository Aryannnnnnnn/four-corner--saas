// app/api/property-listings/route.ts
import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";

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
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().min(0),
  square_feet: z.number().int().min(1),
  lot_size: z.number().min(0),
  lot_size_unit: z.string().optional(),
  year_built: z.number().int().min(1800).max(new Date().getFullYear() + 2),
  stories: z.number().int().min(1).optional(),
  garage_spaces: z.number().int().min(0).optional(),
  list_price: z.number().min(0),
  hoa_fees: z.number().min(0).optional(),
  property_tax: z.number().min(0).optional(),
  contact_name: z.string().min(1).max(100),
  contact_email: z.string().email().max(255),
  contact_phone: z.string().min(1).max(20),
  features: z.record(z.string(), z.any()).optional(),
  images: z.array(z.object({
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
  })).min(1).max(35),
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
      console.error("Database error:", error);
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
    console.error("Fetch listings error:", error);
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

    const body = await req.json();

    // Validate input
    try {
      var validatedData = propertyListingSchema.parse(body);
    } catch (validationError: any) {
      console.error("Validation error:", validationError);
      if (validationError.errors) {
        const errorMessages = validationError.errors.map((err: any) => 
          `${err.path.join('.')}: ${err.message}`
        ).join(', ');
        return NextResponse.json(
          { error: "Validation failed", message: errorMessages, details: validationError.errors },
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
    console.log("Attempting to insert listing for user:", session.user.id);
    console.log("Listing data:", listingToInsert);
    
    const { data: listing, error: listingError } = await supabase
      .from("property_listings")
      .insert(listingToInsert)
      .select()
      .single();

    if (listingError) {
      console.error("Listing creation error:", listingError);
      console.error("Error details:", JSON.stringify(listingError, null, 2));
      return NextResponse.json(
        { error: "Failed to create listing", details: listingError.message || listingError },
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
      console.error("Images insertion error:", imagesError);
      // Rollback: delete the listing
      await supabase.from("property_listings").delete().eq("id", listing.id);
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

    return NextResponse.json(
      {
        success: true,
        listing: completeListing,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create listing error:", error);

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
