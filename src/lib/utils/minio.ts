// src/lib/utils/minio.ts
import { Client } from "minio";

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT!.replace("https://", ""),
  port: 443,
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
});

const BUCKET_NAME = process.env.MINIO_BUCKET!;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function deleteUserProfileImages(userId: string): Promise<void> {
  try {
    const objectsList = await minioClient.listObjects(BUCKET_NAME, `public/${userId}/`, true);

    for await (const obj of objectsList) {
      await minioClient.removeObject(BUCKET_NAME, obj.name);
    }
  } catch (error) {
    console.error("Error deleting user profile images:", error);
    throw new Error("Failed to delete old images");
  }
}

export function isMinioUrl(url: string): boolean {
  return url.startsWith(process.env.MINIO_ENDPOINT!);
}

export async function uploadProfileImage(file: File, userId: string): Promise<string> {
  try {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      throw new Error("Invalid file type");
    }

    // Get file extension while preserving the original format
    const fileExt = file.type.split("/")[1].replace("jpeg", "jpg");

    // Create the file path
    const filePath = `public/${userId}/${userId}.${fileExt}`;

    // Convert File to Buffer
    const fileBuffer = await file.arrayBuffer();

    // Delete any existing files in the user's directory
    await deleteUserProfileImages(userId);

    // Upload the new file
    await minioClient.putObject(BUCKET_NAME, filePath, Buffer.from(fileBuffer), file.size, {
      "Content-Type": file.type,
      "Cache-Control": "no-cache",
      "x-amz-acl": "public-read",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "*",
    });

    // Return the full URL
    return `${process.env.MINIO_ENDPOINT}/${BUCKET_NAME}/${filePath}`;
  } catch (error) {
    console.error("Error uploading to MinIO:", error);
    throw new Error("Failed to upload image");
  }
}
