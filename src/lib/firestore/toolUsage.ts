import {
  doc, setDoc, collection, query, where, orderBy, limit,
  getDocs, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ToolUsage {
  id: string;
  userId: string;
  toolSlug: string;
  modelId: string;
  modelName: string;
  inputType: "text" | "image" | "image+text" | "video";
  outputUrl: string;
  outputType: "image" | "video";
  creditsCharged: number;
  providerCost: number;
  status: "pending" | "completed" | "failed";
  processingTimeMs: number;
  errorMessage: string;
  createdAt: any;
}

export async function createToolUsage(data: Omit<ToolUsage, "id" | "createdAt">): Promise<string> {
  const ref = doc(collection(db, "tool_usage"));
  await setDoc(ref, { ...data, createdAt: serverTimestamp() });
  return ref.id;
}

export async function getToolUsageByTool(toolSlug: string, days: number = 30): Promise<ToolUsage[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const q = query(
    collection(db, "tool_usage"),
    where("toolSlug", "==", toolSlug),
    where("createdAt", ">=", since),
    orderBy("createdAt", "desc"),
    limit(1000)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ToolUsage));
}

export async function getToolUsageStats(): Promise<
  { toolSlug: string; calls: number; revenue: number; cost: number }[]
> {
  const q = query(
    collection(db, "tool_usage"),
    where("status", "==", "completed"),
    orderBy("createdAt", "desc"),
    limit(5000)
  );
  const snap = await getDocs(q);

  const stats: Record<string, { calls: number; revenue: number; cost: number }> = {};
  snap.forEach((d) => {
    const data = d.data();
    const slug = data.toolSlug;
    if (!stats[slug]) stats[slug] = { calls: 0, revenue: 0, cost: 0 };
    stats[slug].calls++;
    stats[slug].revenue += (data.creditsCharged || 0) * 9.9; // ₹9.90 per credit
    stats[slug].cost += data.providerCost || 0;
  });

  return Object.entries(stats).map(([toolSlug, s]) => ({ toolSlug, ...s }));
}

export async function getRecentToolUsage(count: number = 10): Promise<ToolUsage[]> {
  const q = query(
    collection(db, "tool_usage"),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ToolUsage));
}
