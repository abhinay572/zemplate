import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where,
  orderBy, limit, getDocs, serverTimestamp, increment, startAfter,
  DocumentSnapshot, writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Template {
  id: string;
  title: string;
  slug: string;
  category: string;
  hiddenPrompt: string; // NEVER exposed to frontend users
  model: string;
  modelSlug: string;
  creditCost: number;
  aspectRatio: string;
  tags: string[];
  imageUrl: string;
  status: "published" | "draft";
  usageCount: number;
  likesCount: number;
  authorName: string;
  authorAvatar: string;
  createdAt: any;
  updatedAt: any;
}

// Public-safe template (no hidden prompt)
export type PublicTemplate = Omit<Template, "hiddenPrompt">;

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function createTemplate(data: {
  title: string;
  category: string;
  hiddenPrompt: string;
  model: string;
  modelSlug: string;
  creditCost: number;
  aspectRatio: string;
  tags: string[];
  imageUrl: string;
  status: "published" | "draft";
  authorName: string;
  authorAvatar: string;
}): Promise<string> {
  const ref = doc(collection(db, "templates"));
  await setDoc(ref, {
    ...data,
    slug: slugify(data.title),
    usageCount: 0,
    likesCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getTemplate(id: string): Promise<Template | null> {
  const snap = await getDoc(doc(db, "templates", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Template;
}

// Fetch hidden prompt (admin / generation server only)
export async function getTemplatePrompt(id: string): Promise<string | null> {
  const template = await getTemplate(id);
  return template?.hiddenPrompt || null;
}

export async function updateTemplate(id: string, data: Partial<Template>) {
  await updateDoc(doc(db, "templates", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteTemplate(id: string) {
  await deleteDoc(doc(db, "templates", id));
}

export async function incrementTemplateUsage(id: string) {
  await updateDoc(doc(db, "templates", id), { usageCount: increment(1) });
}

export async function incrementTemplateLikes(id: string) {
  await updateDoc(doc(db, "templates", id), { likesCount: increment(1) });
}

export async function decrementTemplateLikes(id: string) {
  await updateDoc(doc(db, "templates", id), { likesCount: increment(-1) });
}

// Public listing — strips hiddenPrompt
export async function getPublicTemplates(options: {
  category?: string;
  limitCount?: number;
  lastDoc?: DocumentSnapshot;
  sortBy?: "usageCount" | "createdAt" | "likesCount";
} = {}): Promise<{ templates: PublicTemplate[]; lastDoc: DocumentSnapshot | null }> {
  const constraints: any[] = [where("status", "==", "published")];
  if (options.category && options.category !== "All") {
    constraints.push(where("category", "==", options.category));
  }
  constraints.push(orderBy(options.sortBy || "createdAt", "desc"));
  if (options.lastDoc) constraints.push(startAfter(options.lastDoc));
  constraints.push(limit(options.limitCount || 20));

  const q = query(collection(db, "templates"), ...constraints);
  const snap = await getDocs(q);

  const templates = snap.docs.map((d) => {
    const data = d.data();
    const { hiddenPrompt, ...publicData } = data;
    return { id: d.id, ...publicData } as PublicTemplate;
  });

  return { templates, lastDoc: snap.docs[snap.docs.length - 1] || null };
}

// Admin listing — includes hiddenPrompt
export async function getAdminTemplates(options: {
  category?: string;
  status?: string;
  limitCount?: number;
  lastDoc?: DocumentSnapshot;
} = {}): Promise<{ templates: Template[]; lastDoc: DocumentSnapshot | null }> {
  const constraints: any[] = [orderBy("createdAt", "desc")];
  if (options.category && options.category !== "All") {
    constraints.unshift(where("category", "==", options.category));
  }
  if (options.status && options.status !== "all") {
    constraints.unshift(where("status", "==", options.status));
  }
  if (options.lastDoc) constraints.push(startAfter(options.lastDoc));
  constraints.push(limit(options.limitCount || 50));

  const q = query(collection(db, "templates"), ...constraints);
  const snap = await getDocs(q);

  return {
    templates: snap.docs.map((d) => ({ id: d.id, ...d.data() } as Template)),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
  };
}

// Trending = sorted by usageCount
export async function getTrendingTemplates(count: number = 10): Promise<PublicTemplate[]> {
  const q = query(
    collection(db, "templates"),
    where("status", "==", "published"),
    orderBy("usageCount", "desc"),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const { hiddenPrompt, ...data } = d.data();
    return { id: d.id, ...data } as PublicTemplate;
  });
}

export async function searchTemplates(searchTerm: string): Promise<PublicTemplate[]> {
  // Firestore doesn't support full-text search natively.
  // For now, fetch all published and filter client-side.
  // For production, use Algolia or Typesense.
  const q = query(
    collection(db, "templates"),
    where("status", "==", "published"),
    orderBy("usageCount", "desc"),
    limit(100)
  );
  const snap = await getDocs(q);
  const term = searchTerm.toLowerCase();
  return snap.docs
    .map((d) => {
      const { hiddenPrompt, ...data } = d.data();
      return { id: d.id, ...data } as PublicTemplate;
    })
    .filter(
      (t) =>
        t.title.toLowerCase().includes(term) ||
        t.category.toLowerCase().includes(term) ||
        t.tags?.some((tag: string) => tag.toLowerCase().includes(term))
    );
}

export async function getTemplateCount(): Promise<{ total: number; published: number; draft: number }> {
  const allSnap = await getDocs(collection(db, "templates"));
  let published = 0;
  let draft = 0;
  allSnap.forEach((d) => {
    if (d.data().status === "published") published++;
    else draft++;
  });
  return { total: allSnap.size, published, draft };
}

// Bulk create templates (up to 500 per batch — Firestore limit)
export async function createTemplateBatch(
  templates: Array<{
    title: string;
    category: string;
    hiddenPrompt: string;
    model: string;
    modelSlug: string;
    creditCost: number;
    aspectRatio: string;
    tags: string[];
    imageUrl: string;
    status: "published" | "draft";
    authorName: string;
    authorAvatar: string;
  }>
): Promise<string[]> {
  const ids: string[] = [];
  // Firestore batch limit is 500 operations
  const chunks = [];
  for (let i = 0; i < templates.length; i += 450) {
    chunks.push(templates.slice(i, i + 450));
  }

  for (const chunk of chunks) {
    const batch = writeBatch(db);
    for (const data of chunk) {
      const ref = doc(collection(db, "templates"));
      batch.set(ref, {
        ...data,
        slug: slugify(data.title),
        usageCount: 0,
        likesCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      ids.push(ref.id);
    }
    await batch.commit();
  }

  return ids;
}
