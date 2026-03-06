import { supabase } from "@/lib/supabase";

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

function mapRow(row: any): ToolUsage {
  return {
    id: row.id, userId: row.user_id, toolSlug: row.tool_slug, modelId: row.model_id,
    modelName: row.model_name, inputType: row.input_type, outputUrl: row.output_url,
    outputType: row.output_type, creditsCharged: row.credits_charged,
    providerCost: Number(row.provider_cost), status: row.status,
    processingTimeMs: row.processing_time_ms, errorMessage: row.error_message,
    createdAt: row.created_at,
  };
}

export async function createToolUsage(data: Omit<ToolUsage, "id" | "createdAt">): Promise<string> {
  const { data: row, error } = await supabase
    .from("tool_usage")
    .insert({
      user_id: data.userId, tool_slug: data.toolSlug, model_id: data.modelId,
      model_name: data.modelName, input_type: data.inputType, output_url: data.outputUrl,
      output_type: data.outputType, credits_charged: data.creditsCharged,
      provider_cost: data.providerCost, status: data.status,
      processing_time_ms: data.processingTimeMs, error_message: data.errorMessage,
    })
    .select("id")
    .single();
  if (error) throw error;
  return row.id;
}

export async function getToolUsageByTool(toolSlug: string, days: number = 30): Promise<ToolUsage[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const { data, error } = await supabase
    .from("tool_usage")
    .select("*")
    .eq("tool_slug", toolSlug)
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) return [];
  return (data || []).map(mapRow);
}

export async function getToolUsageStats(): Promise<
  { toolSlug: string; calls: number; revenue: number; cost: number }[]
> {
  const { data, error } = await supabase
    .from("tool_usage")
    .select("*")
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(5000);
  if (error) return [];

  const stats: Record<string, { calls: number; revenue: number; cost: number }> = {};
  (data || []).forEach((d: any) => {
    const slug = d.tool_slug;
    if (!stats[slug]) stats[slug] = { calls: 0, revenue: 0, cost: 0 };
    stats[slug].calls++;
    stats[slug].revenue += (d.credits_charged || 0) * 9.9;
    stats[slug].cost += Number(d.provider_cost) || 0;
  });

  return Object.entries(stats).map(([toolSlug, s]) => ({ toolSlug, ...s }));
}

export async function getRecentToolUsage(count: number = 10): Promise<ToolUsage[]> {
  const { data, error } = await supabase
    .from("tool_usage")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(count);
  if (error) return [];
  return (data || []).map(mapRow);
}
