import { supabase } from "@/lib/supabase";

export interface AIModel {
  id: string;
  name: string;
  slug: string;
  provider: "gemini" | "imagen" | "magichour" | "replicate";
  providerModelId: string;
  providerCostPerCall: number;
  baseCreditCost: number;
  hdCreditCost: number;
  ultraCreditCost: number;
  supportsTextToImage: boolean;
  supportsImageEditing: boolean;
  supportsFaceSwap: boolean;
  supportsVideo: boolean;
  supportsUpscale: boolean;
  maxResolution: string;
  supportedAspectRatios: string[];
  supportedStyles: string[];
  isEnabled: boolean;
  isDefault: boolean;
  maxPerDay: number;
  maxPerUserPerDay: number;
  callsToday: number;
  priorityOrder: number;
  createdAt: any;
  updatedAt: any;
}

function mapRow(row: any): AIModel {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    provider: row.provider,
    providerModelId: row.provider_model_id,
    providerCostPerCall: Number(row.provider_cost_per_call),
    baseCreditCost: row.base_credit_cost,
    hdCreditCost: row.hd_credit_cost,
    ultraCreditCost: row.ultra_credit_cost,
    supportsTextToImage: row.supports_text_to_image,
    supportsImageEditing: row.supports_image_editing,
    supportsFaceSwap: row.supports_face_swap,
    supportsVideo: row.supports_video,
    supportsUpscale: row.supports_upscale,
    maxResolution: row.max_resolution,
    supportedAspectRatios: row.supported_aspect_ratios || [],
    supportedStyles: row.supported_styles || [],
    isEnabled: row.is_enabled,
    isDefault: row.is_default,
    maxPerDay: row.max_per_day,
    maxPerUserPerDay: row.max_per_user_per_day,
    callsToday: row.calls_today,
    priorityOrder: row.priority_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createAIModel(data: Omit<AIModel, "id" | "callsToday" | "createdAt" | "updatedAt">) {
  const { data: row, error } = await supabase
    .from("ai_models")
    .insert({
      name: data.name, slug: data.slug, provider: data.provider,
      provider_model_id: data.providerModelId, provider_cost_per_call: data.providerCostPerCall,
      base_credit_cost: data.baseCreditCost, hd_credit_cost: data.hdCreditCost, ultra_credit_cost: data.ultraCreditCost,
      supports_text_to_image: data.supportsTextToImage, supports_image_editing: data.supportsImageEditing,
      supports_face_swap: data.supportsFaceSwap, supports_video: data.supportsVideo, supports_upscale: data.supportsUpscale,
      max_resolution: data.maxResolution, supported_aspect_ratios: data.supportedAspectRatios,
      supported_styles: data.supportedStyles, is_enabled: data.isEnabled, is_default: data.isDefault,
      max_per_day: data.maxPerDay, max_per_user_per_day: data.maxPerUserPerDay, priority_order: data.priorityOrder,
    })
    .select("id")
    .single();
  if (error) throw error;
  return row.id;
}

export async function getAIModel(id: string): Promise<AIModel | null> {
  const { data, error } = await supabase.from("ai_models").select("*").eq("id", id).single();
  if (error || !data) return null;
  return mapRow(data);
}

export async function getAIModelBySlug(slug: string): Promise<AIModel | null> {
  const { data, error } = await supabase.from("ai_models").select("*").eq("slug", slug).single();
  if (error || !data) return null;
  return mapRow(data);
}

export async function getAllAIModels(): Promise<AIModel[]> {
  const { data, error } = await supabase.from("ai_models").select("*").order("priority_order", { ascending: true });
  if (error) return [];
  return (data || []).map(mapRow);
}

export async function getEnabledModels(): Promise<AIModel[]> {
  const { data, error } = await supabase.from("ai_models").select("*").eq("is_enabled", true).order("priority_order", { ascending: true });
  if (error) return [];
  return (data || []).map(mapRow);
}

export async function updateAIModel(id: string, updates: Partial<AIModel>) {
  const dbUpdates: any = { updated_at: new Date().toISOString() };
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
  if (updates.provider !== undefined) dbUpdates.provider = updates.provider;
  if (updates.providerModelId !== undefined) dbUpdates.provider_model_id = updates.providerModelId;
  if (updates.providerCostPerCall !== undefined) dbUpdates.provider_cost_per_call = updates.providerCostPerCall;
  if (updates.baseCreditCost !== undefined) dbUpdates.base_credit_cost = updates.baseCreditCost;
  if (updates.hdCreditCost !== undefined) dbUpdates.hd_credit_cost = updates.hdCreditCost;
  if (updates.ultraCreditCost !== undefined) dbUpdates.ultra_credit_cost = updates.ultraCreditCost;
  if (updates.isEnabled !== undefined) dbUpdates.is_enabled = updates.isEnabled;
  if (updates.isDefault !== undefined) dbUpdates.is_default = updates.isDefault;
  if (updates.maxPerDay !== undefined) dbUpdates.max_per_day = updates.maxPerDay;
  if (updates.maxPerUserPerDay !== undefined) dbUpdates.max_per_user_per_day = updates.maxPerUserPerDay;
  if (updates.priorityOrder !== undefined) dbUpdates.priority_order = updates.priorityOrder;
  if (updates.supportsTextToImage !== undefined) dbUpdates.supports_text_to_image = updates.supportsTextToImage;
  if (updates.supportsImageEditing !== undefined) dbUpdates.supports_image_editing = updates.supportsImageEditing;
  if (updates.supportsFaceSwap !== undefined) dbUpdates.supports_face_swap = updates.supportsFaceSwap;
  if (updates.supportsVideo !== undefined) dbUpdates.supports_video = updates.supportsVideo;
  if (updates.supportsUpscale !== undefined) dbUpdates.supports_upscale = updates.supportsUpscale;
  if (updates.maxResolution !== undefined) dbUpdates.max_resolution = updates.maxResolution;
  if (updates.supportedAspectRatios !== undefined) dbUpdates.supported_aspect_ratios = updates.supportedAspectRatios;
  if (updates.supportedStyles !== undefined) dbUpdates.supported_styles = updates.supportedStyles;
  const { error } = await supabase.from("ai_models").update(dbUpdates).eq("id", id);
  if (error) throw error;
}

export async function toggleAIModel(id: string, enabled: boolean) {
  const { error } = await supabase.from("ai_models").update({ is_enabled: enabled, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) throw error;
}

export async function getDefaultModel(): Promise<AIModel | null> {
  const { data, error } = await supabase.from("ai_models").select("*").eq("is_default", true).eq("is_enabled", true).limit(1).single();
  if (error || !data) return null;
  return mapRow(data);
}

export async function seedAIModels() {
  const models = [
    { name: "Nano Banana", slug: "nano-banana", provider: "gemini" as const, providerModelId: "gemini-2.5-flash-image", providerCostPerCall: 0.039, baseCreditCost: 1, hdCreditCost: 2, ultraCreditCost: 3, supportsTextToImage: true, supportsImageEditing: true, supportsFaceSwap: false, supportsVideo: false, supportsUpscale: false, maxResolution: "1024x1024", supportedAspectRatios: ["1:1", "3:4", "4:3", "9:16", "16:9"], supportedStyles: ["Photorealistic", "Anime", "Digital Art", "Pixel Art"], isEnabled: true, isDefault: true, maxPerDay: 10000, maxPerUserPerDay: 100, priorityOrder: 1 },
    { name: "Nano Banana Pro", slug: "nano-banana-pro", provider: "gemini" as const, providerModelId: "gemini-3-pro-image-preview", providerCostPerCall: 0.067, baseCreditCost: 2, hdCreditCost: 3, ultraCreditCost: 3, supportsTextToImage: true, supportsImageEditing: true, supportsFaceSwap: false, supportsVideo: false, supportsUpscale: false, maxResolution: "4096x4096", supportedAspectRatios: ["1:1", "3:4", "4:3", "9:16", "16:9"], supportedStyles: ["All"], isEnabled: true, isDefault: false, maxPerDay: 5000, maxPerUserPerDay: 50, priorityOrder: 2 },
    { name: "Nano Banana 2", slug: "nano-banana-2", provider: "gemini" as const, providerModelId: "gemini-3.1-flash-image-preview", providerCostPerCall: 0.030, baseCreditCost: 1, hdCreditCost: 2, ultraCreditCost: 3, supportsTextToImage: true, supportsImageEditing: true, supportsFaceSwap: false, supportsVideo: false, supportsUpscale: false, maxResolution: "4096x4096", supportedAspectRatios: ["1:1", "3:4", "4:3", "9:16", "16:9"], supportedStyles: ["All"], isEnabled: true, isDefault: false, maxPerDay: 10000, maxPerUserPerDay: 100, priorityOrder: 3 },
    { name: "Imagen 3", slug: "imagen-3", provider: "imagen" as const, providerModelId: "imagen-3.0-generate-002", providerCostPerCall: 0.030, baseCreditCost: 1, hdCreditCost: 2, ultraCreditCost: 3, supportsTextToImage: true, supportsImageEditing: false, supportsFaceSwap: false, supportsVideo: false, supportsUpscale: false, maxResolution: "1024x1024", supportedAspectRatios: ["1:1", "3:4", "4:3", "9:16", "16:9"], supportedStyles: ["Photorealistic", "Oil Painting", "Cinematic"], isEnabled: true, isDefault: false, maxPerDay: 10000, maxPerUserPerDay: 100, priorityOrder: 4 },
    { name: "MH Face Swap", slug: "mh-face-swap", provider: "magichour" as const, providerModelId: "face-swap", providerCostPerCall: 0.10, baseCreditCost: 2, hdCreditCost: 2, ultraCreditCost: 2, supportsTextToImage: false, supportsImageEditing: false, supportsFaceSwap: true, supportsVideo: false, supportsUpscale: false, maxResolution: "N/A", supportedAspectRatios: [], supportedStyles: [], isEnabled: true, isDefault: false, maxPerDay: 5000, maxPerUserPerDay: 20, priorityOrder: 10 },
    { name: "MH Headshot", slug: "mh-headshot", provider: "magichour" as const, providerModelId: "ai-headshot", providerCostPerCall: 0.15, baseCreditCost: 2, hdCreditCost: 2, ultraCreditCost: 2, supportsTextToImage: false, supportsImageEditing: false, supportsFaceSwap: false, supportsVideo: false, supportsUpscale: false, maxResolution: "N/A", supportedAspectRatios: [], supportedStyles: ["corporate", "creative", "casual", "linkedin"], isEnabled: true, isDefault: false, maxPerDay: 3000, maxPerUserPerDay: 10, priorityOrder: 11 },
    { name: "MH Text2Video", slug: "mh-text2video", provider: "magichour" as const, providerModelId: "text-to-video", providerCostPerCall: 0.50, baseCreditCost: 5, hdCreditCost: 5, ultraCreditCost: 10, supportsTextToImage: false, supportsImageEditing: false, supportsFaceSwap: false, supportsVideo: true, supportsUpscale: false, maxResolution: "1080p", supportedAspectRatios: [], supportedStyles: [], isEnabled: true, isDefault: false, maxPerDay: 1000, maxPerUserPerDay: 5, priorityOrder: 12 },
    { name: "MH Image2Video", slug: "mh-image2video", provider: "magichour" as const, providerModelId: "image-to-video", providerCostPerCall: 0.30, baseCreditCost: 5, hdCreditCost: 5, ultraCreditCost: 5, supportsTextToImage: false, supportsImageEditing: false, supportsFaceSwap: false, supportsVideo: true, supportsUpscale: false, maxResolution: "1080p", supportedAspectRatios: [], supportedStyles: [], isEnabled: true, isDefault: false, maxPerDay: 2000, maxPerUserPerDay: 10, priorityOrder: 13 },
    { name: "MH Lip Sync", slug: "mh-lipsync", provider: "magichour" as const, providerModelId: "lip-sync", providerCostPerCall: 0.40, baseCreditCost: 5, hdCreditCost: 5, ultraCreditCost: 5, supportsTextToImage: false, supportsImageEditing: false, supportsFaceSwap: false, supportsVideo: true, supportsUpscale: false, maxResolution: "1080p", supportedAspectRatios: [], supportedStyles: [], isEnabled: true, isDefault: false, maxPerDay: 500, maxPerUserPerDay: 5, priorityOrder: 14 },
    { name: "MH Talking Photo", slug: "mh-talking-photo", provider: "magichour" as const, providerModelId: "talking-photo", providerCostPerCall: 0.20, baseCreditCost: 3, hdCreditCost: 3, ultraCreditCost: 3, supportsTextToImage: false, supportsImageEditing: false, supportsFaceSwap: false, supportsVideo: true, supportsUpscale: false, maxResolution: "1080p", supportedAspectRatios: [], supportedStyles: [], isEnabled: true, isDefault: false, maxPerDay: 1000, maxPerUserPerDay: 10, priorityOrder: 15 },
    { name: "Real-ESRGAN 2x", slug: "esrgan-2x", provider: "replicate" as const, providerModelId: "nightmareai/real-esrgan", providerCostPerCall: 0.005, baseCreditCost: 1, hdCreditCost: 1, ultraCreditCost: 1, supportsTextToImage: false, supportsImageEditing: false, supportsFaceSwap: false, supportsVideo: false, supportsUpscale: true, maxResolution: "N/A", supportedAspectRatios: [], supportedStyles: [], isEnabled: true, isDefault: false, maxPerDay: 10000, maxPerUserPerDay: 50, priorityOrder: 20 },
    { name: "Real-ESRGAN 4x", slug: "esrgan-4x", provider: "replicate" as const, providerModelId: "nightmareai/real-esrgan", providerCostPerCall: 0.008, baseCreditCost: 2, hdCreditCost: 2, ultraCreditCost: 2, supportsTextToImage: false, supportsImageEditing: false, supportsFaceSwap: false, supportsVideo: false, supportsUpscale: true, maxResolution: "N/A", supportedAspectRatios: [], supportedStyles: [], isEnabled: true, isDefault: false, maxPerDay: 10000, maxPerUserPerDay: 50, priorityOrder: 21 },
    { name: "RemBG Precision", slug: "rembg", provider: "replicate" as const, providerModelId: "lucataco/remove-bg", providerCostPerCall: 0.002, baseCreditCost: 1, hdCreditCost: 1, ultraCreditCost: 1, supportsTextToImage: false, supportsImageEditing: false, supportsFaceSwap: false, supportsVideo: false, supportsUpscale: false, maxResolution: "N/A", supportedAspectRatios: [], supportedStyles: [], isEnabled: true, isDefault: false, maxPerDay: 20000, maxPerUserPerDay: 100, priorityOrder: 22 },
  ];

  for (const model of models) {
    const existing = await getAIModelBySlug(model.slug);
    if (!existing) await createAIModel(model);
  }
}
