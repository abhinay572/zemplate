import { generateWithImagen, generateWithGemini, editWithGemini, STYLE_PROMPTS } from "./gemini-image";
import { faceSwapPhoto, faceSwapVideo, generateHeadshot, textToVideo, imageToVideo, videoToVideo, lipSync, talkingPhoto, generateAvatar } from "./magichour";
import { upscaleImage, removeBackgroundPrecision } from "./replicate";

export type ToolType =
  | "template-generate"
  | "text-to-image"
  | "face-swap"
  | "face-swap-video"
  | "remove-bg"
  | "remove-bg-precision"
  | "upscale-2x"
  | "upscale-4x"
  | "headshot"
  | "product-photos"
  | "logo-maker"
  | "text-to-video"
  | "image-to-video"
  | "video-to-video"
  | "lip-sync"
  | "talking-photo"
  | "avatar"
  | "qr-code"
  | "edit-image"
  | "art-generator"
  | "object-removal"
  | "bg-replacement"
  | "text-in-image";

interface ToolConfig {
  provider: "gemini" | "imagen" | "magichour" | "replicate";
  creditCost: number;
  modelSlug: string;
}

export const TOOL_CONFIG: Record<ToolType, ToolConfig> = {
  "template-generate": { provider: "imagen", creditCost: 1, modelSlug: "imagen-3" },
  "text-to-image": { provider: "gemini", creditCost: 1, modelSlug: "nano-banana" },
  "face-swap": { provider: "magichour", creditCost: 2, modelSlug: "mh-face-swap" },
  "face-swap-video": { provider: "magichour", creditCost: 5, modelSlug: "mh-face-swap" },
  "remove-bg": { provider: "gemini", creditCost: 1, modelSlug: "nano-banana" },
  "remove-bg-precision": { provider: "replicate", creditCost: 1, modelSlug: "rembg" },
  "upscale-2x": { provider: "replicate", creditCost: 1, modelSlug: "esrgan-2x" },
  "upscale-4x": { provider: "replicate", creditCost: 2, modelSlug: "esrgan-4x" },
  "headshot": { provider: "magichour", creditCost: 2, modelSlug: "mh-headshot" },
  "product-photos": { provider: "gemini", creditCost: 2, modelSlug: "nano-banana" },
  "logo-maker": { provider: "gemini", creditCost: 2, modelSlug: "nano-banana-pro" },
  "text-to-video": { provider: "magichour", creditCost: 5, modelSlug: "mh-text2video" },
  "image-to-video": { provider: "magichour", creditCost: 5, modelSlug: "mh-image2video" },
  "video-to-video": { provider: "magichour", creditCost: 5, modelSlug: "mh-text2video" },
  "lip-sync": { provider: "magichour", creditCost: 5, modelSlug: "mh-lipsync" },
  "talking-photo": { provider: "magichour", creditCost: 3, modelSlug: "mh-talking-photo" },
  "avatar": { provider: "magichour", creditCost: 3, modelSlug: "mh-headshot" },
  "qr-code": { provider: "gemini", creditCost: 1, modelSlug: "nano-banana" },
  "edit-image": { provider: "gemini", creditCost: 1, modelSlug: "nano-banana" },
  "art-generator": { provider: "gemini", creditCost: 1, modelSlug: "nano-banana" },
  "object-removal": { provider: "gemini", creditCost: 1, modelSlug: "nano-banana" },
  "bg-replacement": { provider: "gemini", creditCost: 1, modelSlug: "nano-banana" },
  "text-in-image": { provider: "gemini", creditCost: 2, modelSlug: "nano-banana-pro" },
};

export function getToolConfig(tool: ToolType): ToolConfig {
  return TOOL_CONFIG[tool];
}

// Template generation — fetch hidden prompt, call appropriate model
export async function generateFromTemplate(
  hiddenPrompt: string,
  options: { aspectRatio?: string; model?: string; style?: string } = {}
): Promise<{ imageBytes: string; mimeType: string }[]> {
  let prompt = hiddenPrompt;

  // Merge style if provided
  if (options.style && STYLE_PROMPTS[options.style]) {
    prompt = `${hiddenPrompt}. ${STYLE_PROMPTS[options.style].suffix}`;
  }

  // Use Imagen 3 for template generation by default
  if (!options.model || options.model === "imagen-3") {
    return generateWithImagen(prompt, { aspectRatio: options.aspectRatio });
  }

  // Use Gemini for other models
  return generateWithGemini(prompt, { model: options.model });
}

// Free-form text-to-image with style
export async function generateImage(
  prompt: string,
  options: { style?: string; aspectRatio?: string } = {}
): Promise<{ imageBytes: string; mimeType: string }[]> {
  let finalPrompt = prompt;
  let model = "gemini-2.5-flash-image";

  if (options.style && STYLE_PROMPTS[options.style]) {
    finalPrompt = `${prompt}. ${STYLE_PROMPTS[options.style].suffix}`;
    model = STYLE_PROMPTS[options.style].model;
  }

  if (model.startsWith("imagen")) {
    return generateWithImagen(finalPrompt, { aspectRatio: options.aspectRatio });
  }

  return generateWithGemini(finalPrompt, { model });
}

// Background removal (standard via Gemini)
export async function removeBackground(imageBase64: string, precision: boolean = false) {
  if (precision) {
    const url = await removeBackgroundPrecision(imageBase64);
    return { outputUrl: url, provider: "replicate" };
  }

  const results = await editWithGemini(
    imageBase64,
    "Remove the background completely from this image. Make the background fully transparent. Keep the subject with clean, precise edges."
  );
  return { images: results, provider: "gemini" };
}

// Product photo generation
export async function generateProductPhoto(imageBase64: string, scene: string) {
  const scenePrompts: Record<string, string> = {
    white_studio: "Place this product on a clean white background with professional studio lighting, soft shadows, e-commerce ready.",
    lifestyle: "Place this product in a beautiful lifestyle setting with contextual props, warm natural lighting.",
    outdoor: "Place this product in a beautiful outdoor setting with natural sunlight, soft bokeh background.",
    flat_lay: "Create a professional flat lay composition with this product as the hero, top-down perspective.",
    on_table: "Place this product on an elegant wooden table with soft window light, premium feel.",
    holiday: "Place this product in a festive holiday setting with decorations and warm lighting.",
  };

  const prompt = scenePrompts[scene] || scenePrompts.white_studio;
  return editWithGemini(imageBase64, prompt);
}

// Logo maker
export async function generateLogo(brandDescription: string) {
  const prompt = `Design a professional, modern logo for: ${brandDescription}. Clean vector-style, minimal, memorable, scalable. White or transparent background.`;
  return generateWithGemini(prompt, { model: "gemini-3-pro-image-preview" });
}

// QR Code generator
export async function generateQRCode(url: string, style: string) {
  const prompt = `Generate a beautiful artistic QR code that encodes the URL "${url}". Style: ${style}. The QR code must be scannable. Make it visually stunning while maintaining functionality.`;
  return generateWithGemini(prompt);
}
