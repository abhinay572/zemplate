import { supabase } from "@/lib/supabase";

export interface Transaction {
  id: string;
  userId: string;
  type: "subscription" | "credit_pack" | "referral_bonus" | "social_bonus" | "admin_gift";
  description: string;
  amount: number;
  credits: number;
  currency: "INR" | "USD";
  paymentProvider: "razorpay" | "lemonsqueezy" | "system";
  paymentId: string;
  orderId: string;
  status: "pending" | "paid" | "failed" | "refunded";
  createdAt: any;
}

function mapRow(row: any): Transaction {
  return {
    id: row.id, userId: row.user_id, type: row.type, description: row.description,
    amount: Number(row.amount), credits: row.credits, currency: row.currency,
    paymentProvider: row.payment_provider, paymentId: row.payment_id,
    orderId: row.order_id, status: row.status, createdAt: row.created_at,
  };
}

export async function createTransaction(data: Omit<Transaction, "id" | "createdAt">): Promise<string> {
  const { data: row, error } = await supabase
    .from("transactions")
    .insert({
      user_id: data.userId, type: data.type, description: data.description,
      amount: data.amount, credits: data.credits, currency: data.currency,
      payment_provider: data.paymentProvider, payment_id: data.paymentId,
      order_id: data.orderId, status: data.status,
    })
    .select("id")
    .single();
  if (error) throw error;
  return row.id;
}

export async function getUserTransactions(
  userId: string,
  options: { limitCount?: number; lastPage?: number } = {}
): Promise<{ transactions: Transaction[]; lastPage: number | null }> {
  const pageSize = options.limitCount || 20;
  const page = options.lastPage || 0;

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);

  if (error) throw error;
  return {
    transactions: (data || []).map(mapRow),
    lastPage: (data || []).length === pageSize ? page + 1 : null,
  };
}

export async function getAllTransactions(
  options: { limitCount?: number; lastPage?: number } = {}
): Promise<{ transactions: Transaction[]; lastPage: number | null }> {
  const pageSize = options.limitCount || 50;
  const page = options.lastPage || 0;

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);

  if (error) throw error;
  return {
    transactions: (data || []).map(mapRow),
    lastPage: (data || []).length === pageSize ? page + 1 : null,
  };
}

export async function getTotalRevenue(): Promise<number> {
  const { data, error } = await supabase
    .from("transactions")
    .select("amount")
    .eq("status", "paid");
  if (error) return 0;
  return (data || []).reduce((sum: number, d: any) => sum + Number(d.amount || 0), 0);
}
