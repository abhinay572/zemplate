import {
  doc, setDoc, deleteDoc, collection, query, getDocs, serverTimestamp,
  where, limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  createdAt: any;
}

export async function subscribeNewsletter(email: string, name: string = ""): Promise<void> {
  // Use email as doc ID to prevent duplicates
  const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
  await setDoc(doc(db, "newsletter_subscribers", docId), {
    email,
    name,
    createdAt: serverTimestamp(),
  });
}

export async function unsubscribeNewsletter(email: string): Promise<void> {
  const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
  await deleteDoc(doc(db, "newsletter_subscribers", docId));
}

export async function isSubscribed(email: string): Promise<boolean> {
  const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
  const { getDoc } = await import("firebase/firestore");
  const snap = await getDoc(doc(db, "newsletter_subscribers", docId));
  return snap.exists();
}

export async function getAllSubscribers(): Promise<NewsletterSubscriber[]> {
  const q = query(collection(db, "newsletter_subscribers"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as NewsletterSubscriber));
}

export async function getSubscriberCount(): Promise<number> {
  const snap = await getDocs(collection(db, "newsletter_subscribers"));
  return snap.size;
}
