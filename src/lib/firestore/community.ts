import { supabase } from "@/lib/supabase";

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  templateId: string;
  templateTitle: string;
  toolUsed: string;
  likes: number;
  comments: number;
  createdAt: any;
}

export interface PostComment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: any;
}

function mapPost(row: any): CommunityPost {
  return {
    id: row.id, userId: row.user_id, userName: row.user_name, userAvatar: row.user_avatar,
    imageUrl: row.image_url, caption: row.caption, templateId: row.template_id,
    templateTitle: row.template_title, toolUsed: row.tool_used,
    likes: row.likes, comments: row.comments, createdAt: row.created_at,
  };
}

function mapComment(row: any): PostComment {
  return {
    id: row.id, postId: row.post_id, userId: row.user_id, userName: row.user_name,
    userAvatar: row.user_avatar, text: row.text, createdAt: row.created_at,
  };
}

export async function createPost(data: Omit<CommunityPost, "id" | "likes" | "comments" | "createdAt">): Promise<string> {
  const { data: row, error } = await supabase
    .from("community_posts")
    .insert({
      user_id: data.userId, user_name: data.userName, user_avatar: data.userAvatar,
      image_url: data.imageUrl, caption: data.caption, template_id: data.templateId,
      template_title: data.templateTitle, tool_used: data.toolUsed,
    })
    .select("id")
    .single();
  if (error) throw error;
  return row.id;
}

export async function deletePost(id: string) {
  const { error } = await supabase.from("community_posts").delete().eq("id", id);
  if (error) throw error;
}

export async function likePost(postId: string, userId: string) {
  await supabase.from("community_post_likes").insert({ post_id: postId, user_id: userId });
  const { data } = await supabase.from("community_posts").select("likes").eq("id", postId).single();
  if (data) {
    await supabase.from("community_posts").update({ likes: data.likes + 1 }).eq("id", postId);
  }
}

export async function unlikePost(postId: string, userId: string) {
  await supabase.from("community_post_likes").delete().eq("post_id", postId).eq("user_id", userId);
  const { data } = await supabase.from("community_posts").select("likes").eq("id", postId).single();
  if (data) {
    await supabase.from("community_posts").update({ likes: Math.max(0, data.likes - 1) }).eq("id", postId);
  }
}

export async function hasUserLiked(postId: string, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("community_post_likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();
  return !!data;
}

export async function addComment(postId: string, data: Omit<PostComment, "id" | "postId" | "createdAt">): Promise<string> {
  const { data: row, error } = await supabase
    .from("community_post_comments")
    .insert({
      post_id: postId, user_id: data.userId, user_name: data.userName,
      user_avatar: data.userAvatar, text: data.text,
    })
    .select("id")
    .single();
  if (error) throw error;
  // Increment comments count
  const { data: post } = await supabase.from("community_posts").select("comments").eq("id", postId).single();
  if (post) {
    await supabase.from("community_posts").update({ comments: post.comments + 1 }).eq("id", postId);
  }
  return row.id;
}

export async function getPostComments(postId: string): Promise<PostComment[]> {
  const { data, error } = await supabase
    .from("community_post_comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) return [];
  return (data || []).map(mapComment);
}

export async function getCommunityPosts(
  options: { limitCount?: number; lastPage?: number; sortBy?: "likes" | "createdAt" } = {}
): Promise<{ posts: CommunityPost[]; lastPage: number | null }> {
  const pageSize = options.limitCount || 20;
  const page = options.lastPage || 0;
  const sortCol = options.sortBy === "likes" ? "likes" : "created_at";

  const { data, error } = await supabase
    .from("community_posts")
    .select("*")
    .order(sortCol, { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);

  if (error) throw error;
  return {
    posts: (data || []).map(mapPost),
    lastPage: (data || []).length === pageSize ? page + 1 : null,
  };
}

export async function getUserPosts(userId: string): Promise<CommunityPost[]> {
  const { data, error } = await supabase
    .from("community_posts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) return [];
  return (data || []).map(mapPost);
}
