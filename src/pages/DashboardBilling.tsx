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
  Zap,
  CheckCircle2,
  FileText,
  Download
} from "lucide-react";
import { SEO } from "@/components/seo/SEO";

const SIDEBAR_LINKS = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: ImageIcon, label: "My Generations", href: "/dashboard/generations" },
  { icon: Heart, label: "Saved Templates", href: "/dashboard/saved" },
  { icon: BarChart2, label: "Usage & Credits", href: "/dashboard/usage" },
  { icon: User, label: "Profile Settings", href: "/dashboard/profile" },
  { icon: CreditCard, label: "Billing & Recharge", href: "/dashboard/billing", active: true },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Share2, label: "My Community Posts", href: "/dashboard/posts" },
  { icon: Gift, label: "Referral Program", href: "/dashboard/referrals" },
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/support" },
];

export function DashboardBilling() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title="Billing & Recharge | Zemplate.ai"
        description="Manage your subscription, buy credits, and view billing history."
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
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Billing & Recharge</h1>
              <p className="text-white/60">Manage your subscription, credits, and payment methods.</p>
            </div>

            {/* Current Plan & Credits */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Plan Card */}
              <div className="bg-surface border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
                <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">Current Plan</h3>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-4xl font-bold text-white">Pro</span>
                  <span className="text-white/50 mb-1">/ month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited generations
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 4K resolution
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Priority queue
                  </li>
                </ul>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                    Manage Plan
                  </button>
                </div>
              </div>

              {/* Credits Card */}
              <div className="bg-gradient-to-br from-surface to-surface/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-tertiary/20 blur-[60px] rounded-full" />
                <div>
                  <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">Credit Balance</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-8 h-8 text-tertiary" />
                    <span className="text-5xl font-bold text-white">75</span>
                  </div>
                  <p className="text-white/50 text-sm">Credits expire in 24 days</p>
                </div>
                
                <div className="mt-8">
                  <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-primary to-tertiary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/40">
                    <span>0</span>
                    <span>100 Total</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Recharge */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-6">Quick Recharge</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { credits: 10, price: "₹99", popular: false },
                  { credits: 50, price: "₹399", popular: true },
                  { credits: 150, price: "₹999", popular: false },
                ].map((pack) => (
                  <button 
                    key={pack.credits}
                    className={`relative p-6 rounded-2xl border transition-all text-left ${
                      pack.popular 
                        ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]" 
                        : "bg-surface border-white/10 hover:border-white/30"
                    }`}
                  >
                    {pack.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Most Popular
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className={`w-5 h-5 ${pack.popular ? "text-primary" : "text-tertiary"}`} />
                      <span className="text-2xl font-bold text-white">{pack.credits}</span>
                    </div>
                    <div className="text-white/60 text-sm mb-4">Credits</div>
                    <div className="text-xl font-bold text-white">{pack.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment History */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-white">Payment History</h2>
                <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download All
                </button>
              </div>
              
              <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="p-4 text-sm font-medium text-white/60">Date</th>
                      <th className="p-4 text-sm font-medium text-white/60">Description</th>
                      <th className="p-4 text-sm font-medium text-white/60">Amount</th>
                      <th className="p-4 text-sm font-medium text-white/60">Status</th>
                      <th className="p-4 text-sm font-medium text-white/60 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "Oct 24, 2023", desc: "Pro Plan Subscription", amount: "₹499", status: "Paid" },
                      { date: "Sep 24, 2023", desc: "Pro Plan Subscription", amount: "₹499", status: "Paid" },
                      { date: "Sep 15, 2023", desc: "50 Credits Pack", amount: "₹399", status: "Paid" },
                      { date: "Aug 24, 2023", desc: "Pro Plan Subscription", amount: "₹499", status: "Paid" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm text-white/80">{row.date}</td>
                        <td className="p-4 text-sm text-white/80">{row.desc}</td>
                        <td className="p-4 text-sm font-medium text-white">{row.amount}</td>
                        <td className="p-4 text-sm">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors inline-flex">
                            <FileText className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
