const REPLICATE_API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN;
const BASE_URL = "https://api.replicate.com/v1";

async function replicateFetch(endpoint: string, body: any) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Replicate API error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function pollReplicateResult(
  predictionUrl: string,
  maxAttempts: number = 60,
  intervalMs: number = 3000
): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(predictionUrl, {
      headers: { Authorization: `Bearer ${REPLICATE_API_TOKEN}` },
    });
    const data = await response.json();

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
  const prediction = await replicateFetch("/predictions", {
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
  const prediction = await replicateFetch("/predictions", {
    version: "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
    input: {
      image: `data:image/png;base64,${imageBase64}`,
    },
  });

  const resultUrl = await pollReplicateResult(prediction.urls.get);
  return resultUrl; // Returns URL of image with removed background
}
