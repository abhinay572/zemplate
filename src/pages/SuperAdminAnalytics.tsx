import { Navbar } from "@/components/layout/Navbar";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  TrendingUp,
  TrendingDown,
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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getTotalRevenue } from "@/lib/firestore/transactions";
import { getTotalUserCount } from "@/lib/firestore/users";
import { getToolUsageStats } from "@/lib/firestore/toolUsage";

const providerBreakdown = [
  { name: "Gemini", value: 65, color: "#3B82F6" },
  { name: "Magic Hour", value: 18, color: "#8B5CF6" },
  { name: "Replicate", value: 12, color: "#F59E0B" },
  { name: "Imagen", value: 5, color: "#6366F1" },
];

export function SuperAdminAnalytics() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [toolStats, setToolStats] = useState<any[]>([]);

  useEffect(() => {
    getTotalRevenue().then(setTotalRevenue).catch(console.error);
    getTotalUserCount().then(setTotalUsers).catch(console.error);
    getToolUsageStats().then(setToolStats).catch(console.error);
  }, []);

  const userGrowthData = [
    { month: "Users", users: totalUsers },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO title="Analytics | Super Admin | Zemplate.ai" description="Platform analytics — revenue, tool usage, user growth, and provider costs." />
      <Navbar />
      <AdminLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Analytics</h1>
              <p className="text-white/60">Revenue, tool usage, user growth, and provider costs.</p>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, change: "All time", up: true },
              { label: "Total Users", value: totalUsers.toLocaleString(), change: "Registered", up: true },
              { label: "Tools Tracked", value: toolStats.length.toString(), change: "Active", up: true },
              { label: "Total API Calls", value: toolStats.reduce((s, t) => s + (t.totalCalls || 0), 0).toLocaleString(), change: "All time", up: true },
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

          {/* Tool Usage + Provider Split */}
          <div className="grid lg:grid-cols-3 gap-6">
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
                    </tr>
                  </thead>
                  <tbody>
                    {toolStats.length > 0 ? toolStats.map((tool) => (
                      <tr key={tool.toolType} className="border-b border-white/5">
                        <td className="py-3 text-white text-sm font-medium">{tool.toolType}</td>
                        <td className="py-3 text-white/70 text-sm text-right">{(tool.totalCalls || 0).toLocaleString()}</td>
                        <td className="py-3 text-emerald-400 text-sm text-right font-medium">₹{(tool.totalRevenue || 0).toLocaleString()}</td>
                        <td className="py-3 text-red-400/70 text-sm text-right">₹{(tool.totalCost || 0).toLocaleString()}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4} className="py-8 text-center text-white/40">No usage data yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

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
                    <Pie data={providerBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {providerBreakdown.map((entry) => (<Cell key={entry.name} fill={entry.color} />))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#141414", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} formatter={(value: number) => [`${value}%`, ""]} />
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
                <BarChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#141414", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
                  <Bar dataKey="users" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </AdminLayout>
    </div>
  );
}
