const MAGIC_HOUR_API_KEY = import.meta.env.VITE_MAGIC_HOUR_API_KEY;
const BASE_URL = "https://api.magichour.ai/v1";

async function magicHourFetch(endpoint: string, body: any) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAGIC_HOUR_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`MagicHour API error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function pollForResult(
  projectId: string,
  maxAttempts: number = 60,
  intervalMs: number = 3000
): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${MAGIC_HOUR_API_KEY}` },
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
  const result = await magicHourFetch("/face-swap", {
    assets: {
      source_image: sourceImageUrl,
      target_image: targetImageUrl,
    },
  });
  return pollForResult(result.id);
}

// Face Swap — Video
export async function faceSwapVideo(
  faceImageUrl: string,
  videoUrl: string,
  startSeconds: number,
  endSeconds: number
) {
  const result = await magicHourFetch("/face-swap", {
    assets: {
      image_file_path: faceImageUrl,
      video_source: "file",
      video_file_path: videoUrl,
    },
    start_seconds: startSeconds,
    end_seconds: endSeconds,
  });
  return pollForResult(result.id);
}

// AI Headshot Generator
export async function generateHeadshot(selfieUrl: string, style: string) {
  const result = await magicHourFetch("/ai-headshot", {
    assets: { image: selfieUrl },
    style,
  });
  return pollForResult(result.id);
}

// Text-to-Video
export async function textToVideo(prompt: string, duration: number = 5) {
  const result = await magicHourFetch("/text-to-video", {
    prompt,
    duration,
  });
  return pollForResult(result.id);
}

// Image-to-Video (Animate still images)
export async function imageToVideo(imageUrl: string, motion: string = "zoom") {
  const result = await magicHourFetch("/image-to-video", {
    assets: { image: imageUrl },
    motion_type: motion,
  });
  return pollForResult(result.id);
}

// Video-to-Video (Style transfer)
export async function videoToVideo(videoUrl: string, stylePrompt: string) {
  const result = await magicHourFetch("/video-to-video", {
    assets: { video: videoUrl },
    style_prompt: stylePrompt,
  });
  return pollForResult(result.id);
}

// Lip Sync
export async function lipSync(videoUrl: string, audioUrl: string) {
  const result = await magicHourFetch("/lip-sync", {
    assets: {
      video: videoUrl,
      audio: audioUrl,
    },
  });
  return pollForResult(result.id);
}

// Talking Photo
export async function talkingPhoto(imageUrl: string, audioUrl: string) {
  const result = await magicHourFetch("/talking-photo", {
    assets: {
      image: imageUrl,
      audio: audioUrl,
    },
  });
  return pollForResult(result.id);
}

// AI Avatar Generator
export async function generateAvatar(imageUrl: string, style: string) {
  const result = await magicHourFetch("/ai-avatar", {
    assets: { image: imageUrl },
    style,
  });
  return pollForResult(result.id);
}
