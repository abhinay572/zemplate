import { Navbar } from "@/components/layout/Navbar";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Link } from "react-router-dom";
import {
  Image as ImageIcon,
  Cpu,
  Users,
  Upload,
  Zap,
  TrendingUp,
  IndianRupee,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { useState, useEffect } from "react";
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
import { getTotalUserCount } from "@/lib/firestore/users";
import { getTemplateCount } from "@/lib/firestore/templates";
import { getRecentGenerations } from "@/lib/firestore/generations";
import { getEnabledModels } from "@/lib/firestore/aiModels";
import { adminPath } from "@/lib/admin";

const weeklyData = [
  { name: "Mon", generations: 0 },
  { name: "Tue", generations: 0 },
  { name: "Wed", generations: 0 },
  { name: "Thu", generations: 0 },
  { name: "Fri", generations: 0 },
  { name: "Sat", generations: 0 },
  { name: "Sun", generations: 0 },
];

export function SuperAdmin() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [templateCount, setTemplateCount] = useState(0);
  const [enabledModels, setEnabledModels] = useState(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    getTotalUserCount().then(setTotalUsers).catch(console.error);
    getTemplateCount().then((counts) => setTemplateCount(counts.total)).catch(console.error);
    getEnabledModels().then((models) => setEnabledModels(models.length)).catch(console.error);
    getRecentGenerations(6).then(setRecentActivity).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Super Admin | Zemplate.ai"
        description="Super Admin dashboard — manage templates, AI models, users, and analytics."
      />
      <Navbar />
      <AdminLayout>
        <div className="max-w-6xl mx-auto space-y-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Admin Overview</h1>
            <p className="text-white/60">Platform health, revenue, and real-time activity.</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Users", value: totalUsers.toLocaleString(), change: "Live", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
              { label: "Templates", value: templateCount.toLocaleString(), change: "Published", icon: ImageIcon, color: "text-primary", bg: "bg-primary/10" },
              { label: "Revenue (MTD)", value: "₹0", change: "No payments yet", icon: IndianRupee, color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { label: "Active AI Models", value: enabledModels.toString(), change: "Enabled", icon: Cpu, color: "text-tertiary", bg: "bg-tertiary/10" },
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

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-surface border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Weekly Generations</h3>
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

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-surface border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.length > 0 ? recentActivity.map((gen, i) => (
                <div key={gen.id || i} className="flex items-center justify-between p-3 bg-background rounded-xl border border-white/5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Eye className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{gen.templateTitle || "Generation"}</p>
                      <p className="text-white/40 text-xs truncate">{gen.toolType || "template"}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-white/60 text-xs flex items-center gap-1">
                      <Zap className="w-3 h-3 text-tertiary" />
                      {gen.creditsUsed || 1}
                    </span>
                  </div>
                </div>
              )) : (
                <p className="text-white/40 text-sm text-center py-4">No recent activity yet</p>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to={adminPath("templates")}
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
              to={adminPath("models")}
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
              to={adminPath("users")}
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
      </AdminLayout>
    </div>
  );
}
