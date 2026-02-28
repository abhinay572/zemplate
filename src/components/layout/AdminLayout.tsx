import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Cpu,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { adminPath } from "@/lib/admin";

const ADMIN_SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: "Overview", href: adminPath() },
  { icon: ImageIcon, label: "Templates", href: adminPath("templates") },
  { icon: Cpu, label: "AI Models", href: adminPath("models") },
  { icon: Users, label: "Users", href: adminPath("users") },
  { icon: BarChart3, label: "Analytics", href: adminPath("analytics") },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
      <aside className="w-64 hidden lg:flex flex-col border-r border-white/10 bg-surface/50 p-6 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Super Admin</h3>
            <p className="text-white/40 text-xs">Zemplate.ai</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {ADMIN_SIDEBAR_LINKS.map((link) => {
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
            to="/dashboard"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all active:scale-95"
          >
            <Settings className="w-5 h-5 text-white/40" />
            User Dashboard
          </Link>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all active:scale-95"
          >
            <LogOut className="w-5 h-5" />
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
