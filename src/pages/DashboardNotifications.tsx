import { Navbar } from "@/components/layout/Navbar";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Bell, Sparkles, Gift, CreditCard, Info } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabasePublic } from "@/lib/supabase";

interface Notification {
  id: string;
  type: "credit" | "system" | "promo" | "referral";
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

const ICON_MAP = {
  credit: CreditCard,
  system: Info,
  promo: Sparkles,
  referral: Gift,
};

const COLOR_MAP = {
  credit: "text-emerald-400 bg-emerald-400/20",
  system: "text-blue-400 bg-blue-400/20",
  promo: "text-primary bg-primary/20",
  referral: "text-tertiary bg-tertiary/20",
};

export function DashboardNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    // Try to fetch from DB — if table doesn't exist, show empty state
    Promise.race([
      supabasePublic
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 5000)
      ),
    ])
      .then((res: any) => {
        if (res?.data) setNotifications(res.data);
      })
      .catch(() => {
        // Table may not exist yet — show empty state
        setNotifications([]);
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Notifications | Zemplate.ai"
        description="View your notifications and updates from Zemplate.ai."
      />
      <Navbar />
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Notifications
            </h1>
            <p className="text-white/60">
              Stay updated with your account activity and announcements.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-surface border border-white/5 rounded-2xl p-5 animate-pulse flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/5 rounded w-1/3" />
                    <div className="h-3 bg-white/5 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20">
              <Bell className="w-16 h-16 text-white/10 mx-auto mb-4" />
              <h3 className="text-white/60 font-medium mb-2">
                No notifications yet
              </h3>
              <p className="text-white/40 text-sm">
                You'll see updates about your generations, credits, and
                announcements here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => {
                const Icon = ICON_MAP[n.type] || Info;
                const color = COLOR_MAP[n.type] || COLOR_MAP.system;
                return (
                  <div
                    key={n.id}
                    className={`bg-surface border rounded-2xl p-5 flex gap-4 transition-colors ${
                      n.read
                        ? "border-white/5"
                        : "border-primary/20 bg-primary/5"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm mb-1">
                        {n.title}
                      </h4>
                      <p className="text-white/60 text-sm">{n.message}</p>
                      <p className="text-white/30 text-xs mt-2">
                        {new Date(n.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
}
