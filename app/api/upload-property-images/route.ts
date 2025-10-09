// app/api/upload-property-images/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadPropertyImage } from "@/app/lib/utils/s3";

const MAX_IMAGES = 35;
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    // Validate number of files
    if (files.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 },
      );
    }

    if (files.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_IMAGES} images allowed` },
        { status: 400 },
      );
    }

    // Validate each file
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: `File ${file.name} exceeds maximum size of 15MB`,
          },
          { status: 400 },
        );
      }

      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          {
            error: `File ${file.name} is not a valid image`,
          },
          { status: 400 },
        );
      }
    }

    // Upload each image to S3
    const uploadPromises = files.map(async (file, index) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadPropertyImage(
        buffer,
        session.user.id,
        file.name,
        file.type,
      );

      return {
        ...result,
        displayOrder: index,
        isPrimary: index === 0, // First image is primary
        originalName: file.name,
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return NextResponse.json(
      {
        success: true,
        images: uploadedImages,
        count: uploadedImages.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to upload images",
      },
      { status: 500 },
    );
  }
}
