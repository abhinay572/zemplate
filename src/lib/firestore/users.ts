import {
  doc, getDoc, setDoc, updateDoc, collection, query, where,
  orderBy, limit, getDocs, serverTimestamp, increment, startAfter,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

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

function generateReferralCode(name: string): string {
  const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 6);
  const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${clean}${suffix}`;
}

export async function createUserProfile(
  uid: string,
  data: { name: string; email: string; avatar: string; referredBy?: string }
) {
  const ref = doc(db, "users", uid);
  await setDoc(ref, {
    name: data.name,
    email: data.email,
    avatar: data.avatar,
    bio: "",
    website: "",
    username: "",
    role: "user",
    plan: "free",
    credits: 5, // 5 free credits on signup
    totalCreditsUsed: 0,
    totalGenerations: 0,
    totalSpent: 0,
    referralCode: generateReferralCode(data.name),
    referralCreditsEarned: 0,
    referredBy: data.referredBy || "",
    instagramCredited: false,
    twitterCredited: false,
    youtubeCredited: false,
    isBanned: false,
    lastActiveAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as UserProfile;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function updateLastActive(uid: string) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { lastActiveAt: serverTimestamp() });
}

export async function deductCredits(uid: string, amount: number): Promise<boolean> {
  const profile = await getUserProfile(uid);
  if (!profile || profile.credits < amount) return false;
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    credits: increment(-amount),
    totalCreditsUsed: increment(amount),
    updatedAt: serverTimestamp(),
  });
  return true;
}

export async function addCredits(uid: string, amount: number) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    credits: increment(amount),
    updatedAt: serverTimestamp(),
  });
}

export async function incrementGenerations(uid: string) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { totalGenerations: increment(1) });
}

export async function banUser(uid: string) {
  await updateUserProfile(uid, { isBanned: true });
}

export async function unbanUser(uid: string) {
  await updateUserProfile(uid, { isBanned: false });
}

export async function getAllUsers(options: {
  limitCount?: number;
  lastDoc?: DocumentSnapshot;
  plan?: string;
  status?: string;
} = {}) {
  const constraints: any[] = [orderBy("createdAt", "desc")];
  if (options.plan && options.plan !== "all") {
    constraints.unshift(where("plan", "==", options.plan));
  }
  if (options.status === "banned") {
    constraints.unshift(where("isBanned", "==", true));
  } else if (options.status === "active") {
    constraints.unshift(where("isBanned", "==", false));
  }
  if (options.lastDoc) constraints.push(startAfter(options.lastDoc));
  constraints.push(limit(options.limitCount || 20));

  const q = query(collection(db, "users"), ...constraints);
  const snap = await getDocs(q);
  return {
    users: snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserProfile)),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
  };
}

export async function getUserByReferralCode(code: string): Promise<UserProfile | null> {
  const q = query(collection(db, "users"), where("referralCode", "==", code), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as UserProfile;
}

export async function getTotalUserCount(): Promise<number> {
  const q = query(collection(db, "users"));
  const snap = await getDocs(q);
  return snap.size;
}

export async function getProUserCount(): Promise<number> {
  const q = query(collection(db, "users"), where("plan", "==", "pro"));
  const snap = await getDocs(q);
  return snap.size;
}
