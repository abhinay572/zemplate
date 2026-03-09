const MAX_DIMENSION = 2048;
const TARGET_QUALITY = 0.85;
const MAX_FILE_SIZE = 500 * 1024; // 500KB target

export async function compressImage(file: File): Promise<File> {
  // Skip non-image files
  if (!file.type.startsWith("image/")) return file;

  // Skip small files (under 500KB)
  if (file.size <= MAX_FILE_SIZE) return file;

  const bitmap = await createImageBitmap(file);
  let { width, height } = bitmap;

  // Scale down if larger than max dimension
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const scale = MAX_DIMENSION / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await canvas.convertToBlob({
    type: "image/webp",
    quality: TARGET_QUALITY,
  });

  // If compressed is somehow larger, return original
  if (blob.size >= file.size) return file;

  const ext = file.name.replace(/\.[^/.]+$/, "");
  return new File([blob], `${ext}.webp`, { type: "image/webp" });
}
