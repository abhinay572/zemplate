import { supabase } from "@/lib/supabase";

export interface SocialCreditClaim {
  id: string;
  userId: string;
  userName: string;
  platform: "instagram" | "twitter" | "youtube";
  proofUrl: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy: string;
  reviewedAt: any;
  createdAt: any;
}

function mapRow(row: any): SocialCreditClaim {
  return {
    id: row.id, userId: row.user_id, userName: row.user_name,
    platform: row.platform, proofUrl: row.proof_url, status: row.status,
    reviewedBy: row.reviewed_by || "", reviewedAt: row.reviewed_at,
    createdAt: row.created_at,
  };
}

export async function createSocialClaim(data: {
  userId: string;
  userName: string;
  platform: "instagram" | "twitter" | "youtube";
  proofUrl: string;
}): Promise<string> {
  const { data: row, error } = await supabase
    .from("social_credit_claims")
    .insert({
      user_id: data.userId, user_name: data.userName,
      platform: data.platform, proof_url: data.proofUrl,
    })
    .select("id")
    .single();
  if (error) throw error;
  return row.id;
}

export async function hasClaimedPlatform(userId: string, platform: string): Promise<boolean> {
  const { data } = await supabase
    .from("social_credit_claims")
    .select("id")
    .eq("user_id", userId)
    .eq("platform", platform)
    .eq("status", "approved")
    .limit(1)
    .single();
  return !!data;
}

export async function getPendingClaims(): Promise<SocialCreditClaim[]> {
  const { data, error } = await supabase
    .from("social_credit_claims")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data || []).map(mapRow);
}

export async function approveClaim(claimId: string, adminId: string) {
  const { error } = await supabase
    .from("social_credit_claims")
    .update({ status: "approved", reviewed_by: adminId, reviewed_at: new Date().toISOString() })
    .eq("id", claimId);
  if (error) throw error;
}

export async function rejectClaim(claimId: string, adminId: string) {
  const { error } = await supabase
    .from("social_credit_claims")
    .update({ status: "rejected", reviewed_by: adminId, reviewed_at: new Date().toISOString() })
    .eq("id", claimId);
  if (error) throw error;
}
