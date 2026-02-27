import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
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
  Zap,
  Settings,
  LogOut,
  Download
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";

const SIDEBAR_LINKS = [
  { icon: Home, label: "Home", href: "/dashboard", active: true },
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

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title="Dashboard | Zemplate.ai"
        description="Manage your AI image generations, credits, and account settings."
      />
      <Navbar />
      
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Sidebar */}
        <aside className="w-64 hidden lg:flex flex-col border-r border-white/10 bg-surface/50 p-6 space-y-8">
          <div className="flex items-center gap-4">
            <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-12 h-12 rounded-full border border-white/20" referrerPolicy="no-referrer" />
            <div>
              <h3 className="text-white font-medium">Nithin D.</h3>
              <p className="text-white/50 text-sm">Pro Plan</p>
            </div>
          </div>
          
          <nav className="flex-1 space-y-1">
            {SIDEBAR_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                  link.active 
                    ? "bg-primary/10 text-primary" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <link.icon className={`w-5 h-5 transition-transform ${link.active ? "text-primary scale-110" : "text-white/40 group-hover:scale-110"}`} />
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="pt-6 border-t border-white/10 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all active:scale-95 group">
              <Settings className="w-5 h-5 text-white/40 group-hover:rotate-90 transition-transform" />
              Settings
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all active:scale-95 group">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Header & Credits */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Welcome back, Nithin!</h1>
                <p className="text-white/60">Here's what's happening with your account today.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-surface border border-white/10 rounded-2xl p-6 flex items-center gap-6 shadow-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition-shadow cursor-pointer group"
              >
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#gradient)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" className="transition-all duration-1000 ease-out group-hover:strokeDashoffset-[40]" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-xl font-bold text-white group-hover:scale-110 transition-transform">75</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm font-medium mb-1 uppercase tracking-wider group-hover:text-white/80 transition-colors">Credits Remaining</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-tertiary group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold text-white">75</span>
                    <span className="text-white/40 text-sm">/ 100</span>
                  </div>
                  <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group-hover:gap-2">
                    Recharge Credits <span>→</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <Link to="/" className="block h-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)] active:scale-[0.98] group">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-foreground transition-colors">Browse Templates</h3>
                  <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">Discover new AI templates to try.</p>
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                <Link to="/tools" className="block h-full bg-surface border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] active:scale-[0.98] group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-white/10">
                    <Zap className="w-6 h-6 text-white/70 group-hover:text-tertiary transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Try AI Tools</h3>
                  <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">Use standalone AI tools for editing.</p>
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
                <Link to="/pricing" className="block h-full bg-surface border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] active:scale-[0.98] group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-white/10">
                    <CreditCard className="w-6 h-6 text-white/70 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Recharge Credits</h3>
                  <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">Top up your balance instantly.</p>
                </Link>
              </motion.div>
            </div>

            {/* Recent Generations */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-white">Recent Generations</h2>
                <Link to="/dashboard/generations" className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-1 group">
                  View All <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-surface border border-white/5 animate-pulse"></div>
                  ))
                ) : (
                  [1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-surface border border-white/10 relative group cursor-pointer shadow-lg hover:shadow-xl transition-all">
                      <img src={`https://picsum.photos/seed/gen${i}/400/400`} alt={`Generation ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 shadow-lg">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 shadow-lg">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

          </div>
        </main>
      </div>
    </div>
  );
}
