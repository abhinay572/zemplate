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
  Save
} from "lucide-react";
import { SEO } from "@/components/seo/SEO";

const SIDEBAR_LINKS = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: ImageIcon, label: "My Generations", href: "/dashboard/generations" },
  { icon: Heart, label: "Saved Templates", href: "/dashboard/saved" },
  { icon: BarChart2, label: "Usage & Credits", href: "/dashboard/usage" },
  { icon: User, label: "Profile Settings", href: "/dashboard/profile", active: true },
  { icon: CreditCard, label: "Billing & Recharge", href: "/dashboard/billing" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Share2, label: "My Community Posts", href: "/dashboard/posts" },
  { icon: Gift, label: "Referral Program", href: "/dashboard/referrals" },
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/support" },
];

export function DashboardSettings() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title="Profile Settings | Zemplate.ai"
        description="Manage your profile settings, notification preferences, and connected accounts."
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
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Profile Settings</h1>
              <p className="text-white/60">Manage your account details and preferences.</p>
            </div>

            <div className="bg-surface border border-white/10 rounded-3xl p-6 md:p-8 space-y-8">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-24 h-24 rounded-full border-2 border-primary/50" referrerPolicy="no-referrer" />
                <div>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors mb-2">
                    Change Avatar
                  </button>
                  <p className="text-white/50 text-sm">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Nithin D."
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="nithindidigam@nhancio.com"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Username</label>
                  <input 
                    type="text" 
                    defaultValue="@nithind"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Website / Portfolio</label>
                  <input 
                    type="url" 
                    placeholder="https://"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-white/80">Bio</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us a little about yourself..."
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Connected Accounts */}
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-lg font-medium text-white mb-4">Connected Accounts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background border border-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Google</p>
                        <p className="text-white/50 text-sm">Connected</p>
                      </div>
                    </div>
                    <button className="text-white/50 hover:text-white text-sm font-medium transition-colors">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
