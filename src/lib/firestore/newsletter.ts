import { supabasePublicPublic } from "@/lib/supabasePublic";

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_LIST_ID = Number(import.meta.env.VITE_BREVO_LIST_ID) || 2;

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  createdAt: any;
}

function mapRow(row: any): NewsletterSubscriber {
  return { id: row.id, email: row.email, name: row.name, createdAt: row.created_at };
}

async function addToBrevo(email: string, name: string): Promise<void> {
  if (!BREVO_API_KEY) return;
  try {
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name || undefined },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });
  } catch (err) {
    console.error("Brevo subscription failed:", err);
  }
}

export async function subscribeNewsletter(email: string, name: string = ""): Promise<void> {
  const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
  await Promise.all([
    supabasePublic.from("newsletter_subscribers").upsert({ id: docId, email, name }),
    addToBrevo(email, name),
  ]);
}

export async function unsubscribeNewsletter(email: string): Promise<void> {
  const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
  await supabasePublic.from("newsletter_subscribers").delete().eq("id", docId);
}

export async function isSubscribed(email: string): Promise<boolean> {
  const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
  const { data } = await supabasePublic.from("newsletter_subscribers").select("id").eq("id", docId).single();
  return !!data;
}

export async function getAllSubscribers(): Promise<NewsletterSubscriber[]> {
  const { data, error } = await supabasePublic.from("newsletter_subscribers").select("*");
  if (error) return [];
  return (data || []).map(mapRow);
}

export async function getSubscriberCount(): Promise<number> {
  const { count, error } = await supabasePublic.from("newsletter_subscribers").select("*", { count: "exact", head: true });
  if (error) return 0;
  return count || 0;
}
