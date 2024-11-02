// src/lib/utils/minio.ts
import crypto from "crypto";
import { Client } from "minio";

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT!.replace("https://", ""),
  port: 443,
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
});

function generateUUID(): string {
  return crypto.randomUUID();
}

// Add 'export' keyword to make these functions available
export async function deleteProfileImage(imageUrl: string): Promise<void> {
  try {
    // Extract filename from URL
    const fileName = imageUrl.split("/").pop();
    if (!fileName) return;

    await minioClient.removeObject(process.env.MINIO_BUCKET!, fileName);
  } catch (error) {
    console.error("Error deleting from MinIO:", error);
    throw new Error("Failed to delete image");
  }
}

// Add 'export' keyword here too
export function isMinioUrl(url: string): boolean {
  return url.startsWith(process.env.MINIO_ENDPOINT!);
}

export async function uploadProfileImage(file: File): Promise<string> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${generateUUID()}.${fileExt}`;
    const fileBuffer = await file.arrayBuffer();
    
    await minioClient.putObject(
      process.env.MINIO_BUCKET!,
      fileName,
      Buffer.from(fileBuffer),
      file.size,
      {
        "Content-Type": file.type,
      }
    );

    return `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET}/${fileName}`;
  } catch (error) {
    console.error("Error uploading to MinIO:", error);
    throw new Error("Failed to upload image");
  }
}