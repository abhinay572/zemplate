import { Navbar } from "@/components/layout/Navbar";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import { Image as ImageIcon, Zap, CreditCard, Share2, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { getUserGenerations, type Generation } from "@/lib/firestore/generations";

export function Dashboard() {
  const { user, profile } = useAuth();
  const [recentGens, setRecentGens] = useState<Generation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserGenerations(user.uid, { limitCount: 4 })
      .then(({ generations }) => setRecentGens(generations))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [user]);

  const credits = profile?.credits ?? 0;
  const firstName = profile?.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO title="Dashboard | Zemplate.ai" description="Manage your AI image generations, credits, and account settings." />
      <Navbar />
      <DashboardLayout>
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Welcome back, {firstName}!</h1>
              <p className="text-foreground-muted">Here's what's happening with your account today.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-surface border border-white/10 rounded-2xl p-6 flex items-center gap-6 shadow-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition-shadow cursor-pointer group">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#gradient)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * Math.min(credits, 100)) / 100} strokeLinecap="round" />
                  <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#EC4899" /><stop offset="100%" stopColor="#8B5CF6" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-bold text-white">{credits}</span></div>
              </div>
              <div>
                <h3 className="text-white/60 text-sm font-medium mb-1 uppercase tracking-wider">Credits Remaining</h3>
                <div className="flex items-center gap-2 mb-3"><Zap className="w-5 h-5 text-tertiary" /><span className="text-2xl font-bold text-white">{credits}</span></div>
                <Link to="/dashboard/billing" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">Recharge Credits <span>→</span></Link>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { to: "/", icon: ImageIcon, title: "Browse Templates", desc: "Discover new AI templates to try.", gradient: true },
              { to: "/tools", icon: Zap, title: "Try AI Tools", desc: "Use standalone AI tools for editing." },
              { to: "/pricing", icon: CreditCard, title: "Recharge Credits", desc: "Top up your balance instantly." },
            ].map((card, i) => (
              <motion.div key={card.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}>
                <Link to={card.to} className={`block h-full ${card.gradient ? "bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30" : "bg-surface border border-white/10"} rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1 active:scale-[0.98] group`}>
                  <div className={`w-12 h-12 rounded-full ${card.gradient ? "bg-primary/20" : "bg-white/5"} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon className={`w-6 h-6 ${card.gradient ? "text-primary" : "text-white/70"}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
                  <p className="text-foreground-muted text-sm">{card.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-foreground">Recent Generations</h2>
              <Link to="/dashboard/generations" className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-1 group">View All <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {isLoading ? Array.from({ length: 4 }).map((_, i) => (<div key={i} className="aspect-square rounded-xl bg-surface border border-white/5 animate-pulse" />)) : recentGens.length > 0 ? recentGens.map((gen) => (
                <div key={gen.id} className="aspect-square rounded-xl overflow-hidden bg-surface border border-white/10 relative group cursor-pointer shadow-lg hover:shadow-xl transition-all">
                  <img src={gen.outputUrl} alt={gen.templateTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                    <a href={gen.outputUrl} download className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"><Download className="w-5 h-5" /></a>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"><Share2 className="w-5 h-5" /></button>
                  </div>
                </div>
              )) : (
                <div className="col-span-4 text-center py-16">
                  <ImageIcon className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <h3 className="text-white/60 font-medium mb-2">No generations yet</h3>
                  <p className="text-white/40 text-sm mb-4">Start creating with our templates and AI tools</p>
                  <Link to="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors"><ImageIcon className="w-4 h-4" /> Browse Templates</Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    </div>
  );
}
