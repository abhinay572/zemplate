import { supabase } from "@/lib/supabase";

export interface Template {
  id: string;
  title: string;
  slug: string;
  category: string;
  hiddenPrompt: string;
  model: string;
  modelSlug: string;
  creditCost: number;
  aspectRatio: string;
  tags: string[];
  imageUrl: string;
  status: "published" | "draft";
  usageCount: number;
  likesCount: number;
  authorName: string;
  authorAvatar: string;
  createdAt: any;
  updatedAt: any;
}

export type PublicTemplate = Omit<Template, "hiddenPrompt">;

function mapRow(row: any): Template {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    hiddenPrompt: row.hidden_prompt,
    model: row.model,
    modelSlug: row.model_slug,
    creditCost: row.credit_cost,
    aspectRatio: row.aspect_ratio,
    tags: row.tags || [],
    imageUrl: row.image_url,
    status: row.status,
    usageCount: row.usage_count,
    likesCount: row.likes_count,
    authorName: row.author_name,
    authorAvatar: row.author_avatar,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toPublic(t: Template): PublicTemplate {
  const { hiddenPrompt, ...rest } = t;
  return rest;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function createTemplate(data: {
  title: string;
  category: string;
  hiddenPrompt: string;
  model: string;
  modelSlug: string;
  creditCost: number;
  aspectRatio: string;
  tags: string[];
  imageUrl: string;
  status: "published" | "draft";
  authorName: string;
  authorAvatar: string;
}): Promise<string> {
  const { data: row, error } = await supabase
    .from("templates")
    .insert({
      title: data.title,
      slug: slugify(data.title),
      category: data.category,
      hidden_prompt: data.hiddenPrompt,
      model: data.model,
      model_slug: data.modelSlug,
      credit_cost: data.creditCost,
      aspect_ratio: data.aspectRatio,
      tags: data.tags,
      image_url: data.imageUrl,
      status: data.status,
      author_name: data.authorName,
      author_avatar: data.authorAvatar,
    })
    .select("id")
    .single();
  if (error) throw error;
  return row.id;
}

export async function getTemplate(id: string): Promise<Template | null> {
  const { data, error } = await supabase.from("templates").select("*").eq("id", id).single();
  if (error || !data) return null;
  return mapRow(data);
}

export async function getTemplatePrompt(id: string): Promise<string | null> {
  const t = await getTemplate(id);
  return t?.hiddenPrompt || null;
}

export async function updateTemplate(id: string, updates: Partial<Template>) {
  const dbUpdates: any = { updated_at: new Date().toISOString() };
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.category !== undefined) dbUpdates.category = updates.category;
  if (updates.hiddenPrompt !== undefined) dbUpdates.hidden_prompt = updates.hiddenPrompt;
  if (updates.model !== undefined) dbUpdates.model = updates.model;
  if (updates.modelSlug !== undefined) dbUpdates.model_slug = updates.modelSlug;
  if (updates.creditCost !== undefined) dbUpdates.credit_cost = updates.creditCost;
  if (updates.aspectRatio !== undefined) dbUpdates.aspect_ratio = updates.aspectRatio;
  if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
  if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.authorName !== undefined) dbUpdates.author_name = updates.authorName;
  if (updates.authorAvatar !== undefined) dbUpdates.author_avatar = updates.authorAvatar;
  if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
  if (updates.usageCount !== undefined) dbUpdates.usage_count = updates.usageCount;
  if (updates.likesCount !== undefined) dbUpdates.likes_count = updates.likesCount;

  const { error } = await supabase.from("templates").update(dbUpdates).eq("id", id);
  if (error) throw error;
}

export async function deleteTemplate(id: string) {
  const { error } = await supabase.from("templates").delete().eq("id", id);
  if (error) throw error;
}

export async function incrementTemplateUsage(id: string) {
  const t = await getTemplate(id);
  if (!t) return;
  await supabase.from("templates").update({ usage_count: t.usageCount + 1 }).eq("id", id);
}

export async function incrementTemplateLikes(id: string) {
  const t = await getTemplate(id);
  if (!t) return;
  await supabase.from("templates").update({ likes_count: t.likesCount + 1 }).eq("id", id);
}

export async function decrementTemplateLikes(id: string) {
  const t = await getTemplate(id);
  if (!t) return;
  await supabase.from("templates").update({ likes_count: Math.max(0, t.likesCount - 1) }).eq("id", id);
}

export async function getPublicTemplates(options: {
  category?: string;
  limitCount?: number;
  lastPage?: number;
  sortBy?: "usageCount" | "createdAt" | "likesCount";
} = {}): Promise<{ templates: PublicTemplate[]; lastPage: number | null }> {
  const pageSize = options.limitCount || 20;
  const page = options.lastPage || 0;
  const sortCol = options.sortBy === "usageCount" ? "usage_count"
    : options.sortBy === "likesCount" ? "likes_count" : "created_at";

  let q = supabase.from("templates").select("id,title,slug,category,model,model_slug,credit_cost,aspect_ratio,tags,image_url,status,usage_count,likes_count,author_name,author_avatar,created_at,updated_at").eq("status", "published").order(sortCol, { ascending: false });

  if (options.category && options.category !== "All") {
    q = q.eq("category", options.category);
  }
  q = q.range(page * pageSize, (page + 1) * pageSize - 1);

  const { data, error } = await q;
  if (error) throw error;
  const templates = (data || []).map(mapRow).map(toPublic);
  return { templates, lastPage: (data || []).length === pageSize ? page + 1 : null };
}

export async function getAdminTemplates(options: {
  category?: string;
  status?: string;
  limitCount?: number;
  lastPage?: number;
} = {}): Promise<{ templates: Template[]; lastPage: number | null }> {
  const pageSize = options.limitCount || 50;
  const page = options.lastPage || 0;

  let q = supabase.from("templates").select("*").order("created_at", { ascending: false });

  if (options.category && options.category !== "All") {
    q = q.eq("category", options.category);
  }
  if (options.status && options.status !== "all") {
    q = q.eq("status", options.status);
  }
  q = q.range(page * pageSize, (page + 1) * pageSize - 1);

  const { data, error } = await q;
  if (error) throw error;
  return {
    templates: (data || []).map(mapRow),
    lastPage: (data || []).length === pageSize ? page + 1 : null,
  };
}

export async function getTrendingTemplates(count: number = 10): Promise<PublicTemplate[]> {
  const { data, error } = await supabase
    .from("templates")
    .select("id,title,slug,category,model,model_slug,credit_cost,aspect_ratio,tags,image_url,status,usage_count,likes_count,author_name,author_avatar,created_at,updated_at")
    .eq("status", "published")
    .order("usage_count", { ascending: false })
    .limit(count);
  if (error) throw error;
  return (data || []).map(mapRow).map(toPublic);
}

export async function searchTemplates(searchTerm: string): Promise<PublicTemplate[]> {
  const term = searchTerm.trim();
  if (!term) return [];

  const { data, error } = await supabase
    .from("templates")
    .select("id,title,slug,category,model,model_slug,credit_cost,aspect_ratio,tags,image_url,status,usage_count,likes_count,author_name,author_avatar,created_at,updated_at")
    .eq("status", "published")
    .ilike("title", `%${term}%`)
    .order("usage_count", { ascending: false })
    .limit(50);
  if (error) throw error;
  return (data || []).map(mapRow).map(toPublic);
}

export async function getTemplateCount(): Promise<{ total: number; published: number; draft: number }> {
  const { count: total } = await supabase.from("templates").select("*", { count: "exact", head: true });
  const { count: published } = await supabase.from("templates").select("*", { count: "exact", head: true }).eq("status", "published");
  return { total: total || 0, published: published || 0, draft: (total || 0) - (published || 0) };
}
