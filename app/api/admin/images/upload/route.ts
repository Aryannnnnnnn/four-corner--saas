import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { uploadPropertyImage } from "@/app/lib/utils/s3";

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin status
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if user is admin using the is_admin() function
    const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin", {
      user_email: session.user.email,
    });

    if (adminError || !isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const propertyListingId = formData.get('propertyListingId') as string;
    const displayOrder = parseInt(formData.get('displayOrder') as string) || 1;

    if (!file || !propertyListingId) {
      return NextResponse.json(
        { error: 'File and property listing ID are required' },
        { status: 400 }
      );
    }

    // Validate file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Check if property exists
    const { data: property, error: propertyError } = await supabase
      .from('property_listings')
      .select('id')
      .eq('id', propertyListingId)
      .single();

    if (propertyError || !property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Upload to S3
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadPropertyImage(
      buffer,
      session.user.id!,
      file.name,
      file.type
    );

    // Save to database
    const { data: imageRecord, error: dbError } = await supabase
      .from('property_images')
      .insert({
        property_listing_id: propertyListingId,
        s3_key: uploadResult.s3Key,
        s3_url: uploadResult.s3Url,
        thumbnail_small_url: uploadResult.thumbnailSmallUrl,
        thumbnail_medium_url: uploadResult.thumbnailMediumUrl,
        thumbnail_large_url: uploadResult.thumbnailLargeUrl,
        display_order: displayOrder,
        is_primary: false,
        file_size: file.size,
      })
      .select()
      .single();

    if (dbError) {
      // If database insertion fails, try to clean up the S3 upload
      try {
        await fetch('/api/admin/s3/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ s3Key: uploadResult.s3Key })
        });
      } catch (cleanupError) {
        console.error('Failed to cleanup S3 after DB error:', cleanupError);
      }
      
      throw dbError;
    }

    return NextResponse.json({
      success: true,
      image: imageRecord,
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}