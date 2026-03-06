import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";

const BUCKET = "images";

function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// Upload a file (from input[type=file])
export async function uploadFile(
  file: File,
  path: string
): Promise<string> {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true });
  if (error) throw error;
  return getPublicUrl(path);
}

// Upload base64 image data (from AI generation results)
export async function uploadBase64Image(
  base64Data: string,
  path: string,
  mimeType: string = "image/png"
): Promise<string> {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, decode(base64Data), {
      contentType: mimeType,
      upsert: true,
    });
  if (error) throw error;
  return getPublicUrl(path);
}

// Upload template preview image
export async function uploadTemplateImage(file: File, templateId: string): Promise<string> {
  const ext = file.name.split(".").pop() || "png";
  const path = `templates/${templateId}/preview.${ext}`;
  return uploadFile(file, path);
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

// Upload user avatar
export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `avatars/${userId}/avatar.${ext}`;
  return uploadFile(file, path);
}

// Upload community post image
export async function uploadCommunityImage(file: File, postId: string): Promise<string> {
  const ext = file.name.split(".").pop() || "png";
  const path = `community/${postId}/image.${ext}`;
  return uploadFile(file, path);
}

// Delete a file from storage
export async function deleteFile(path: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}

// Get a public URL for a path
export async function getFileUrl(path: string): Promise<string> {
  return getPublicUrl(path);
}
