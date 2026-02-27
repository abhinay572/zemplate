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
  Settings,
  LogOut,
  Download,
  Trash2,
  Edit3,
  Filter,
  Search
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";

const SIDEBAR_LINKS = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: ImageIcon, label: "My Generations", href: "/dashboard/generations", active: true },
  { icon: Heart, label: "Saved Templates", href: "/dashboard/saved" },
  { icon: BarChart2, label: "Usage & Credits", href: "/dashboard/usage" },
  { icon: User, label: "Profile Settings", href: "/dashboard/profile" },
  { icon: CreditCard, label: "Billing & Recharge", href: "/dashboard/billing" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Share2, label: "My Community Posts", href: "/dashboard/posts" },
  { icon: Gift, label: "Referral Program", href: "/dashboard/referrals" },
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/support" },
];

export function DashboardGenerations() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title="My Generations | Zemplate.ai"
        description="View and manage your AI image generations."
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  link.active 
                    ? "bg-primary/10 text-primary" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <link.icon className={`w-5 h-5 ${link.active ? "text-primary" : "text-white/40"}`} />
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="pt-6 border-t border-white/10 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors">
              <Settings className="w-5 h-5 text-white/40" />
              Settings
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">My Generations</h1>
                <p className="text-white/60">Manage, edit, and download your generated images.</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl bg-surface border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Bulk Download
                </button>
                <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-colors flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </button>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search by template name or date..." 
                  className="w-full bg-surface border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-3 rounded-xl bg-surface border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <select className="bg-surface border border-white/10 rounded-xl py-3 px-4 text-white/70 text-sm font-medium focus:outline-none focus:border-primary">
                  <option>Newest First</option>
                  <option>Oldest First</option>
                </select>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {isLoading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-surface border border-white/5 animate-pulse overflow-hidden">
                    <div className="w-full h-full bg-white/5"></div>
                  </div>
                ))
              ) : (
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    key={i} 
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-surface border border-white/10 cursor-pointer"
                  >
                    <img src={`https://picsum.photos/seed/gen${i}/600/600`} alt={`Generation ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    
                    {/* Checkbox for bulk select */}
                    <div className="absolute top-3 left-3 z-10">
                      <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-black/50 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer" />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                      <div className="flex justify-end gap-2">
                        <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center w-full transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <button className="bg-primary text-white hover:bg-primary/90 transition-colors px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95">
                          <Edit3 className="w-4 h-4" />
                          Edit Image
                        </button>
                      </div>
                      
                      <div className="text-xs text-white/60 text-center">
                        Generated Oct 24, 2023
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {/* Pagination */}
            {!isLoading && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors disabled:opacity-50">
                    &lt;
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-primary text-white font-medium flex items-center justify-center shadow-lg shadow-primary/20">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors">
                    3
                  </button>
                  <span className="text-white/40 px-2">...</span>
                  <button className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors">
                    &gt;
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
