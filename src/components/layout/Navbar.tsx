import { Bell, Coins, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS = [
  { name: "Templates", href: "/" },
  { name: "AI Tools", href: "/tools" },
  { name: "Community", href: "/community" },
  { name: "Blog", href: "/blog" },
  { name: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const location = useLocation();
  const { user, profile, logout } = useAuth();
  const isLoggedIn = !!user;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-surface-border h-16">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-display font-bold text-xl shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] transition-shadow">
            Z
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block text-white">
            Zemplate<span className="opacity-50">.ai</span>
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface/50 p-1 rounded-full border border-white/10">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-surface/50 border border-white/10 rounded-full px-3 py-1.5">
                <Coins className="w-4 h-4 text-tertiary" />
                <span className="font-mono text-sm font-medium text-white">{profile?.credits ?? 0}</span>
              </div>
              <Link
                to="/dashboard/notifications"
                className="w-9 h-9 rounded-full bg-surface/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Bell className="w-4 h-4" />
              </Link>
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]"
                >
                  <div className="w-full h-full rounded-full bg-surface border border-white/20 overflow-hidden">
                    {profile?.avatar ? (
                      <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
                        {profile?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-12 w-56 bg-surface border border-surface-border rounded-xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-surface-border">
                      <p className="text-white text-sm font-medium truncate">{profile?.name}</p>
                      <p className="text-white/40 text-xs truncate">{profile?.email}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setShowMenu(false)} className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/dashboard/profile" onClick={() => setShowMenu(false)} className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => { logout(); setShowMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-400/5 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block text-sm font-medium text-white/70 hover:text-white transition-colors px-2">
                Sign In
              </Link>
              <Link to="/signup" className="relative group overflow-hidden rounded-full p-[1px]">
                <span className="absolute inset-0 bg-gradient-primary rounded-full opacity-70 group-hover:opacity-100 transition-opacity blur-sm"></span>
                <span className="absolute inset-0 bg-gradient-primary rounded-full"></span>
                <div className="relative bg-surface group-hover:bg-surface/80 transition-colors rounded-full px-4 py-1.5 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-tertiary" />
                  <span className="text-sm font-medium text-white">Get Started Free</span>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
