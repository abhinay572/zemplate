import { supabase, supabasePublic } from "@/lib/supabase";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  authorName: string;
  authorAvatar: string;
  readTime: number;
  status: "draft" | "published" | "archived";
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

function mapRow(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    tags: row.tags || [],
    imageUrl: row.image_url,
    authorName: row.author_name,
    authorAvatar: row.author_avatar,
    readTime: row.read_time,
    status: row.status,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    metaKeywords: row.meta_keywords,
    views: row.views,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Public reads use supabasePublic to avoid auth lock
export async function getPublishedPosts(options: {
  limitCount?: number;
  lastPage?: number;
  category?: string;
} = {}): Promise<{ posts: BlogPost[]; lastPage: number | null }> {
  const pageSize = options.limitCount || 12;
  const page = options.lastPage || 0;

  let q = supabasePublic
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);

  if (options.category) {
    q = q.eq("category", options.category);
  }

  const { data, error } = await q;
  if (error) throw error;

  return {
    posts: (data || []).map(mapRow),
    lastPage: (data || []).length === pageSize ? page + 1 : null,
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabasePublic
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return mapRow(data);
}

export async function getRelatedPosts(category: string, excludeSlug: string, limit = 3): Promise<BlogPost[]> {
  const { data, error } = await supabasePublic
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data || []).map(mapRow);
}

export async function getBlogCategories(): Promise<string[]> {
  const { data, error } = await supabasePublic
    .from("blog_posts")
    .select("category")
    .eq("status", "published");

  if (error) return [];
  const unique = [...new Set((data || []).map((r: any) => r.category))];
  return unique.sort();
}

export async function incrementPostViews(slug: string): Promise<void> {
  await supabasePublic.rpc("increment_blog_views", { post_slug: slug }).catch(() => {});
}

// Admin functions use authenticated client
export async function createBlogPost(data: Omit<BlogPost, "id" | "views" | "createdAt" | "updatedAt">): Promise<string> {
  const { data: row, error } = await supabase
    .from("blog_posts")
    .insert({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      tags: data.tags,
      image_url: data.imageUrl,
      author_name: data.authorName,
      author_avatar: data.authorAvatar,
      read_time: data.readTime,
      status: data.status,
      meta_title: data.metaTitle,
      meta_description: data.metaDescription,
      meta_keywords: data.metaKeywords,
    })
    .select("id")
    .single();

  if (error) throw error;
  return row.id;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data || []).map(mapRow);
}

export async function getPublishedSlugs(): Promise<string[]> {
  const { data, error } = await supabasePublic
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");

  if (error) return [];
  return (data || []).map((r: any) => r.slug);
}
