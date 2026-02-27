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
  Search,
  Filter,
  MoreVertical,
  Zap,
  Ban,
  Gift,
  Mail,
  Crown,
  UserCheck,
  UserX,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";

const ADMIN_SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: "Overview", href: "/super-admin" },
  { icon: ImageIcon, label: "Templates", href: "/super-admin/templates" },
  { icon: Cpu, label: "AI Models", href: "/super-admin/models" },
  { icon: Users, label: "Users", href: "/super-admin/users", active: true },
  { icon: BarChart3, label: "Analytics", href: "/super-admin/analytics" },
];

const MOCK_USERS = [
  {
    id: "1", name: "Nithin D.", email: "nithindidigam@nhancio.com", avatar: "https://picsum.photos/seed/u1/100/100",
    plan: "Pro", credits: 75, totalGenerations: 1204, totalSpent: "₹4,990",
    joinedAt: "2023-06-15", lastActive: "2 min ago", status: "active", role: "admin",
    referralCode: "NITHIN5X", referrals: 12, socialClaimed: true,
  },
  {
    id: "2", name: "Priya Sharma", email: "priya@gmail.com", avatar: "https://picsum.photos/seed/u2/100/100",
    plan: "Pro", credits: 142, totalGenerations: 856, totalSpent: "₹3,497",
    joinedAt: "2023-07-22", lastActive: "5 min ago", status: "active", role: "user",
    referralCode: "PRIYA10", referrals: 8, socialClaimed: true,
  },
  {
    id: "3", name: "Rahul Kumar", email: "rahul.k@outlook.com", avatar: "https://picsum.photos/seed/u3/100/100",
    plan: "Free", credits: 2, totalGenerations: 48, totalSpent: "₹0",
    joinedAt: "2023-10-01", lastActive: "1 hour ago", status: "active", role: "user",
    referralCode: "RAHULK", referrals: 0, socialClaimed: false,
  },
  {
    id: "4", name: "Ananya Mishra", email: "ananya.m@yahoo.com", avatar: "https://picsum.photos/seed/u4/100/100",
    plan: "Pro", credits: 0, totalGenerations: 2100, totalSpent: "₹12,985",
    joinedAt: "2023-03-10", lastActive: "3 hours ago", status: "active", role: "user",
    referralCode: "ANANYA", referrals: 24, socialClaimed: true,
  },
  {
    id: "5", name: "Vikram Patel", email: "vikram.p@gmail.com", avatar: "https://picsum.photos/seed/u5/100/100",
    plan: "Free", credits: 5, totalGenerations: 5, totalSpent: "₹0",
    joinedAt: "2023-10-20", lastActive: "2 days ago", status: "active", role: "user",
    referralCode: "VIKRAMP", referrals: 0, socialClaimed: false,
  },
  {
    id: "6", name: "Sneha Reddy", email: "sneha.r@gmail.com", avatar: "https://picsum.photos/seed/u6/100/100",
    plan: "Pro", credits: 89, totalGenerations: 540, totalSpent: "₹2,996",
    joinedAt: "2023-08-05", lastActive: "20 min ago", status: "active", role: "user",
    referralCode: "SNEHAR", referrals: 5, socialClaimed: true,
  },
  {
    id: "7", name: "SpamBot123", email: "spam@tempmail.com", avatar: "https://picsum.photos/seed/u7/100/100",
    plan: "Free", credits: 0, totalGenerations: 0, totalSpent: "₹0",
    joinedAt: "2023-10-25", lastActive: "5 days ago", status: "banned", role: "user",
    referralCode: "SPAM", referrals: 0, socialClaimed: false,
  },
  {
    id: "8", name: "Karthik M.", email: "karthik@startup.io", avatar: "https://picsum.photos/seed/u8/100/100",
    plan: "Pro", credits: 200, totalGenerations: 3400, totalSpent: "₹24,950",
    joinedAt: "2023-01-20", lastActive: "10 min ago", status: "active", role: "user",
    referralCode: "KARTHIKM", referrals: 45, socialClaimed: true,
  },
];

export function SuperAdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredUsers = MOCK_USERS.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === "all" || u.plan.toLowerCase() === filterPlan;
    const matchesStatus = filterStatus === "all" || u.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Users | Super Admin | Zemplate.ai"
        description="Manage user accounts, credits, plans, and moderation."
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
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Users</h1>
              <p className="text-white/60">Manage accounts, credits, plans, and moderation.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Users", value: "12,480", icon: Users, color: "text-blue-400" },
                { label: "Pro Users", value: "3,210", icon: Crown, color: "text-primary" },
                { label: "Active Today", value: "1,840", icon: UserCheck, color: "text-emerald-400" },
                { label: "Banned", value: "24", icon: UserX, color: "text-red-400" },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="bg-surface border border-white/10 rounded-xl py-3 px-4 pr-10 text-white/70 text-sm font-medium focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="all">All Plans</option>
                    <option value="free">Free</option>
                    <option value="pro">Pro</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-surface border border-white/10 rounded-xl py-3 px-4 pr-10 text-white/70 text-sm font-medium focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="banned">Banned</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">User</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Plan</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Credits</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Generations</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Spent</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Referrals</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Status</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full border border-white/10"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-white text-sm font-medium">{user.name}</p>
                                {user.role === "admin" && (
                                  <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[9px] font-bold uppercase">Admin</span>
                                )}
                              </div>
                              <p className="text-white/40 text-xs">{user.email}</p>
                              <p className="text-white/25 text-[10px]">Last active: {user.lastActive}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.plan === "Pro"
                                ? "bg-primary/10 text-primary"
                                : "bg-white/5 text-white/50"
                            }`}
                          >
                            {user.plan === "Pro" && <Crown className="w-3 h-3" />}
                            {user.plan}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-tertiary" />
                            <span className="text-white font-medium text-sm">{user.credits}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-white/70 text-sm">{user.totalGenerations.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white/70 text-sm">{user.totalSpent}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white/70 text-sm">{user.referrals}</span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.status === "active"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                user.status === "active" ? "bg-emerald-400" : "bg-red-400"
                              }`}
                            ></span>
                            {user.status === "active" ? "Active" : "Banned"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                              title="Gift credits"
                            >
                              <Gift className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                              title="Send email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                user.status === "active"
                                  ? "hover:bg-red-400/10 text-white/50 hover:text-red-400"
                                  : "hover:bg-emerald-400/10 text-white/50 hover:text-emerald-400"
                              }`}
                              title={user.status === "active" ? "Ban user" : "Unban user"}
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors">
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
          </div>
        </main>
      </div>
    </div>
  );
}
