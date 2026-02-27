import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Check, X } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

const COMPETITORS: Record<string, any> = {
  "canva": {
    name: "Canva",
    title: "Zemplate.ai vs Canva: The Best AI Image Generator for Marketers",
    description: "Compare Zemplate.ai and Canva. Discover why Zemplate's dedicated AI templates offer better, more consistent results than Canva's generic AI tools.",
    pros: ["Dedicated AI models for specific use cases", "Zero prompting required", "Consistent style across campaigns", "Cheaper per generation"],
    cons: ["Generic AI models", "Requires prompting skills", "Inconsistent results", "Expensive pro subscription"],
  },
  "midjourney": {
    name: "Midjourney",
    title: "Zemplate.ai vs Midjourney: Easier AI Art Generation",
    description: "Compare Zemplate.ai and Midjourney. See why Zemplate's template-based approach is easier and faster for marketers and creators.",
    pros: ["No Discord required", "Zero prompting skills needed", "Consistent styles", "Cheaper for casual users"],
    cons: ["Steep learning curve", "Requires Discord", "Hard to get consistent results", "Expensive subscription"],
  },
  "leonardo-ai": {
    name: "Leonardo AI",
    title: "Zemplate.ai vs Leonardo AI: Which is Better for Creators?",
    description: "Compare Zemplate.ai and Leonardo AI. Find out which platform offers the best balance of power and ease of use for your creative needs.",
    pros: ["Pre-engineered templates", "One-click generation", "No complex parameter tuning", "Focus on marketing assets"],
    cons: ["Overwhelming interface", "Complex parameter tuning", "Steep learning curve", "Geared towards advanced users"],
  },
  "adobe-firefly": {
    name: "Adobe Firefly",
    title: "Zemplate.ai vs Adobe Firefly: AI Generation Comparison",
    description: "Compare Zemplate.ai and Adobe Firefly. Learn why Zemplate is the preferred choice for fast, high-quality, template-driven AI generation.",
    pros: ["Standalone platform", "Faster generation times", "More diverse styles", "No Adobe ecosystem lock-in"],
    cons: ["Requires Adobe Creative Cloud", "Slower generation", "Limited style diversity", "Expensive ecosystem"],
  }
};

export function Comparison() {
  const { competitor } = useParams();
  const data = competitor ? COMPETITORS[competitor] : null;
  
  const competitorName = data ? data.name : (competitor 
    ? competitor.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Competitor");

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title={data ? data.title : `Zemplate.ai vs ${competitorName}`}
        description={data ? data.description : `Compare Zemplate.ai and ${competitorName}. Discover why creators are switching to Zemplate.ai for faster, easier AI image generation.`}
        canonical={`https://zemplate.ai/vs/${competitor}`}
      />
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-surface border-b border-white/5 py-12 md:py-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto mb-8">
            <Breadcrumbs items={[
              { label: "Comparisons", href: "/vs" },
              { label: `Zemplate vs ${competitorName}`, href: `/vs/${competitor}` }
            ]} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Zemplate.ai vs {competitorName}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            {data ? data.description : `Why creators are switching to Zemplate.ai for faster, easier, and more stunning AI image generation.`}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/signup" className="bg-gradient-primary text-white px-8 py-3.5 rounded-full font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105 transition-all flex items-center gap-2">
              Try Zemplate Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
        
        {/* Comparison Table */}
        <div className="bg-surface border border-white/10 rounded-3xl overflow-hidden mb-16">
          <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 p-6">
            <div className="font-bold text-white/60">Feature</div>
            <div className="font-bold text-primary text-center">Zemplate.ai</div>
            <div className="font-bold text-white/60 text-center">{competitorName}</div>
          </div>
          
          {[
            { feature: "Prompt Engineering Required", z: false, c: true },
            { feature: "Pre-built Templates", z: true, c: false },
            { feature: "Canva-style Editor", z: true, c: false },
            { feature: "Pay-As-You-Go Credits", z: true, c: false },
            { feature: "Commercial Rights", z: true, c: true },
            { feature: "API Access", z: true, c: true },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-white/5 p-6 hover:bg-white/5 transition-colors">
              <div className="font-medium text-white/80">{row.feature}</div>
              <div className="flex justify-center">
                {row.z ? <Check className="w-6 h-6 text-emerald-400" /> : <X className="w-6 h-6 text-red-400" />}
              </div>
              <div className="flex justify-center">
                {row.c ? <Check className="w-6 h-6 text-emerald-400" /> : <X className="w-6 h-6 text-red-400" />}
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="prose prose-invert prose-lg max-w-none text-white/80">
          <h2 className="text-3xl font-display font-bold text-white mb-6">
            The Verdict: AI Images Without Prompting
          </h2>
          <p>
            While {competitorName} is a powerful tool, it requires a steep learning curve to master prompt engineering. You have to spend hours tweaking words to get the exact result you want.
          </p>
          <p>
            Zemplate.ai takes a different approach. We've done the hard work of prompt engineering for you. Our marketplace offers thousands of pre-built, curated AI templates. You just select a template, customize the settings in our intuitive Canva-style editor, and generate stunning images in one click.
          </p>
          {data && (
            <>
              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why Choose Zemplate over {data.name}?</h3>
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Zemplate Pros
                  </h4>
                  <ul className="space-y-2">
                    {data.pros.map((pro: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-emerald-400 mt-1">•</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5" /> {data.name} Cons
                  </h4>
                  <ul className="space-y-2">
                    {data.cons.map((con: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-red-400 mt-1">•</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
          <p>
            Stop wasting time and credits on bad prompts. Switch to Zemplate.ai and start creating professional assets instantly.
          </p>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
