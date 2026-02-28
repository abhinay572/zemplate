import { ref, uploadBytes, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

// Compress and resize an image file before upload (returns a smaller File)
// Uses high quality settings — visually identical to original, just smaller file size
export function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.92
): Promise<File> {
  return new Promise((resolve, reject) => {
    // Skip non-image files
    if (!file.type.startsWith("image/")) return resolve(file);
    // Already small enough (< 500KB) — skip compression
    if (file.size < 500 * 1024) return resolve(file);

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;

      // Only scale down if larger than max (never scale up)
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      // Use high-quality image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"));
          const compressed = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
            type: "image/webp",
          });
          resolve(compressed);
        },
        "image/webp",
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file); // fallback to original on error
    };
    img.src = url;
  });
}

// Upload a file (from input[type=file])
export async function uploadFile(
  file: File,
  path: string
): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

// Upload base64 image data (from AI generation results)
export async function uploadBase64Image(
  base64Data: string,
  path: string,
  mimeType: string = "image/png"
): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadString(storageRef, base64Data, "base64", {
    contentType: mimeType,
  });
  return getDownloadURL(snapshot.ref);
}

// Upload template preview image (compressed for fast upload, high quality)
export async function uploadTemplateImage(file: File, templateId: string): Promise<string> {
  const compressed = await compressImage(file, 1200, 1200, 0.92);
  const ext = compressed.name.split(".").pop() || "webp";
  const path = `templates/${templateId}/preview.${ext}`;
  return uploadFile(compressed, path);
}

// Upload generated image
export async function uploadGeneratedImage(
  base64Data: string,
  userId: string,
  generationId: string
): Promise<string> {
  const path = `generations/${userId}/${generationId}.png`;
  return uploadBase64Image(base64Data, path);
}

// Upload user avatar (compressed)
export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const compressed = await compressImage(file, 256, 256, 0.8);
  const ext = compressed.name.split(".").pop() || "webp";
  const path = `avatars/${userId}/avatar.${ext}`;
  return uploadFile(compressed, path);
}

// Upload community post image (compressed)
export async function uploadCommunityImage(file: File, postId: string): Promise<string> {
  const compressed = await compressImage(file, 1200, 1200, 0.8);
  const ext = compressed.name.split(".").pop() || "webp";
  const path = `community/${postId}/image.${ext}`;
  return uploadFile(compressed, path);
}

// Delete a file from storage
export async function deleteFile(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}

// Get a download URL for a path
export async function getFileUrl(path: string): Promise<string> {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
}
