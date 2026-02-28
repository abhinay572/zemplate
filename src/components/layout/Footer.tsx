import { Link } from "react-router-dom";
import { Twitter, Instagram, Youtube, Github, Facebook, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { subscribeNewsletter } from "@/lib/firestore/newsletter";

// Google Sheets webhook — pushes subscriber emails to a Google Sheet
async function pushToGoogleSheet(email: string): Promise<void> {
  const GOOGLE_SHEET_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;
  if (!GOOGLE_SHEET_WEBHOOK_URL) return; // Skip if not configured
  try {
    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
    });
  } catch {
    // Non-blocking — don't fail if sheet push fails
  }
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      await subscribeNewsletter(email);
      await pushToGoogleSheet(email);
      setStatus("success");
      setMessage("You're subscribed! Check your inbox for updates.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage("Subscription failed. Please try again.");
    }
  };

  return (
    <footer className="w-full bg-surface border-t border-white/5 pt-16 pb-8 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">Get weekly AI template drops</h3>
            <p className="text-white/70">Join 50K+ creators getting the best AI templates delivered to their inbox.</p>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="Enter your email"
                  className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-4 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                onClick={handleSubscribe}
                disabled={status === "loading"}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
              >
                {status === "loading" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Subscribe <Send className="w-4 h-4" /></>
                )}
              </button>
            </div>
            {status === "success" && (
              <div className="flex items-center gap-2 mt-3 text-emerald-400 text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> {message}
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" /> {message}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-display font-bold text-xl shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] transition-shadow">
                Z
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Zemplate<span className="opacity-50">.ai</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm max-w-xs mb-6">
              Create Stunning AI Images in One Click — No Prompting Skills Needed.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Twitter/X">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link to="/tools" className="hover:text-white transition-colors">AI Tools</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">API (coming soon)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
              <li><a href="mailto:hello@zemplate.ai" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© 2026 Zemplate.ai by VIIONR INFOTECH PVT LTD. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
