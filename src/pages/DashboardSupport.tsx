import { Navbar } from "@/components/layout/Navbar";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Mail, MessageCircle, FileText, ExternalLink } from "lucide-react";
import { SEO } from "@/components/seo/SEO";

export function DashboardSupport() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Help & Support | Zemplate.ai"
        description="Get help with Zemplate.ai. Contact support, read FAQs, and find resources."
      />
      <Navbar />
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Help & Support</h1>
            <p className="text-white/60">Need help? We're here for you. Choose an option below.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="mailto:support@zemplate.ai"
              className="bg-surface border border-white/10 rounded-3xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email Support</h3>
              <p className="text-white/60 text-sm mb-3">Send us an email and we'll get back to you within 24 hours.</p>
              <span className="text-primary text-sm font-medium flex items-center gap-1">
                support@zemplate.ai <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-white/10 rounded-3xl p-6 hover:border-emerald-500/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">WhatsApp Support</h3>
              <p className="text-white/60 text-sm mb-3">Chat with us on WhatsApp for quick assistance.</p>
              <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                Open WhatsApp <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          <div className="bg-surface border border-white/10 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              {[
                { q: "How do credits work?", a: "Each AI tool costs a certain number of credits per use. You can see the credit cost on each tool page. Free plans get 10 credits, and you can earn more through referrals or by upgrading your plan." },
                { q: "Can I get a refund?", a: "Yes, we offer refunds within 7 days of purchase if you haven't used the credits. Contact support@zemplate.ai for assistance." },
                { q: "How do I earn free credits?", a: "You can earn free credits by referring friends. For every friend who signs up using your referral link, both of you get bonus credits." },
                { q: "What image formats are supported?", a: "We support JPG, PNG, GIF, and WebP formats. Images are automatically compressed and optimized during upload." },
                { q: "Is my data safe?", a: "Yes, we take data privacy seriously. Your images are processed securely and we don't share your data with third parties. See our Privacy Policy for details." },
              ].map((faq, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-medium mb-2">{faq.q}</h4>
                  <p className="text-white/60 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
