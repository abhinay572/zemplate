import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Shield, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "";
const MAX_ATTEMPTS = 5;
const LOCKOUT_KEY = "admin_lockout_until";
const SESSION_KEY = "admin_authenticated";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  });

  // If already authenticated this session, allow access
  if (isAuthenticated) return <>{children}</>;

  // Check lockout
  const lockoutUntil = Number(localStorage.getItem(LOCKOUT_KEY) || "0");
  const isLockedOut = Date.now() < lockoutUntil;
  const lockoutMinutes = Math.ceil((lockoutUntil - Date.now()) / 60000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut) return;

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      setError("");
      setAttempts(0);
      localStorage.removeItem(LOCKOUT_KEY);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPassword("");

      if (newAttempts >= MAX_ATTEMPTS) {
        // Lock out for 30 minutes
        localStorage.setItem(LOCKOUT_KEY, String(Date.now() + 30 * 60 * 1000));
        setError("Too many failed attempts. Locked out for 30 minutes.");
      } else {
        setError(`Wrong password. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white text-xl font-bold">Restricted Access</h1>
            <p className="text-white/40 text-sm mt-1">Enter admin password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter password"
                disabled={isLockedOut}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 disabled:opacity-50 transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{isLockedOut ? `Locked out. Try again in ${lockoutMinutes} min.` : error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLockedOut || !password}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-40 transition-all active:scale-[0.98]"
            >
              {isLockedOut ? "Account Locked" : "Unlock Admin Panel"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
