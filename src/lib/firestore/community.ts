import {
  doc, setDoc, updateDoc, deleteDoc, collection, query, where,
  orderBy, limit, getDocs, serverTimestamp, increment, startAfter,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export async function createPost(data: Omit<CommunityPost, "id" | "likes" | "comments" | "createdAt">): Promise<string> {
  const ref = doc(collection(db, "community_posts"));
  await setDoc(ref, { ...data, likes: 0, comments: 0, createdAt: serverTimestamp() });
  return ref.id;
}

export async function deletePost(id: string) {
  await deleteDoc(doc(db, "community_posts", id));
}

export async function likePost(postId: string, userId: string) {
  // Store like record to prevent double-likes
  const likeRef = doc(db, "community_posts", postId, "likes", userId);
  await setDoc(likeRef, { userId, createdAt: serverTimestamp() });
  await updateDoc(doc(db, "community_posts", postId), { likes: increment(1) });
}

export async function unlikePost(postId: string, userId: string) {
  const likeRef = doc(db, "community_posts", postId, "likes", userId);
  await deleteDoc(likeRef);
  await updateDoc(doc(db, "community_posts", postId), { likes: increment(-1) });
}

export async function hasUserLiked(postId: string, userId: string): Promise<boolean> {
  const { getDoc: gd } = await import("firebase/firestore");
  const snap = await gd(doc(db, "community_posts", postId, "likes", userId));
  return snap.exists();
}

export async function addComment(postId: string, data: Omit<PostComment, "id" | "postId" | "createdAt">): Promise<string> {
  const ref = doc(collection(db, "community_posts", postId, "comments"));
  await setDoc(ref, { ...data, postId, createdAt: serverTimestamp() });
  await updateDoc(doc(db, "community_posts", postId), { comments: increment(1) });
  return ref.id;
}

export async function getPostComments(postId: string): Promise<PostComment[]> {
  const q = query(
    collection(db, "community_posts", postId, "comments"),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PostComment));
}

export async function getCommunityPosts(
  options: { limitCount?: number; lastDoc?: DocumentSnapshot; sortBy?: "likes" | "createdAt" } = {}
): Promise<{ posts: CommunityPost[]; lastDoc: DocumentSnapshot | null }> {
  const q = query(
    collection(db, "community_posts"),
    orderBy(options.sortBy || "createdAt", "desc"),
    ...(options.lastDoc ? [startAfter(options.lastDoc)] : []),
    limit(options.limitCount || 20)
  );
  const snap = await getDocs(q);
  return {
    posts: snap.docs.map((d) => ({ id: d.id, ...d.data() } as CommunityPost)),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
  };
}

export async function getUserPosts(userId: string): Promise<CommunityPost[]> {
  const q = query(
    collection(db, "community_posts"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CommunityPost));
}
