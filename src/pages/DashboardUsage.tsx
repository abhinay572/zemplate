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
  Zap
} from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const SIDEBAR_LINKS = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: ImageIcon, label: "My Generations", href: "/dashboard/generations" },
  { icon: Heart, label: "Saved Templates", href: "/dashboard/saved" },
  { icon: BarChart2, label: "Usage & Credits", href: "/dashboard/usage", active: true },
  { icon: User, label: "Profile Settings", href: "/dashboard/profile" },
  { icon: CreditCard, label: "Billing & Recharge", href: "/dashboard/billing" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Share2, label: "My Community Posts", href: "/dashboard/posts" },
  { icon: Gift, label: "Referral Program", href: "/dashboard/referrals" },
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/support" },
];

const data = [
  { name: "Mon", credits: 12 },
  { name: "Tue", credits: 19 },
  { name: "Wed", credits: 3 },
  { name: "Thu", credits: 5 },
  { name: "Fri", credits: 2 },
  { name: "Sat", credits: 20 },
  { name: "Sun", credits: 34 },
];

export function DashboardUsage() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title="Usage & Credits | Zemplate.ai"
        description="Track your credit usage and generation history."
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
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              Account Settings
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">Usage & Credits</h1>
                <p className="text-white/60">Track your credit consumption over time.</p>
              </div>
              <Link to="/dashboard/billing" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Buy Credits
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-surface border border-white/10 rounded-3xl p-6">
                <h3 className="text-white/60 font-medium mb-2">Available Credits</h3>
                <div className="text-4xl font-bold text-white mb-2">245</div>
                <p className="text-sm text-emerald-400">Pro Plan Active</p>
              </div>
              <div className="bg-surface border border-white/10 rounded-3xl p-6">
                <h3 className="text-white/60 font-medium mb-2">Used This Month</h3>
                <div className="text-4xl font-bold text-white mb-2">95</div>
                <p className="text-sm text-white/40">Reset in 12 days</p>
              </div>
              <div className="bg-surface border border-white/10 rounded-3xl p-6">
                <h3 className="text-white/60 font-medium mb-2">Total Generations</h3>
                <div className="text-4xl font-bold text-white mb-2">1,204</div>
                <p className="text-sm text-white/40">Since Jan 2023</p>
              </div>
            </div>

            <div className="bg-surface border border-white/10 rounded-3xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Weekly Usage</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#141414', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#7c3aed' }}
                    />
                    <Area type="monotone" dataKey="credits" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorCredits)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
