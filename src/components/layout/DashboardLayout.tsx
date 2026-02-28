import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Image as ImageIcon,
  Heart,
  BarChart2,
  User,
  CreditCard,
  Bell,
  Share2,
  Gift,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SIDEBAR_LINKS = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: ImageIcon, label: "My Generations", href: "/dashboard/generations" },
  { icon: Heart, label: "Saved Templates", href: "/dashboard/saved" },
  { icon: BarChart2, label: "Usage & Credits", href: "/dashboard/usage" },
  { icon: User, label: "Profile Settings", href: "/dashboard/profile" },
  { icon: CreditCard, label: "Billing & Recharge", href: "/dashboard/billing" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Share2, label: "My Community Posts", href: "/dashboard/posts" },
  { icon: Gift, label: "Referral Program", href: "/dashboard/referrals" },
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/support" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { profile, logout } = useAuth();

  return (
    <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
      <aside className="w-64 hidden lg:flex flex-col border-r border-white/10 bg-surface/50 p-6 space-y-8">
        <div className="flex items-center gap-4">
          {profile?.avatar ? (
            <img src={profile.avatar} alt="User" className="w-12 h-12 rounded-full border border-white/20" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-12 h-12 rounded-full border border-white/20 bg-primary/20 flex items-center justify-center text-white font-bold text-lg">
              {profile?.name?.charAt(0) || "U"}
            </div>
          )}
          <div>
            <h3 className="text-white font-medium">{profile?.name || "User"}</h3>
            <p className="text-white/50 text-sm capitalize">{profile?.plan || "Free"} Plan</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-white/40"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-white/10 space-y-1">
          <Link
            to="/dashboard/profile"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all active:scale-95 group"
          >
            <Settings className="w-5 h-5 text-white/40 group-hover:rotate-90 transition-transform" />
            Settings
          </Link>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all active:scale-95 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
