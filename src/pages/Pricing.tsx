import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Check, Zap, CreditCard, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/seo/SEO";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for trying out Zemplate.ai",
    features: [
      "5 Free Credits on signup",
      "Standard generation speed",
      "Basic templates access",
      "Personal use license",
      "Community support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "For creators who need unlimited power",
    features: [
      "Unlimited generations",
      "Fastest generation speed",
      "All premium templates",
      "Commercial use license",
      "Priority 24/7 support",
      "Early access to new features",
      "No watermarks",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Pay As You Go",
    price: "₹99",
    period: "/10 credits",
    description: "Flexible credits that never expire",
    features: [
      "10 Premium Credits",
      "Fast generation speed",
      "All premium templates",
      "Commercial use license",
      "Credits never expire",
    ],
    cta: "Buy Credits",
    popular: false,
  },
];

export function Pricing() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title="Pricing Plans - Free & Pro | Zemplate.ai"
        description="Simple, transparent pricing for AI image generation. Start for free, or upgrade to Pro for unlimited generations and commercial rights."
        canonical="https://zemplate.ai/pricing"
      />
      <Navbar />
      <main className="flex-1 w-full flex flex-col items-center py-16 px-4 md:px-6">
        <div className="text-center max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-white/60 text-lg md:text-xl">
            Choose the perfect plan for your creative needs. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mb-16">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-3xl p-8 flex flex-col transition-transform duration-300 hover:-translate-y-2",
                plan.popular
                  ? "bg-gradient-to-b from-surface to-surface border border-primary/50 shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                  : "bg-surface border border-white/10 hover:border-white/20"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  <Zap className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-display font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm mb-6 h-10">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/60">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full py-3 rounded-xl font-semibold transition-all duration-300",
                  plan.popular
                    ? "bg-gradient-primary text-white shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-[1.02]"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                )}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col items-center gap-4 text-white/60 bg-surface/50 rounded-2xl p-6 border border-white/5 w-full max-w-3xl">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium">Secure checkout via Razorpay</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm font-medium">UPI, Cards, Netbanking accepted</span>
            </div>
          </div>
          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder for payment logos */}
            <span className="font-bold tracking-wider">UPI</span>
            <span className="font-bold tracking-wider">VISA</span>
            <span className="font-bold tracking-wider">Mastercard</span>
            <span className="font-bold tracking-wider">RuPay</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
