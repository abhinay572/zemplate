import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserProfile, getUserProfile, getUserByReferralCode, addCredits, updateUserProfile, type UserProfile } from "@/lib/firestore/users";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string, name: string, referralCode?: string) => Promise<void>;
  loginWithGoogle: (referralCode?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    const p = await getUserProfile(uid);
    setProfile(p);
  };

  // Handle redirect result from Google sign-in (fallback when popup is blocked)
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          const referralCode = sessionStorage.getItem("zemplate_referral") || undefined;
          sessionStorage.removeItem("zemplate_referral");
          await handleGoogleUser(result.user, referralCode);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchProfile(firebaseUser.uid);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await fetchProfile(result.user.uid);
  };

  const signupWithEmail = async (email: string, password: string, name: string, referralCode?: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    await createUserProfile(result.user.uid, {
      name,
      email,
      avatar: result.user.photoURL || "",
      referredBy: referralCode || undefined,
    });
    // Award referral bonus to referrer
    if (referralCode) {
      try {
        const referrer = await getUserByReferralCode(referralCode);
        if (referrer) {
          await addCredits(referrer.id, 3);
          await updateUserProfile(referrer.id, {
            referralCreditsEarned: (referrer.referralCreditsEarned || 0) + 3,
          });
        }
      } catch (err) {
        console.error("Referral reward failed:", err);
      }
    }
    await fetchProfile(result.user.uid);
  };

  const handleGoogleUser = async (user: User, referralCode?: string) => {
    const existing = await getUserProfile(user.uid);
    if (!existing) {
      await createUserProfile(user.uid, {
        name: user.displayName || "User",
        email: user.email || "",
        avatar: user.photoURL || "",
        referredBy: referralCode || undefined,
      });
      // Award referral bonus to referrer (only for new users)
      if (referralCode) {
        try {
          const referrer = await getUserByReferralCode(referralCode);
          if (referrer) {
            await addCredits(referrer.id, 3);
            await updateUserProfile(referrer.id, {
              referralCreditsEarned: (referrer.referralCreditsEarned || 0) + 3,
            });
          }
        } catch (err) {
          console.error("Referral reward failed:", err);
        }
      }
    }
    await fetchProfile(user.uid);
  };

  const loginWithGoogle = async (referralCode?: string) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await handleGoogleUser(result.user, referralCode);
    } catch (err: any) {
      // If popup was blocked or closed, fall back to redirect flow
      if (
        err.code === "auth/popup-blocked" ||
        err.code === "auth/popup-closed-by-user" ||
        err.code === "auth/cancelled-popup-request"
      ) {
        // Store referral code for redirect callback
        if (referralCode) {
          sessionStorage.setItem("zemplate_referral", referralCode);
        }
        await signInWithRedirect(auth, googleProvider);
        return;
      }
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
    // Clear admin session so AdminRoute re-locks
    sessionStorage.removeItem("admin_authenticated");
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.uid);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, loginWithEmail, signupWithEmail, loginWithGoogle, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
