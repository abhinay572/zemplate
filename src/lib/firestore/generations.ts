import {
  doc, setDoc, getDoc, collection, query, where, orderBy, limit,
  getDocs, serverTimestamp, startAfter, DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Generation {
  id: string;
  userId: string;
  templateId: string;
  templateTitle: string;
  toolSlug: string;
  modelUsed: string;
  inputPrompt: string; // The merged prompt (still hidden from user)
  outputUrl: string;
  outputType: "image" | "video";
  resolution: string;
  aspectRatio: string;
  creditsCharged: number;
  providerCost: number;
  processingTimeMs: number;
  status: "pending" | "processing" | "completed" | "failed";
  errorMessage: string;
  createdAt: any;
}

export async function createGeneration(data: Omit<Generation, "id" | "createdAt">): Promise<string> {
  const ref = doc(collection(db, "generations"));
  await setDoc(ref, { ...data, createdAt: serverTimestamp() });
  return ref.id;
}

export async function updateGeneration(id: string, data: Partial<Generation>) {
  const ref = doc(db, "generations", id);
  await import("firebase/firestore").then(({ updateDoc }) => updateDoc(ref, data));
}

export async function getGeneration(id: string): Promise<Generation | null> {
  const snap = await getDoc(doc(db, "generations", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Generation;
}

export async function getUserGenerations(
  userId: string,
  options: { limitCount?: number; lastDoc?: DocumentSnapshot } = {}
): Promise<{ generations: Generation[]; lastDoc: DocumentSnapshot | null }> {
  const constraints: any[] = [
    where("userId", "==", userId),
    where("status", "==", "completed"),
    orderBy("createdAt", "desc"),
  ];
  if (options.lastDoc) constraints.push(startAfter(options.lastDoc));
  constraints.push(limit(options.limitCount || 20));

  const q = query(collection(db, "generations"), ...constraints);
  const snap = await getDocs(q);

  return {
    generations: snap.docs.map((d) => ({ id: d.id, ...d.data() } as Generation)),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
  };
}

export async function getUserGenerationCount(userId: string): Promise<number> {
  const q = query(
    collection(db, "generations"),
    where("userId", "==", userId),
    where("status", "==", "completed")
  );
  const snap = await getDocs(q);
  return snap.size;
}

export async function getTodayGenerationCount(): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const q = query(
    collection(db, "generations"),
    where("createdAt", ">=", today),
    where("status", "==", "completed")
  );
  const snap = await getDocs(q);
  return snap.size;
}

export async function getRecentGenerations(count: number = 10): Promise<Generation[]> {
  const q = query(
    collection(db, "generations"),
    where("status", "==", "completed"),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Generation));
}
