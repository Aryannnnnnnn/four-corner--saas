import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

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

    const { images } = await request.json();
    const { id: propertyId } = await params;

    console.log("Reorder request:", { propertyId, images });

    if (!images || !Array.isArray(images)) {
      return NextResponse.json(
        { error: "Images array is required" },
        { status: 400 },
      );
    }

    // First, set all images to is_primary: false to ensure only one can be primary
    await supabase
      .from("property_images")
      .update({ is_primary: false })
      .eq("property_listing_id", propertyId);

    // Update each image's display_order and is_primary status
    const updates = images.map(async (image: any) => {
      console.log(`Updating image ${image.id}:`, {
        display_order: image.display_order,
        is_primary: image.is_primary,
      });

      const { error } = await supabase
        .from("property_images")
        .update({
          display_order: image.display_order,
          is_primary: image.is_primary,
        })
        .eq("id", image.id)
        .eq("property_listing_id", propertyId);

      if (error) {
        console.error("Error updating image:", error);
        throw error;
      }
    });

    await Promise.all(updates);

    // Find the new primary image
    const primaryImage = images.find((img: any) => img.is_primary);
    if (primaryImage) {
      // Fetch the full image record to get thumbnail URLs
      const { data: imageRecord, error: fetchError } = await supabase
        .from("property_images")
        .select(
          "thumbnail_small_url, thumbnail_medium_url, thumbnail_large_url",
        )
        .eq("id", primaryImage.id)
        .single();

      if (!fetchError && imageRecord) {
        // Update the property listing with the new thumbnails
        await supabase
          .from("property_listings")
          .update({
            thumbnail_small_url: imageRecord.thumbnail_small_url,
            thumbnail_medium_url: imageRecord.thumbnail_medium_url,
            thumbnail_large_url: imageRecord.thumbnail_large_url,
          })
          .eq("id", propertyId);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating image order:", error);
    return NextResponse.json(
      { error: "Failed to update image order" },
      { status: 500 },
    );
  }
}
