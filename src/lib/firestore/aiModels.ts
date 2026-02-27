import {
  doc, getDoc, setDoc, updateDoc, collection, query, where,
  orderBy, getDocs, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export async function createAIModel(data: Omit<AIModel, "id" | "callsToday" | "createdAt" | "updatedAt">) {
  const ref = doc(collection(db, "ai_models"));
  await setDoc(ref, {
    ...data,
    callsToday: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getAIModel(id: string): Promise<AIModel | null> {
  const snap = await getDoc(doc(db, "ai_models", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as AIModel;
}

export async function getAIModelBySlug(slug: string): Promise<AIModel | null> {
  const q = query(collection(db, "ai_models"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as AIModel;
}

export async function getAllAIModels(): Promise<AIModel[]> {
  const q = query(collection(db, "ai_models"), orderBy("priorityOrder", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AIModel));
}

export async function getEnabledModels(): Promise<AIModel[]> {
  const q = query(
    collection(db, "ai_models"),
    where("isEnabled", "==", true),
    orderBy("priorityOrder", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AIModel));
}

export async function updateAIModel(id: string, data: Partial<AIModel>) {
  await updateDoc(doc(db, "ai_models", id), { ...data, updatedAt: serverTimestamp() });
}

export async function toggleAIModel(id: string, enabled: boolean) {
  await updateDoc(doc(db, "ai_models", id), {
    isEnabled: enabled,
    updatedAt: serverTimestamp(),
  });
}

export async function getDefaultModel(): Promise<AIModel | null> {
  const q = query(
    collection(db, "ai_models"),
    where("isDefault", "==", true),
    where("isEnabled", "==", true)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as AIModel;
}

// Seed all models from the backend strategy
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
