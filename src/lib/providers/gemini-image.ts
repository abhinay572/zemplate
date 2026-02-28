import { GoogleGenAI } from "@google/genai";

const genai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// METHOD 1: Imagen 3 — standalone image generation (best for templates)
export async function generateWithImagen(
  prompt: string,
  options: {
    numberOfImages?: number;
    aspectRatio?: string;
  } = {}
): Promise<{ imageBytes: string; mimeType: string }[]> {
  const response = await genai.models.generateImages({
    model: "imagen-3.0-generate-002",
    prompt,
    config: {
      numberOfImages: options.numberOfImages || 1,
      aspectRatio: options.aspectRatio || "1:1",
      outputMimeType: "image/png",
    },
  });

  return (response.generatedImages || []).map((img: any) => ({
    imageBytes: img.image.imageBytes,
    mimeType: "image/png",
  }));
}

// METHOD 2: Gemini Native — conversational, supports editing + multi-turn
export async function generateWithGemini(
  prompt: string,
  options: {
    model?: string;
    referenceImages?: string[]; // base64 strings
  } = {}
): Promise<{ imageBytes: string; mimeType: string; text?: string }[]> {
  const model = options.model || "gemini-2.5-flash-image";
  const contents: any[] = [];

  if (options.referenceImages?.length) {
    for (const img of options.referenceImages) {
      contents.push({
        inlineData: {
          data: img,
          mimeType: "image/png",
        },
      });
    }
  }

  contents.push({ text: prompt });

  const response = await genai.models.generateContent({
    model,
    contents,
    config: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });

  const results: { imageBytes: string; mimeType: string; text?: string }[] = [];
  const parts = response.candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    if (part.inlineData) {
      results.push({
        imageBytes: part.inlineData.data,
        mimeType: part.inlineData.mimeType || "image/png",
      });
    }
  }

  return results;
}

// METHOD 3: Gemini Edit — conversational editing with image input
export async function editWithGemini(
  imageBase64: string,
  editPrompt: string,
  model: string = "gemini-2.5-flash-image"
): Promise<{ imageBytes: string; mimeType: string }[]> {
  const response = await genai.models.generateContent({
    model,
    contents: [
      {
        inlineData: {
          data: imageBase64,
          mimeType: "image/png",
        },
      },
      { text: editPrompt },
    ],
    config: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });

  const results: { imageBytes: string; mimeType: string }[] = [];
  const parts = response.candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    if (part.inlineData) {
      results.push({
        imageBytes: part.inlineData.data,
        mimeType: part.inlineData.mimeType || "image/png",
      });
    }
  }

  return results;
}

// Style preset → prompt suffix mapping
export const STYLE_PROMPTS: Record<string, { model: string; suffix: string }> = {
  photorealistic: { model: "imagen-3.0-generate-002", suffix: "photorealistic, 8k, ultra detailed, professional photography" },
  anime: { model: "gemini-2.5-flash-image", suffix: "anime style, vibrant colors, manga illustration" },
  "3d-render": { model: "gemini-2.5-flash-image", suffix: "3D rendered, Pixar style, volumetric lighting" },
  "oil-painting": { model: "imagen-3.0-generate-002", suffix: "oil painting on canvas, thick brushstrokes, classical" },
  watercolor: { model: "gemini-2.5-flash-image", suffix: "delicate watercolor painting, soft washes" },
  "digital-art": { model: "gemini-2.5-flash-image", suffix: "digital art, concept art, artstation quality" },
  "pixel-art": { model: "gemini-2.5-flash-image", suffix: "pixel art, 16-bit retro game style" },
  cinematic: { model: "imagen-3.0-generate-002", suffix: "cinematic photography, film grain, 35mm lens" },
  "pencil-sketch": { model: "gemini-2.5-flash-image", suffix: "pencil sketch, hand drawn, detailed linework" },
  "comic-book": { model: "gemini-2.5-flash-image", suffix: "comic book illustration, bold lines, vivid colors" },
};
