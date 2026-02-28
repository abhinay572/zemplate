import { Navbar } from "@/components/layout/Navbar";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Users,
  Search,
  Zap,
  Ban,
  Gift,
  Crown,
  UserCheck,
  UserX,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { SEO } from "@/components/seo/SEO";
import { getAllUsers, banUser, unbanUser, addCredits, type UserProfile } from "@/lib/firestore/users";

export function SuperAdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    getAllUsers()
      .then(({ users: u }) => setUsers(u))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleBanToggle = async (user: UserProfile) => {
    try {
      const newBanned = !user.isBanned;
      if (newBanned) {
        await banUser(user.id);
      } else {
        await unbanUser(user.id);
      }
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, isBanned: newBanned } : u)));
    } catch (err) {
      console.error("Failed to toggle ban:", err);
    }
  };

  const handleGiftCredits = async (userId: string) => {
    const amount = 10;
    try {
      await addCredits(userId, amount);
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, credits: (u.credits || 0) + amount } : u)));
    } catch (err) {
      console.error("Failed to gift credits:", err);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === "all" || (u.plan || "free").toLowerCase() === filterPlan;
    const matchesStatus = filterStatus === "all" ||
      (filterStatus === "active" && !u.isBanned) ||
      (filterStatus === "banned" && u.isBanned);
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const proCount = users.filter((u) => u.plan === "pro").length;
  const bannedCount = users.filter((u) => u.isBanned).length;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO title="Users | Super Admin | Zemplate.ai" description="Manage user accounts, credits, plans, and moderation." />
      <Navbar />
      <AdminLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Users</h1>
            <p className="text-white/60">Manage accounts, credits, plans, and moderation.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Users", value: users.length.toLocaleString(), icon: Users, color: "text-blue-400" },
              { label: "Pro Users", value: proCount.toLocaleString(), icon: Crown, color: "text-primary" },
              { label: "Active", value: (users.length - bannedCount).toLocaleString(), icon: UserCheck, color: "text-emerald-400" },
              { label: "Banned", value: bannedCount.toLocaleString(), icon: UserX, color: "text-red-400" },
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
              <input type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-surface border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary" />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)} className="bg-surface border border-white/10 rounded-xl py-3 px-4 pr-10 text-white/70 text-sm font-medium focus:outline-none focus:border-primary appearance-none">
                  <option value="all">All Plans</option>
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
              <div className="relative">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-surface border border-white/10 rounded-xl py-3 px-4 pr-10 text-white/70 text-sm font-medium focus:outline-none focus:border-primary appearance-none">
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
                    <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Referrals</th>
                    <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan={7} className="p-8 text-center text-white/40">Loading users...</td></tr>
                  ) : filteredUsers.length > 0 ? filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-10 h-10 rounded-full border border-white/10 bg-primary/20 flex items-center justify-center text-white font-bold text-sm">{user.name?.charAt(0) || "U"}</div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-white text-sm font-medium">{user.name}</p>
                              {user.role === "admin" && <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[9px] font-bold uppercase">Admin</span>}
                            </div>
                            <p className="text-white/40 text-xs">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${user.plan === "pro" ? "bg-primary/10 text-primary" : "bg-white/5 text-white/50"}`}>
                          {user.plan === "pro" && <Crown className="w-3 h-3" />}
                          {(user.plan || "free").charAt(0).toUpperCase() + (user.plan || "free").slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-tertiary" />
                          <span className="text-white font-medium text-sm">{user.credits || 0}</span>
                        </div>
                      </td>
                      <td className="p-4"><span className="text-white/70 text-sm">{(user.totalGenerations || 0).toLocaleString()}</span></td>
                      <td className="p-4"><span className="text-white/70 text-sm">{user.referralCount || 0}</span></td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${!user.isBanned ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${!user.isBanned ? "bg-emerald-400" : "bg-red-400"}`}></span>
                          {!user.isBanned ? "Active" : "Banned"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => handleGiftCredits(user.id)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors" title="Gift 10 credits"><Gift className="w-4 h-4" /></button>
                          <button onClick={() => handleBanToggle(user)} className={`p-2 rounded-lg transition-colors ${!user.isBanned ? "hover:bg-red-400/10 text-white/50 hover:text-red-400" : "hover:bg-emerald-400/10 text-white/50 hover:text-emerald-400"}`} title={!user.isBanned ? "Ban user" : "Unban user"}>
                            <Ban className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={7} className="p-8 text-center text-white/40">No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
