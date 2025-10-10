import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Check authentication and admin status
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin using the is_admin() function
    const { data: isAdmin, error: adminError } = await supabase.rpc(
      "is_admin",
      {
        user_email: session.user.email,
      },
    );

    if (adminError || !isAdmin) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    const { id: propertyId } = await params;

    // Fetch the property listing with images
    const { data: property, error } = await supabase
      .from("property_listings")
      .select(`
        *,
        images:property_images(
          id,
          s3_url,
          s3_key,
          thumbnail_small_url,
          thumbnail_medium_url,
          thumbnail_large_url,
          display_order,
          is_primary,
          file_size
        )
      `)
      .eq("id", propertyId)
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ property });
  } catch (error) {
    console.error("Property fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Check authentication and admin status
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin using the is_admin() function
    const { data: isAdmin, error: adminError } = await supabase.rpc(
      "is_admin",
      {
        user_email: session.user.email,
      },
    );

    if (adminError || !isAdmin) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    const { id: propertyId } = await params;
    const body = await request.json();

    // Validate required fields
    const {
      title,
      description,
      street_address,
      city,
      state,
      zipcode,
      property_type,
      listing_type,
      list_price,
      bedrooms,
      bathrooms,
      square_feet,
      lot_size,
      year_built,
      contact_name,
      contact_email,
      contact_phone,
    } = body;

    // Basic validation
    if (!title || !street_address || !city || !state) {
      return NextResponse.json(
        {
          error: "Missing required fields: title, street_address, city, state",
        },
        { status: 400 },
      );
    }

    // Validate email format if provided
    if (contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate numeric fields
    if (list_price < 0 || bedrooms < 0 || bathrooms < 0 || square_feet < 0) {
      return NextResponse.json(
        { error: "Numeric fields cannot be negative" },
        { status: 400 },
      );
    }

    // Check if property exists
    const { data: existingProperty, error: fetchError } = await supabase
      .from("property_listings")
      .select("id")
      .eq("id", propertyId)
      .single();

    if (fetchError || !existingProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 },
      );
    }

    // Update the property
    const { data, error } = await supabase
      .from("property_listings")
      .update({
        title: title.trim(),
        description: description?.trim() || null,
        street_address: street_address.trim(),
        city: city.trim(),
        state: state.trim().toUpperCase(),
        zipcode: zipcode?.trim() || null,
        property_type: property_type || null,
        listing_type: listing_type || "sale",
        list_price: Number(list_price) || 0,
        bedrooms: Number(bedrooms) || 0,
        bathrooms: Number(bathrooms) || 0,
        square_feet: Number(square_feet) || 0,
        lot_size: Number(lot_size) || 0,
        year_built: Number(year_built) || null,
        contact_name: contact_name?.trim() || null,
        contact_email: contact_email?.trim() || null,
        contact_phone: contact_phone?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", propertyId)
      .select();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to update property" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Property updated successfully",
      property: data?.[0],
    });
  } catch (error) {
    console.error("Property update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Check authentication and admin status
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin using the is_admin() function
    const { data: isAdmin, error: adminError } = await supabase.rpc(
      "is_admin",
      {
        user_email: session.user.email,
      },
    );

    if (adminError || !isAdmin) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    const { id: propertyId } = await params;

    // Check if property exists
    const { data: existingProperty, error: fetchError } = await supabase
      .from("property_listings")
      .select("id")
      .eq("id", propertyId)
      .single();

    if (fetchError || !existingProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 },
      );
    }

    // First, delete related images if they exist
    const { error: imageError } = await supabase
      .from("property_images")
      .delete()
      .eq("property_listing_id", propertyId);

    if (imageError) {
      console.warn("Error deleting property images:", imageError);
      // Don't fail the operation for image deletion errors
    }

    // Then delete the property
    const { error } = await supabase
      .from("property_listings")
      .delete()
      .eq("id", propertyId);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to delete property" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Property deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
