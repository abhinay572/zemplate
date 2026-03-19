import { supabase } from "@/lib/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

async function replicateProxyFetch(action: string, params: Record<string, any>) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("You must be logged in to use this feature.");

  const response = await fetch(`${SUPABASE_URL}/functions/v1/replicate-proxy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ action, ...params }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(errorData.error || `Replicate proxy error: ${response.status}`);
  }

  return response.json();
}

async function pollReplicateResult(
  predictionUrl: string,
  maxAttempts: number = 60,
  intervalMs: number = 3000
): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    const data = await replicateProxyFetch("poll", { url: predictionUrl });

    if (data.status === "succeeded") return data.output;
    if (data.status === "failed") throw new Error(`Replicate failed: ${data.error}`);

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  throw new Error("Replicate prediction timed out");
}

// Image Upscaler — Real-ESRGAN
export async function upscaleImage(
  imageBase64: string,
  scale: 2 | 4 = 2,
  faceEnhance: boolean = true
): Promise<string> {
  const prediction = await replicateProxyFetch("predict", {
    version: "42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
    input: {
      image: `data:image/png;base64,${imageBase64}`,
      scale,
      face_enhance: faceEnhance,
    },
  });

  const resultUrl = await pollReplicateResult(prediction.urls.get);
  return resultUrl; // Returns URL of upscaled image
}

// Background Remover — rembg (Precision mode)
export async function removeBackgroundPrecision(imageBase64: string): Promise<string> {
  const prediction = await replicateProxyFetch("predict", {
    version: "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
    input: {
      image: `data:image/png;base64,${imageBase64}`,
    },
  });

  const resultUrl = await pollReplicateResult(prediction.urls.get);
  return resultUrl; // Returns URL of image with removed background
}
