import { Navbar } from "@/components/layout/Navbar";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Cpu,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Zap,
  ArrowUpRight,
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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ADMIN_SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: "Overview", href: "/super-admin" },
  { icon: ImageIcon, label: "Templates", href: "/super-admin/templates" },
  { icon: Cpu, label: "AI Models", href: "/super-admin/models" },
  { icon: Users, label: "Users", href: "/super-admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/super-admin/analytics", active: true },
];

const dailyRevenue = [
  { date: "Feb 1", revenue: 18400, cost: 4200 },
  { date: "Feb 5", revenue: 22100, cost: 5100 },
  { date: "Feb 10", revenue: 28900, cost: 6400 },
  { date: "Feb 15", revenue: 24600, cost: 5800 },
  { date: "Feb 20", revenue: 31200, cost: 7100 },
  { date: "Feb 25", revenue: 35800, cost: 8200 },
  { date: "Feb 27", revenue: 38400, cost: 8900 },
];

const toolUsageData = [
  { tool: "Templates", calls: 8240, revenue: 81576, cost: 24720 },
  { tool: "Text-to-Image", calls: 4120, revenue: 40788, cost: 16068 },
  { tool: "Face Swap", calls: 1420, revenue: 28116, cost: 14200 },
  { tool: "BG Remove", calls: 2180, revenue: 21582, cost: 8502 },
  { tool: "Upscaler", calls: 890, revenue: 8811, cost: 445 },
  { tool: "Headshot", calls: 620, revenue: 12276, cost: 9300 },
  { tool: "Product Photo", calls: 540, revenue: 10692, cost: 2106 },
  { tool: "Logo Maker", calls: 380, revenue: 7524, cost: 2546 },
  { tool: "Text2Video", calls: 180, revenue: 8910, cost: 9000 },
  { tool: "Image2Video", calls: 240, revenue: 11880, cost: 7200 },
  { tool: "Lip Sync", calls: 95, revenue: 4703, cost: 3800 },
  { tool: "Talking Photo", calls: 140, revenue: 4158, cost: 2800 },
  { tool: "QR Code", calls: 320, revenue: 3168, cost: 1248 },
  { tool: "Image Editor", calls: 1560, revenue: 15444, cost: 6084 },
];

const providerBreakdown = [
  { name: "Gemini", value: 65, color: "#3B82F6" },
  { name: "Magic Hour", value: 18, color: "#8B5CF6" },
  { name: "Replicate", value: 12, color: "#F59E0B" },
  { name: "Imagen", value: 5, color: "#6366F1" },
];

const userGrowth = [
  { month: "Sep", users: 2400 },
  { month: "Oct", users: 4200 },
  { month: "Nov", users: 6800 },
  { month: "Dec", users: 8900 },
  { month: "Jan", users: 10800 },
  { month: "Feb", users: 12480 },
];

const topCategories = [
  { category: "Art & Illustration", percentage: 28 },
  { category: "YouTube Thumbnails", percentage: 22 },
  { category: "Portrait", percentage: 18 },
  { category: "Instagram", percentage: 14 },
  { category: "Sci-Fi & Fantasy", percentage: 10 },
  { category: "Product Photography", percentage: 8 },
];

export function SuperAdminAnalytics() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Analytics | Super Admin | Zemplate.ai"
        description="Platform analytics — revenue, tool usage, user growth, and provider costs."
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
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Analytics</h1>
                <p className="text-white/60">Revenue, tool usage, user growth, and provider costs.</p>
              </div>
              <select className="bg-surface border border-white/10 rounded-xl py-3 px-4 text-white/70 text-sm font-medium focus:outline-none focus:border-primary">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Last 90 Days</option>
                <option>All Time</option>
              </select>
            </div>

            {/* Revenue Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Revenue", value: "₹8.4L", change: "+15.3%", up: true },
                { label: "API Cost", value: "₹1.2L", change: "+8.1%", up: true },
                { label: "Profit", value: "₹7.2L", change: "+17.8%", up: true },
                { label: "Margin", value: "85.7%", change: "+2.1%", up: true },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface border border-white/10 rounded-xl p-4">
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <span className={`text-xs font-medium flex items-center gap-1 mt-1 ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                    {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
              ))}
            </div>

            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-6">Revenue vs API Cost</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} axisLine={false} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#141414", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
                    />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="cost" name="API Cost" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Tool Usage + Provider Split */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Tool Usage Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-2 bg-surface border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Tool Usage Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="pb-3 text-xs font-medium text-white/60 uppercase tracking-wider">Tool</th>
                        <th className="pb-3 text-xs font-medium text-white/60 uppercase tracking-wider text-right">Calls</th>
                        <th className="pb-3 text-xs font-medium text-white/60 uppercase tracking-wider text-right">Revenue</th>
                        <th className="pb-3 text-xs font-medium text-white/60 uppercase tracking-wider text-right">Cost</th>
                        <th className="pb-3 text-xs font-medium text-white/60 uppercase tracking-wider text-right">Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toolUsageData.map((tool) => {
                        const margin = Math.round(((tool.revenue - tool.cost) / tool.revenue) * 100);
                        return (
                          <tr key={tool.tool} className="border-b border-white/5">
                            <td className="py-3 text-white text-sm font-medium">{tool.tool}</td>
                            <td className="py-3 text-white/70 text-sm text-right">{tool.calls.toLocaleString()}</td>
                            <td className="py-3 text-emerald-400 text-sm text-right font-medium">₹{tool.revenue.toLocaleString()}</td>
                            <td className="py-3 text-red-400/70 text-sm text-right">₹{tool.cost.toLocaleString()}</td>
                            <td className="py-3 text-right">
                              <span
                                className={`text-sm font-medium ${
                                  margin >= 50 ? "text-emerald-400" : margin >= 20 ? "text-yellow-400" : "text-red-400"
                                }`}
                              >
                                {margin}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Provider Split */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-surface border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Provider Split</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={providerBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {providerBreakdown.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#141414", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                        formatter={(value: number) => [`${value}%`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {providerBreakdown.map((p) => (
                    <div key={p.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></span>
                        <span className="text-white/70 text-sm">{p.name}</span>
                      </div>
                      <span className="text-white font-medium text-sm">{p.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* User Growth + Top Categories */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* User Growth */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-surface border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">User Growth</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} axisLine={false} tickLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#141414", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                      />
                      <Bar dataKey="users" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Top Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-surface border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Top Categories</h3>
                <div className="space-y-4">
                  {topCategories.map((cat) => (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-white text-sm font-medium">{cat.category}</span>
                        <span className="text-white/60 text-sm">{cat.percentage}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${cat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
