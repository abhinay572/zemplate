import { Navbar } from "@/components/layout/Navbar";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { SEO } from "@/components/seo/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { getUserGenerationCount } from "@/lib/firestore/generations";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { name: "Mon", credits: 0 },
  { name: "Tue", credits: 0 },
  { name: "Wed", credits: 0 },
  { name: "Thu", credits: 0 },
  { name: "Fri", credits: 0 },
  { name: "Sat", credits: 0 },
  { name: "Sun", credits: 0 },
];

export function DashboardUsage() {
  const { user, profile } = useAuth();
  const [totalGenerations, setTotalGenerations] = useState(0);

  useEffect(() => {
    if (!user) return;
    getUserGenerationCount(user.uid)
      .then(setTotalGenerations)
      .catch(console.error);
  }, [user]);

  const credits = profile?.credits ?? 0;
  const totalUsed = profile?.totalCreditsUsed ?? 0;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Usage & Credits | Zemplate.ai"
        description="Track your credit usage and generation history."
      />
      <Navbar />
      <DashboardLayout>
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
              <div className="text-4xl font-bold text-white mb-2">{credits}</div>
              <p className="text-sm text-emerald-400 capitalize">{profile?.plan || "Free"} Plan Active</p>
            </div>
            <div className="bg-surface border border-white/10 rounded-3xl p-6">
              <h3 className="text-white/60 font-medium mb-2">Total Credits Used</h3>
              <div className="text-4xl font-bold text-white mb-2">{totalUsed}</div>
              <p className="text-sm text-white/40">All time</p>
            </div>
            <div className="bg-surface border border-white/10 rounded-3xl p-6">
              <h3 className="text-white/60 font-medium mb-2">Total Generations</h3>
              <div className="text-4xl font-bold text-white mb-2">{totalGenerations.toLocaleString()}</div>
              <p className="text-sm text-white/40">All time</p>
            </div>
          </div>

          <div className="bg-surface border border-white/10 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6">Weekly Usage</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="credits" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorCredits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
