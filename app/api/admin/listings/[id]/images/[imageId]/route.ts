import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { deletePropertyImage } from "@/app/lib/utils/s3";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    // Check authentication and admin status using the same method as other endpoints
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

    const { id: propertyId, imageId } = await params;

    console.log("Delete request:", { propertyId, imageId });

    // Get the image details first to get the S3 key
    const { data: image, error: fetchError } = await supabase
      .from("property_images")
      .select("s3_key")
      .eq("id", imageId)
      .eq("property_listing_id", propertyId)
      .single();

    console.log("Image lookup result:", { image, fetchError });

    if (fetchError || !image) {
      console.error("Image not found:", { imageId, propertyId, fetchError });
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete from S3 first
    try {
      await deletePropertyImage(image.s3_key);
    } catch (s3Error) {
      console.error("Error deleting from S3:", s3Error);
      // Continue with database deletion even if S3 deletion fails
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from("property_images")
      .delete()
      .eq("id", imageId)
      .eq("property_listing_id", propertyId);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
