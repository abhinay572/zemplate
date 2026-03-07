import { Navbar } from "@/components/layout/Navbar";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Copy, Gift, Users, Award, Share2 } from "lucide-react";
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
            <div className="mt-6">
              <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" /> Share on Social Media
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    name: "WhatsApp",
                    color: "bg-[#25D366] hover:bg-[#20bd5a]",
                    url: `https://wa.me/?text=${encodeURIComponent(`Join Zemplate.ai and get free AI credits! Use my referral link: ${referralLink}`)}`,
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    ),
                  },
                  {
                    name: "Twitter / X",
                    color: "bg-[#1DA1F2] hover:bg-[#1a8cd8]",
                    url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Create stunning AI images with @zemplate! Use my referral link to get free credits: ${referralLink}`)}`,
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    ),
                  },
                  {
                    name: "Facebook",
                    color: "bg-[#1877F2] hover:bg-[#166fe5]",
                    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    ),
                  },
                  {
                    name: "LinkedIn",
                    color: "bg-[#0A66C2] hover:bg-[#095bb5]",
                    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    ),
                  },
                  {
                    name: "Telegram",
                    color: "bg-[#0088cc] hover:bg-[#007ab8]",
                    url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent("Join Zemplate.ai and get free AI credits!")}`,
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    ),
                  },
                ].map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${platform.color} text-white px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 text-sm`}
                  >
                    {platform.icon}
                    {platform.name}
                  </a>
                ))}
              </div>
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
