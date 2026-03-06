import { supabase } from "@/lib/supabase";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  createdAt: any;
}

function mapRow(row: any): NewsletterSubscriber {
  return { id: row.id, email: row.email, name: row.name, createdAt: row.created_at };
}

export async function subscribeNewsletter(email: string, name: string = ""): Promise<void> {
  const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
  await supabase.from("newsletter_subscribers").upsert({ id: docId, email, name });
}

export async function unsubscribeNewsletter(email: string): Promise<void> {
  const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
  await supabase.from("newsletter_subscribers").delete().eq("id", docId);
}

export async function isSubscribed(email: string): Promise<boolean> {
  const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
  const { data } = await supabase.from("newsletter_subscribers").select("id").eq("id", docId).single();
  return !!data;
}

export async function getAllSubscribers(): Promise<NewsletterSubscriber[]> {
  const { data, error } = await supabase.from("newsletter_subscribers").select("*");
  if (error) return [];
  return (data || []).map(mapRow);
}

export async function getSubscriberCount(): Promise<number> {
  const { count, error } = await supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true });
  if (error) return 0;
  return count || 0;
}
