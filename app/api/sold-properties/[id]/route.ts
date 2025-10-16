import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Fetch sold property with images and agent info
    const { data: property, error } = await supabase
      .from("property_listings")
      .select(
        `
        id,
        title,
        description,
        street_address,
        city,
        state,
        zipcode,
        list_price,
        sold_price,
        sold_at,
        bedrooms,
        bathrooms,
        square_feet,
        property_type,
        year_built,
        lot_size,
        lot_size_unit,
        contact_name,
        contact_email,
        contact_phone,
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
      .eq("id", id)
      .eq("status", "sold") // Only return sold properties
      .single();

    if (error || !property) {
      console.error("Error fetching sold property:", error);
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 },
      );
    }

    // Format the response
    const formattedProperty = {
      ...property,
      images: property.property_images || [],
    };

    // Remove property_images key since we moved it to images
    delete (formattedProperty as any).property_images;

    return NextResponse.json({
      property: formattedProperty,
    });
  } catch (error) {
    console.error("Sold property detail API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
