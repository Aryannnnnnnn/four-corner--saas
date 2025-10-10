// app/lib/utils/s3.ts
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import crypto from "crypto";
import sharp from "sharp";
import { logger } from "./logger";

const s3Client = new S3Client({
  region:
    process.env.AWS_S3_BUCKET_REGION || process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;
const CLOUDFRONT_URL = process.env.AWS_CLOUDFRONT_URL;
const AWS_REGION =
  process.env.AWS_S3_BUCKET_REGION || process.env.AWS_REGION || "us-east-1";
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
];

// Generate S3 URL based on CloudFront or direct S3 bucket URL
function getPublicUrl(key: string): string {
  if (CLOUDFRONT_URL) {
    // Use CloudFront if configured
    return `${CLOUDFRONT_URL}/${key}`;
  }
  // Fallback to S3 direct URL
  return `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
}

interface UploadResult {
  s3Key: string;
  s3Url: string;
  thumbnailSmallUrl: string;
  thumbnailMediumUrl: string;
  thumbnailLargeUrl: string;
  width: number;
  height: number;
  fileSize: number;
  mimeType: string;
}

/**
 * Validate image file before upload
 */
export async function validateImage(
  file: Buffer,
  mimeType: string,
): Promise<void> {
  // Check file size
  if (file.length > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new Error(
      `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}`,
    );
  }

  // Validate that it's actually an image
  try {
    await sharp(file).metadata();
  } catch (error) {
    throw new Error("Invalid image file");
  }
}

/**
 * Optimize image using Sharp
 */
export async function optimizeImage(
  buffer: Buffer,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  } = {},
): Promise<Buffer> {
  const { maxWidth = 2048, maxHeight = 2048, quality = 85 } = options;

  const image = sharp(buffer);
  const metadata = await image.metadata();

  // Resize if needed
  if (metadata.width && metadata.height) {
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      image.resize(maxWidth, maxHeight, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }
  }

  // Convert to WebP for better compression
  return image.webp({ quality }).toBuffer();
}

/**
 * Create thumbnail from image
 */
export async function createThumbnail(
  buffer: Buffer,
  size: { width: number; height: number },
): Promise<Buffer> {
  return sharp(buffer)
    .resize(size.width, size.height, {
      fit: "cover",
      position: "center",
    })
    .webp({ quality: 80 })
    .toBuffer();
}

/**
 * Generate unique S3 key for image
 */
function generateS3Key(
  userId: string,
  originalFilename: string,
  suffix = "",
): string {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString("hex");
  const extension = suffix ? `${suffix}.webp` : ".webp";
  const safeFilename = originalFilename
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .substring(0, 50);

  return `property-listings/${userId}/${timestamp}-${randomString}-${safeFilename}${extension}`;
}

/**
 * Upload image to S3 and return CloudFront URL
 */
export async function uploadPropertyImage(
  file: Buffer,
  userId: string,
  originalFilename: string,
  mimeType: string,
): Promise<UploadResult> {
  // Validate image
  await validateImage(file, mimeType);

  // Get original metadata
  const metadata = await sharp(file).metadata();

  // Optimize main image
  const optimizedImage = await optimizeImage(file);
  const mainKey = generateS3Key(userId, originalFilename);

  // Upload main image
  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: mainKey,
      Body: optimizedImage,
      ContentType: "image/webp",
      ACL: "public-read",
      CacheControl: "public, max-age=31536000, immutable",
      Metadata: {
        userId,
        originalFilename,
        uploadedAt: new Date().toISOString(),
      },
    }),
  );

  // Create and upload thumbnails (small, medium, large)
  const thumbnailSizes = [
    { width: 200, height: 150, suffix: "-thumb-sm" },
    { width: 400, height: 300, suffix: "-thumb-md" },
    { width: 800, height: 600, suffix: "-thumb-lg" },
  ];

  const thumbnailUrls: string[] = [];

  for (const size of thumbnailSizes) {
    const thumbnail = await createThumbnail(file, {
      width: size.width,
      height: size.height,
    });
    const thumbnailKey = generateS3Key(userId, originalFilename, size.suffix);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: thumbnailKey,
        Body: thumbnail,
        ContentType: "image/webp",
        ACL: "public-read",
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    thumbnailUrls.push(getPublicUrl(thumbnailKey));
  }

  // Generate public URLs (CloudFront or S3)
  const s3Url = getPublicUrl(mainKey);

  return {
    s3Key: mainKey,
    s3Url,
    thumbnailSmallUrl: thumbnailUrls[0] || "",
    thumbnailMediumUrl: thumbnailUrls[1] || "",
    thumbnailLargeUrl: thumbnailUrls[2] || "",
    width: metadata.width || 0,
    height: metadata.height || 0,
    fileSize: optimizedImage.length,
    mimeType: "image/webp",
  };
}

/**
 * Delete image from S3
 */
export async function deletePropertyImage(s3Key: string): Promise<void> {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: s3Key,
      }),
    );

    // Also delete thumbnail
    const thumbnailKey = s3Key.replace(".webp", "-thumb.webp");
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: thumbnailKey,
      }),
    );
  } catch (error) {
    logger.error("Error deleting image from S3:", error);
    throw new Error("Failed to delete image");
  }
}

/**
 * Delete multiple images from S3
 */
export async function deletePropertyImages(s3Keys: string[]): Promise<void> {
  const deletePromises = s3Keys.map((key) => deletePropertyImage(key));
  await Promise.all(deletePromises);
}
