import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET() {
  try {
    // Fetch sold properties with images
    const { data: soldProperties, error } = await supabase
      .from("property_listings")
      .select(
        `
        id,
        title,
        description,
        street_address,
        city,
        state,
        list_price,
        sold_price,
        sold_at,
        bedrooms,
        bathrooms,
        square_feet,
        property_images (
          id,
          s3_url,
          thumbnail_large_url,
          display_order,
          is_primary
        )
      `,
      )
      .eq("status", "sold")
      .order("sold_at", { ascending: false })
      .limit(10); // Get the 10 most recent sold properties

    if (error) {
      console.error("Error fetching sold properties:", error);
      return NextResponse.json(
        { error: "Failed to fetch sold properties" },
        { status: 500 },
      );
    }

    // Format the data for the frontend
    const formattedProperties = soldProperties?.map((property: any) => ({
      id: property.id,
      title: property.title,
      description: property.description,
      address: `${property.street_address}, ${property.city}, ${property.state}`,
      city: property.city,
      state: property.state,
      list_price: property.list_price,
      sold_price: property.sold_price,
      sold_at: property.sold_at,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      square_feet: property.square_feet,
      image:
        property.property_images?.find((img: any) => img.is_primary)
          ?.thumbnail_large_url ||
        property.property_images?.[0]?.thumbnail_large_url ||
        property.property_images?.[0]?.s3_url ||
        null,
    }));

    return NextResponse.json({
      properties: formattedProperties || [],
    });
  } catch (error) {
    console.error("Sold properties API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
