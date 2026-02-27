import { Navbar } from "@/components/layout/Navbar";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Cpu,
  Users,
  BarChart3,
  Upload,
  Settings,
  LogOut,
  Zap,
  TrendingUp,
  IndianRupee,
  Eye,
  ArrowUpRight,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ADMIN_SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: "Overview", href: "/super-admin", active: true },
  { icon: ImageIcon, label: "Templates", href: "/super-admin/templates" },
  { icon: Cpu, label: "AI Models", href: "/super-admin/models" },
  { icon: Users, label: "Users", href: "/super-admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/super-admin/analytics" },
];

const weeklyData = [
  { name: "Mon", generations: 1240, revenue: 12400 },
  { name: "Tue", generations: 1890, revenue: 18900 },
  { name: "Wed", generations: 980, revenue: 9800 },
  { name: "Thu", generations: 1560, revenue: 15600 },
  { name: "Fri", generations: 2100, revenue: 21000 },
  { name: "Sat", generations: 2890, revenue: 28900 },
  { name: "Sun", generations: 3400, revenue: 34000 },
];

const recentActivity = [
  { user: "Nithin D.", action: "Generated 4K template", tool: "Nano Banana Pro", credits: 3, time: "2 min ago" },
  { user: "Priya S.", action: "Face swap (photo)", tool: "Magic Hour", credits: 2, time: "5 min ago" },
  { user: "Rahul K.", action: "Background removal", tool: "Gemini", credits: 1, time: "8 min ago" },
  { user: "Ananya M.", action: "AI Headshot", tool: "Magic Hour", credits: 2, time: "12 min ago" },
  { user: "Vikram P.", action: "Image upscale 4x", tool: "Real-ESRGAN", credits: 2, time: "15 min ago" },
  { user: "Sneha R.", action: "Text-to-Video", tool: "Magic Hour", credits: 5, time: "18 min ago" },
];

const topTemplates = [
  { name: "Cyberpunk Neon Cityscape", uses: 45000, revenue: "₹4.4L" },
  { name: "Anime Style Character", uses: 89000, revenue: "₹8.8L" },
  { name: "YouTube Thumbnail Gaming", uses: 65000, revenue: "₹6.4L" },
  { name: "Ethereal Fantasy Portrait", uses: 52000, revenue: "₹5.1L" },
  { name: "3D Isometric Room", uses: 34000, revenue: "₹3.3L" },
];

export function SuperAdmin() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Super Admin | Zemplate.ai"
        description="Super Admin dashboard — manage templates, AI models, users, and analytics."
      />
      <Navbar />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Admin Sidebar */}
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
            {ADMIN_SIDEBAR_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
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
            <Link
              to="/dashboard"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all active:scale-95"
            >
              <Settings className="w-5 h-5 text-white/40" />
              User Dashboard
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all active:scale-95">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Header */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Admin Overview</h1>
              <p className="text-white/60">Platform health, revenue, and real-time activity.</p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Users", value: "12,480", change: "+8.2%", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
                { label: "Generations Today", value: "14,060", change: "+12.5%", icon: ImageIcon, color: "text-primary", bg: "bg-primary/10" },
                { label: "Revenue (MTD)", value: "₹8.4L", change: "+15.3%", icon: IndianRupee, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                { label: "Active AI Models", value: "13", change: "All healthy", icon: Cpu, color: "text-tertiary", bg: "bg-tertiary/10" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-surface border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Chart + Top Templates */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Generations Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-2 bg-surface border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Weekly Generations</h3>
                  <select className="bg-background border border-white/10 rounded-lg px-3 py-1.5 text-white/70 text-sm focus:outline-none focus:border-primary">
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} axisLine={false} tickLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#141414", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                        itemStyle={{ color: "#7c3aed" }}
                      />
                      <Area type="monotone" dataKey="generations" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorGen)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Top Templates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-surface border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Top Templates</h3>
                <div className="space-y-4">
                  {topTemplates.map((t, i) => (
                    <div key={t.name} className="flex items-center gap-3">
                      <span className="text-white/30 text-sm font-mono w-5">#{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{t.name}</p>
                        <p className="text-white/40 text-xs">{t.uses.toLocaleString()} uses</p>
                      </div>
                      <span className="text-emerald-400 text-sm font-medium">{t.revenue}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/super-admin/templates"
                  className="mt-4 flex items-center justify-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  View All <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Provider Status + Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* API Provider Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-surface border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">API Provider Status</h3>
                <div className="space-y-3">
                  {[
                    { name: "Gemini API", status: "Operational", calls: "8,240 today", color: "bg-emerald-400" },
                    { name: "Magic Hour", status: "Operational", calls: "1,420 today", color: "bg-emerald-400" },
                    { name: "Replicate", status: "Operational", calls: "890 today", color: "bg-emerald-400" },
                    { name: "Cloudflare R2", status: "Operational", calls: "12.4 GB stored", color: "bg-emerald-400" },
                    { name: "Razorpay", status: "Operational", calls: "₹48K today", color: "bg-emerald-400" },
                  ].map((provider) => (
                    <div key={provider.name} className="flex items-center justify-between p-3 bg-background rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${provider.color}`}></span>
                        <span className="text-white text-sm font-medium">{provider.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white/40 text-xs">{provider.calls}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-surface border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Real-Time Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-background rounded-xl border border-white/5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Eye className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate">{activity.user}</p>
                          <p className="text-white/40 text-xs truncate">{activity.action} via {activity.tool}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <span className="text-white/60 text-xs flex items-center gap-1">
                          <Zap className="w-3 h-3 text-tertiary" />
                          {activity.credits}
                        </span>
                        <span className="text-white/30 text-[10px]">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/super-admin/templates"
                className="flex items-center gap-4 p-5 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl hover:border-primary/40 transition-all active:scale-[0.98] group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Upload Templates</h3>
                  <p className="text-white/50 text-sm">Add new templates with hidden prompts</p>
                </div>
              </Link>
              <Link
                to="/super-admin/models"
                className="flex items-center gap-4 p-5 bg-surface border border-white/10 rounded-2xl hover:border-white/20 transition-all active:scale-[0.98] group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-tertiary" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Manage AI Models</h3>
                  <p className="text-white/50 text-sm">Configure providers & pricing</p>
                </div>
              </Link>
              <Link
                to="/super-admin/users"
                className="flex items-center gap-4 p-5 bg-surface border border-white/10 rounded-2xl hover:border-white/20 transition-all active:scale-[0.98] group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Manage Users</h3>
                  <p className="text-white/50 text-sm">View accounts, credits & bans</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
