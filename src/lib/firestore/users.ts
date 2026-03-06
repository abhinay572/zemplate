import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  website: string;
  username: string;
  role: "user" | "admin";
  plan: "free" | "pro";
  credits: number;
  totalCreditsUsed: number;
  totalGenerations: number;
  totalSpent: number;
  referralCode: string;
  referralCreditsEarned: number;
  referredBy: string;
  instagramCredited: boolean;
  twitterCredited: boolean;
  youtubeCredited: boolean;
  isBanned: boolean;
  lastActiveAt: any;
  createdAt: any;
  updatedAt: any;
}

function mapRow(row: any): UserProfile {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    avatar: row.avatar,
    bio: row.bio,
    website: row.website,
    username: row.username,
    role: row.role,
    plan: row.plan,
    credits: row.credits,
    totalCreditsUsed: row.total_credits_used,
    totalGenerations: row.total_generations,
    totalSpent: Number(row.total_spent),
    referralCode: row.referral_code,
    referralCreditsEarned: row.referral_credits_earned,
    referredBy: row.referred_by,
    instagramCredited: row.instagram_credited,
    twitterCredited: row.twitter_credited,
    youtubeCredited: row.youtube_credited,
    isBanned: row.is_banned,
    lastActiveAt: row.last_active_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function generateReferralCode(name: string): string {
  const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 6);
  const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${clean}${suffix}`;
}

export async function createUserProfile(
  uid: string,
  data: { name: string; email: string; avatar: string; referredBy?: string }
) {
  const { error } = await supabase.from("users").insert({
    id: uid,
    name: data.name,
    email: data.email,
    avatar: data.avatar,
    referral_code: generateReferralCode(data.name),
    referred_by: data.referredBy || "",
  });
  if (error) throw error;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const { data, error } = await supabase.from("users").select("*").eq("id", uid).single();
  if (error || !data) return null;
  return mapRow(data);
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>) {
  const dbUpdates: any = { updated_at: new Date().toISOString() };
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.email !== undefined) dbUpdates.email = updates.email;
  if (updates.avatar !== undefined) dbUpdates.avatar = updates.avatar;
  if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
  if (updates.website !== undefined) dbUpdates.website = updates.website;
  if (updates.username !== undefined) dbUpdates.username = updates.username;
  if (updates.role !== undefined) dbUpdates.role = updates.role;
  if (updates.plan !== undefined) dbUpdates.plan = updates.plan;
  if (updates.credits !== undefined) dbUpdates.credits = updates.credits;
  if (updates.totalCreditsUsed !== undefined) dbUpdates.total_credits_used = updates.totalCreditsUsed;
  if (updates.totalGenerations !== undefined) dbUpdates.total_generations = updates.totalGenerations;
  if (updates.totalSpent !== undefined) dbUpdates.total_spent = updates.totalSpent;
  if (updates.referralCreditsEarned !== undefined) dbUpdates.referral_credits_earned = updates.referralCreditsEarned;
  if (updates.referredBy !== undefined) dbUpdates.referred_by = updates.referredBy;
  if (updates.instagramCredited !== undefined) dbUpdates.instagram_credited = updates.instagramCredited;
  if (updates.twitterCredited !== undefined) dbUpdates.twitter_credited = updates.twitterCredited;
  if (updates.youtubeCredited !== undefined) dbUpdates.youtube_credited = updates.youtubeCredited;
  if (updates.isBanned !== undefined) dbUpdates.is_banned = updates.isBanned;

  const { error } = await supabase.from("users").update(dbUpdates).eq("id", uid);
  if (error) throw error;
}

export async function updateLastActive(uid: string) {
  await supabase.from("users").update({ last_active_at: new Date().toISOString() }).eq("id", uid);
}

export async function deductCredits(uid: string, amount: number): Promise<boolean> {
  const profile = await getUserProfile(uid);
  if (!profile || profile.credits < amount) return false;
  const { error } = await supabase
    .from("users")
    .update({
      credits: profile.credits - amount,
      total_credits_used: profile.totalCreditsUsed + amount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", uid);
  if (error) return false;
  return true;
}

export async function addCredits(uid: string, amount: number) {
  const profile = await getUserProfile(uid);
  if (!profile) return;
  const { error } = await supabase
    .from("users")
    .update({
      credits: profile.credits + amount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", uid);
  if (error) throw error;
}

export async function incrementGenerations(uid: string) {
  const profile = await getUserProfile(uid);
  if (!profile) return;
  await supabase
    .from("users")
    .update({ total_generations: profile.totalGenerations + 1 })
    .eq("id", uid);
}

export async function banUser(uid: string) {
  await updateUserProfile(uid, { isBanned: true });
}

export async function unbanUser(uid: string) {
  await updateUserProfile(uid, { isBanned: false });
}

export async function getAllUsers(options: {
  limitCount?: number;
  lastPage?: number;
  plan?: string;
  status?: string;
} = {}) {
  const pageSize = options.limitCount || 20;
  const page = options.lastPage || 0;

  let q = supabase.from("users").select("*").order("created_at", { ascending: false });

  if (options.plan && options.plan !== "all") {
    q = q.eq("plan", options.plan);
  }
  if (options.status === "banned") {
    q = q.eq("is_banned", true);
  } else if (options.status === "active") {
    q = q.eq("is_banned", false);
  }

  q = q.range(page * pageSize, (page + 1) * pageSize - 1);

  const { data, error } = await q;
  if (error) throw error;
  return {
    users: (data || []).map(mapRow),
    lastPage: (data || []).length === pageSize ? page + 1 : null,
  };
}

export async function getUserByReferralCode(code: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("referral_code", code)
    .limit(1)
    .single();
  if (error || !data) return null;
  return mapRow(data);
}

export async function getTotalUserCount(): Promise<number> {
  const { count, error } = await supabase.from("users").select("*", { count: "exact", head: true });
  if (error) return 0;
  return count || 0;
}

export async function getProUserCount(): Promise<number> {
  const { count, error } = await supabase.from("users").select("*", { count: "exact", head: true }).eq("plan", "pro");
  if (error) return 0;
  return count || 0;
}
