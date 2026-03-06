import { supabase } from "@/lib/supabase";

export interface Generation {
  id: string;
  userId: string;
  templateId: string;
  templateTitle: string;
  toolSlug: string;
  modelUsed: string;
  inputPrompt: string;
  outputUrl: string;
  outputType: "image" | "video";
  resolution: string;
  aspectRatio: string;
  creditsCharged: number;
  providerCost: number;
  processingTimeMs: number;
  status: "pending" | "processing" | "completed" | "failed";
  errorMessage: string;
  createdAt: any;
}

function mapRow(row: any): Generation {
  return {
    id: row.id,
    userId: row.user_id,
    templateId: row.template_id,
    templateTitle: row.template_title,
    toolSlug: row.tool_slug,
    modelUsed: row.model_used,
    inputPrompt: row.input_prompt,
    outputUrl: row.output_url,
    outputType: row.output_type,
    resolution: row.resolution,
    aspectRatio: row.aspect_ratio,
    creditsCharged: row.credits_charged,
    providerCost: Number(row.provider_cost),
    processingTimeMs: row.processing_time_ms,
    status: row.status,
    errorMessage: row.error_message,
    createdAt: row.created_at,
  };
}

export async function createGeneration(data: Omit<Generation, "id" | "createdAt">): Promise<string> {
  const { data: row, error } = await supabase
    .from("generations")
    .insert({
      user_id: data.userId,
      template_id: data.templateId,
      template_title: data.templateTitle,
      tool_slug: data.toolSlug,
      model_used: data.modelUsed,
      input_prompt: data.inputPrompt,
      output_url: data.outputUrl,
      output_type: data.outputType,
      resolution: data.resolution,
      aspect_ratio: data.aspectRatio,
      credits_charged: data.creditsCharged,
      provider_cost: data.providerCost,
      processing_time_ms: data.processingTimeMs,
      status: data.status,
      error_message: data.errorMessage,
    })
    .select("id")
    .single();
  if (error) throw error;
  return row.id;
}

export async function updateGeneration(id: string, data: Partial<Generation>) {
  const dbUpdates: any = {};
  if (data.status !== undefined) dbUpdates.status = data.status;
  if (data.outputUrl !== undefined) dbUpdates.output_url = data.outputUrl;
  if (data.errorMessage !== undefined) dbUpdates.error_message = data.errorMessage;
  if (data.processingTimeMs !== undefined) dbUpdates.processing_time_ms = data.processingTimeMs;
  if (data.providerCost !== undefined) dbUpdates.provider_cost = data.providerCost;

  const { error } = await supabase.from("generations").update(dbUpdates).eq("id", id);
  if (error) throw error;
}

export async function getGeneration(id: string): Promise<Generation | null> {
  const { data, error } = await supabase.from("generations").select("*").eq("id", id).single();
  if (error || !data) return null;
  return mapRow(data);
}

export async function getUserGenerations(
  userId: string,
  options: { limitCount?: number; lastPage?: number } = {}
): Promise<{ generations: Generation[]; lastPage: number | null }> {
  const pageSize = options.limitCount || 20;
  const page = options.lastPage || 0;

  const { data, error } = await supabase
    .from("generations")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);

  if (error) throw error;
  return {
    generations: (data || []).map(mapRow),
    lastPage: (data || []).length === pageSize ? page + 1 : null,
  };
}

export async function getUserGenerationCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "completed");
  if (error) return 0;
  return count || 0;
}

export async function getTodayGenerationCount(): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count, error } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: true })
    .gte("created_at", today.toISOString())
    .eq("status", "completed");
  if (error) return 0;
  return count || 0;
}

export async function getRecentGenerations(count: number = 10): Promise<Generation[]> {
  const { data, error } = await supabase
    .from("generations")
    .select("*")
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(count);
  if (error) return [];
  return (data || []).map(mapRow);
}
