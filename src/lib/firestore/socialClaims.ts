import {
  doc, setDoc, updateDoc, collection, query, where, orderBy, limit,
  getDocs, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export async function createSocialClaim(data: {
  userId: string;
  userName: string;
  platform: "instagram" | "twitter" | "youtube";
  proofUrl: string;
}): Promise<string> {
  const ref = doc(collection(db, "social_credit_claims"));
  await setDoc(ref, {
    ...data,
    status: "pending",
    reviewedBy: "",
    reviewedAt: null,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function hasClaimedPlatform(userId: string, platform: string): Promise<boolean> {
  const q = query(
    collection(db, "social_credit_claims"),
    where("userId", "==", userId),
    where("platform", "==", platform),
    where("status", "==", "approved"),
    limit(1)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}

export async function getPendingClaims(): Promise<SocialCreditClaim[]> {
  const q = query(
    collection(db, "social_credit_claims"),
    where("status", "==", "pending"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SocialCreditClaim));
}

export async function approveClaim(claimId: string, adminId: string) {
  await updateDoc(doc(db, "social_credit_claims", claimId), {
    status: "approved",
    reviewedBy: adminId,
    reviewedAt: serverTimestamp(),
  });
}

export async function rejectClaim(claimId: string, adminId: string) {
  await updateDoc(doc(db, "social_credit_claims", claimId), {
    status: "rejected",
    reviewedBy: adminId,
    reviewedAt: serverTimestamp(),
  });
}
