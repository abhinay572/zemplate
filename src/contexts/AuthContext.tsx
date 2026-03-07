import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { createUserProfile, getUserProfile, getUserByReferralCode, addCredits, updateUserProfile, type UserProfile } from "@/lib/firestore/users";
import type { User } from "@supabase/supabase-js";

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfile(u.id).finally(() => setLoading(false));
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        await fetchProfile(u.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await fetchProfile(data.user.id);
  };

  const signupWithEmail = async (email: string, password: string, name: string, referralCode?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
    if (error) throw error;
    if (!data.user) throw new Error("Signup failed");

    await createUserProfile(data.user.id, {
      name,
      email,
      avatar: "",
      referredBy: referralCode || undefined,
    });

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
    await fetchProfile(data.user.id);
  };

  const loginWithGoogle = async (referralCode?: string) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: import.meta.env.VITE_APP_URL || window.location.origin },
    });
    if (error) throw error;
    // After redirect, onAuthStateChange will fire.
    // We handle new user profile creation there via a check.
    // Store referralCode in localStorage so we can use it after redirect.
    if (referralCode) {
      localStorage.setItem("pendingReferralCode", referralCode);
    }
  };

  // Handle Google OAuth callback - create profile for new users
  useEffect(() => {
    if (!user) return;
    (async () => {
      const existing = await getUserProfile(user.id);
      if (!existing) {
        await createUserProfile(user.id, {
          name: user.user_metadata?.full_name || user.user_metadata?.display_name || "User",
          email: user.email || "",
          avatar: user.user_metadata?.avatar_url || "",
          referredBy: localStorage.getItem("pendingReferralCode") || undefined,
        });
        const referralCode = localStorage.getItem("pendingReferralCode");
        if (referralCode) {
          localStorage.removeItem("pendingReferralCode");
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
        await fetchProfile(user.id);
      }
    })();
  }, [user]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
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
