import { Bell, Coins, Zap, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { name: "Templates", href: "/" },
  { name: "AI Tools", href: "/tools" },
  { name: "Community", href: "/community" },
  { name: "Blog", href: "/blog" },
  { name: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const location = useLocation();
  const isLoggedIn = true; // Toggle this to see auth state
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--color-background', '#0a0a0f');
      document.documentElement.style.setProperty('--color-surface', '#0d1117');
      document.documentElement.style.setProperty('--color-surface-hover', '#161b22');
      document.documentElement.style.setProperty('--color-surface-border', '#30363d');
      document.body.style.color = 'white';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--color-background', '#f8fafc');
      document.documentElement.style.setProperty('--color-surface', '#ffffff');
      document.documentElement.style.setProperty('--color-surface-hover', '#f1f5f9');
      document.documentElement.style.setProperty('--color-surface-border', '#e2e8f0');
      document.body.style.color = '#0f172a';
    }
  }, [isDark]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 h-16">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-display font-bold text-xl shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] transition-shadow">
            Z
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block text-current">
            Zemplate<span className="opacity-50">.ai</span>
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface/50 p-1 rounded-full border border-current/10">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-current/10 text-current shadow-sm"
                    : "text-current/60 hover:text-current hover:bg-current/5"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-9 h-9 rounded-full bg-surface/50 border border-current/10 flex items-center justify-center text-current/70 hover:text-current hover:bg-current/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-surface/50 border border-current/10 rounded-full px-3 py-1.5">
                <Coins className="w-4 h-4 text-tertiary" />
                <span className="font-mono text-sm font-medium text-current">150</span>
              </div>
              <button className="w-9 h-9 rounded-full bg-surface/50 border border-current/10 flex items-center justify-center text-current/70 hover:text-current hover:bg-current/10 transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                <div className="w-full h-full rounded-full bg-surface border border-current/20 overflow-hidden">
                  <img src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block text-sm font-medium text-current/70 hover:text-current transition-colors px-2">
                Sign In
              </Link>
              <Link to="/signup" className="relative group overflow-hidden rounded-full p-[1px]">
                <span className="absolute inset-0 bg-gradient-primary rounded-full opacity-70 group-hover:opacity-100 transition-opacity blur-sm"></span>
                <span className="absolute inset-0 bg-gradient-primary rounded-full"></span>
                <div className="relative bg-surface group-hover:bg-surface/80 transition-colors rounded-full px-4 py-1.5 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-tertiary" />
                  <span className="text-sm font-medium text-current">Get Started Free</span>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
