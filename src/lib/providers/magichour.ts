import { supabase } from "@/lib/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

async function getSessionWithTimeout(timeoutMs = 5000) {
  const result = await Promise.race([
    supabase.auth.getSession(),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Auth session timed out. Please refresh and try again.")), timeoutMs)),
  ]);
  return result.data.session;
}

async function magicHourProxyFetch(endpoint: string, body: any) {
  const session = await getSessionWithTimeout();
  if (!session) throw new Error("You must be logged in to use this feature.");

  const response = await fetch(`${SUPABASE_URL}/functions/v1/magichour-proxy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ action: "call", endpoint, body }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(errorData.error || `MagicHour proxy error: ${response.status}`);
  }

  return response.json();
}

async function pollForResult(
  projectId: string,
  maxAttempts: number = 60,
  intervalMs: number = 3000
): Promise<any> {
  const session = await getSessionWithTimeout();
  if (!session) throw new Error("You must be logged in to use this feature.");

  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/magichour-proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ action: "poll", projectId }),
    });

    const data = await response.json();

    if (data.status === "completed") return data;
    if (data.status === "failed") throw new Error(`MagicHour generation failed: ${data.error}`);

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  throw new Error("MagicHour generation timed out");
}

// Face Swap — Photo
export async function faceSwapPhoto(sourceImageUrl: string, targetImageUrl: string) {
  const result = await magicHourProxyFetch("/face-swap/photo", {
    assets: {
      source_file_path: sourceImageUrl,
      target_file_path: targetImageUrl,
    },
  });
  if (!result?.id) throw new Error("Face swap failed: no project ID returned.");
  return pollForResult(result.id);
}

// Face Swap — Video
export async function faceSwapVideo(
  faceImageUrl: string,
  videoUrl: string,
  startSeconds: number,
  endSeconds: number
) {
  const result = await magicHourProxyFetch("/face-swap", {
    assets: {
      image_file_path: faceImageUrl,
      video_source: "file",
      video_file_path: videoUrl,
    },
    start_seconds: startSeconds,
    end_seconds: endSeconds,
  });
  if (!result?.id) throw new Error("Video face swap failed: no project ID returned.");
  return pollForResult(result.id);
}

// AI Headshot Generator
export async function generateHeadshot(selfieUrl: string, style: string) {
  const result = await magicHourProxyFetch("/ai-headshot", {
    assets: { image: selfieUrl },
    style,
  });
  if (!result?.id) throw new Error("Headshot generation failed: no project ID returned.");
  return pollForResult(result.id);
}

// Text-to-Video
export async function textToVideo(prompt: string, duration: number = 5) {
  const result = await magicHourProxyFetch("/text-to-video", {
    prompt,
    duration,
  });
  if (!result?.id) throw new Error("Text-to-video failed: no project ID returned.");
  return pollForResult(result.id);
}

// Image-to-Video (Animate still images)
export async function imageToVideo(imageUrl: string, motion: string = "zoom") {
  const result = await magicHourProxyFetch("/image-to-video", {
    assets: { image: imageUrl },
    motion_type: motion,
  });
  if (!result?.id) throw new Error("Image-to-video failed: no project ID returned.");
  return pollForResult(result.id);
}

// Video-to-Video (Style transfer)
export async function videoToVideo(videoUrl: string, stylePrompt: string) {
  const result = await magicHourProxyFetch("/video-to-video", {
    assets: { video: videoUrl },
    style_prompt: stylePrompt,
  });
  if (!result?.id) throw new Error("Video-to-video failed: no project ID returned.");
  return pollForResult(result.id);
}

// Lip Sync
export async function lipSync(videoUrl: string, audioUrl: string) {
  const result = await magicHourProxyFetch("/lip-sync", {
    assets: {
      video: videoUrl,
      audio: audioUrl,
    },
  });
  if (!result?.id) throw new Error("Lip sync failed: no project ID returned.");
  return pollForResult(result.id);
}

// Talking Photo
export async function talkingPhoto(imageUrl: string, audioUrl: string) {
  const result = await magicHourProxyFetch("/talking-photo", {
    assets: {
      image: imageUrl,
      audio: audioUrl,
    },
  });
  if (!result?.id) throw new Error("Talking photo failed: no project ID returned.");
  return pollForResult(result.id);
}

// AI Avatar Generator
export async function generateAvatar(imageUrl: string, style: string) {
  const result = await magicHourProxyFetch("/ai-avatar", {
    assets: { image: imageUrl },
    style,
  });
  if (!result?.id) throw new Error("Avatar generation failed: no project ID returned.");
  return pollForResult(result.id);
}
