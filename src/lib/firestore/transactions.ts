import {
  doc, setDoc, collection, query, where, orderBy, limit,
  getDocs, serverTimestamp, startAfter, DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Transaction {
  id: string;
  userId: string;
  type: "subscription" | "credit_pack" | "referral_bonus" | "social_bonus" | "admin_gift";
  description: string;
  amount: number; // In INR (0 for free bonuses)
  credits: number; // Credits added
  currency: "INR" | "USD";
  paymentProvider: "razorpay" | "lemonsqueezy" | "system";
  paymentId: string;
  orderId: string;
  status: "pending" | "paid" | "failed" | "refunded";
  createdAt: any;
}

export async function createTransaction(data: Omit<Transaction, "id" | "createdAt">): Promise<string> {
  const ref = doc(collection(db, "transactions"));
  await setDoc(ref, { ...data, createdAt: serverTimestamp() });
  return ref.id;
}

export async function getUserTransactions(
  userId: string,
  options: { limitCount?: number; lastDoc?: DocumentSnapshot } = {}
): Promise<{ transactions: Transaction[]; lastDoc: DocumentSnapshot | null }> {
  const constraints: any[] = [
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  ];
  if (options.lastDoc) constraints.push(startAfter(options.lastDoc));
  constraints.push(limit(options.limitCount || 20));

  const q = query(collection(db, "transactions"), ...constraints);
  const snap = await getDocs(q);

  return {
    transactions: snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction)),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
  };
}

export async function getAllTransactions(
  options: { limitCount?: number; lastDoc?: DocumentSnapshot } = {}
): Promise<{ transactions: Transaction[]; lastDoc: DocumentSnapshot | null }> {
  const constraints: any[] = [orderBy("createdAt", "desc")];
  if (options.lastDoc) constraints.push(startAfter(options.lastDoc));
  constraints.push(limit(options.limitCount || 50));

  const q = query(collection(db, "transactions"), ...constraints);
  const snap = await getDocs(q);

  return {
    transactions: snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction)),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
  };
}

export async function getTotalRevenue(): Promise<number> {
  const q = query(
    collection(db, "transactions"),
    where("status", "==", "paid")
  );
  const snap = await getDocs(q);
  let total = 0;
  snap.forEach((d) => { total += d.data().amount || 0; });
  return total;
}
