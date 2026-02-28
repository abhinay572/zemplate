import { Navbar } from "@/components/layout/Navbar";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Download, Share2, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { getUserGenerations, type Generation } from "@/lib/firestore/generations";

export function DashboardGenerations() {
  const { user } = useAuth();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) return;
    getUserGenerations(user.uid, { limitCount: 50 })
      .then(({ generations: gens }) => setGenerations(gens))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [user]);

  const filtered = generations.filter((g) =>
    g.templateTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO title="My Generations | Zemplate.ai" description="View and manage your AI image generations." />
      <Navbar />
      <DashboardLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">My Generations</h1>
            <p className="text-white/60">Manage, edit, and download your generated images.</p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input type="text" placeholder="Search by template name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-surface border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {isLoading ? Array.from({ length: 12 }).map((_, i) => (<div key={i} className="aspect-square rounded-2xl bg-surface border border-white/5 animate-pulse" />)) : filtered.length > 0 ? filtered.map((gen, i) => (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.03 }} key={gen.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-surface border border-white/10 cursor-pointer">
                <img src={gen.outputUrl} alt={gen.templateTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                  <div className="flex justify-end gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"><Share2 className="w-4 h-4" /></button>
                    <a href={gen.outputUrl} download className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"><Download className="w-4 h-4" /></a>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm font-medium truncate">{gen.templateTitle}</p>
                    <p className="text-white/50 text-xs">{gen.createdAt?.toDate?.()?.toLocaleDateString?.() || ""}</p>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-20">
                <p className="text-white/40 text-lg">No generations found</p>
                <p className="text-white/25 text-sm mt-2">Start creating with our templates and AI tools</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
