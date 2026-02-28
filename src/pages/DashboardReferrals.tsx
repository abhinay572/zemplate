import { Navbar } from "@/components/layout/Navbar";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Copy, Gift, Users, Award } from "lucide-react";
import { useState } from "react";
import { SEO } from "@/components/seo/SEO";
import { useAuth } from "@/contexts/AuthContext";

export function DashboardReferrals() {
  const { profile } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralCode = profile?.referralCode || "LOADING";
  const referralLink = `https://zemplate.ai/?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Referral Program | Zemplate.ai"
        description="Invite friends and earn free credits on Zemplate.ai."
      />
      <Navbar />
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Referral Program</h1>
            <p className="text-white/60">Invite friends and earn free credits when they sign up.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{profile?.referralCreditsEarned || 0}</h3>
              <p className="text-white/60 text-sm">Credits Earned</p>
            </div>
            <div className="bg-surface border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 text-white">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{profile?.referralCount || 0}</h3>
              <p className="text-white/60 text-sm">Friends Invited</p>
            </div>
            <div className="bg-surface border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 text-white">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{referralCode}</h3>
              <p className="text-white/60 text-sm">Your Code</p>
            </div>
          </div>

          <div className="bg-surface border border-white/10 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6">Your Referral Link</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-background border border-white/10 rounded-xl px-4 py-3 text-white/80 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {referralLink}
              </div>
              <button
                onClick={handleCopy}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shrink-0"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <h4 className="text-lg font-medium text-white mb-4">How it works</h4>
              <ul className="space-y-4 text-white/60">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-sm font-bold">1</div>
                  <p>Share your unique referral link with friends, family, or followers.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-sm font-bold">2</div>
                  <p>When someone signs up using your link, they get 10 bonus credits.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-sm font-bold">3</div>
                  <p>You earn 10 credits for every successful signup. No limits!</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
