import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const { data: isAdminData } = await supabase.rpc("is_admin", {
      user_email: session.user.email,
    });

    if (!isAdminData) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get status from query params
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");

    let query = supabase
      .from("property_listings")
      .select(
        `
        id,
        title,
        created_at,
        status,
        list_price,
        city,
        state,
        street_address,
        property_type,
        bedrooms,
        bathrooms,
        square_feet,
        contact_name,
        contact_email,
        contact_phone,
        rejection_reason,
        property_images (
          id,
          s3_url,
          thumbnail_small_url,
          thumbnail_medium_url,
          thumbnail_large_url,
          display_order,
          is_primary
        )
      `,
      )
      .order("created_at", { ascending: false });

    // Filter by status if provided
    if (status) {
      query = query.eq("status", status);
    }

    const { data: listings, error } = await query;

    if (error) {
      console.error("Error fetching listings:", error);
      return NextResponse.json(
        { error: "Failed to fetch listings" },
        { status: 500 },
      );
    }

    // Format the data
    const formattedListings = listings?.map((listing: any) => ({
      ...listing,
      images: listing.property_images || [],
    }));

    return NextResponse.json({ listings: formattedListings || [] });
  } catch (error) {
    console.error("Admin listings API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
