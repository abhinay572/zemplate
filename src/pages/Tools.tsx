import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Image, User, Scissors, ArrowUpRight, Video, PenTool, Box, MonitorPlay, PlaySquare, Palette, Smile, Layers, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

const TOOLS = [
  { id: "ai-image-generator", name: "AI Image Generator", icon: Image, description: "Create stunning images from text descriptions in seconds.", cost: 1, color: "from-purple-500 to-indigo-500" },
  { id: "face-swap", name: "AI Face Swap", icon: User, description: "Seamlessly swap faces in photos with incredible realism.", cost: 2, color: "from-pink-500 to-rose-500" },
  { id: "background-remover", name: "AI Background Remover", icon: Scissors, description: "Remove backgrounds instantly with pixel-perfect precision.", cost: 1, color: "from-orange-500 to-amber-500" },
  { id: "upscaler", name: "AI Upscaler", icon: ArrowUpRight, description: "Enhance image resolution up to 4x without losing quality.", cost: 2, color: "from-emerald-500 to-teal-500" },
  { id: "ugc-creator", name: "UGC Creator", icon: Video, description: "Generate user-generated content style videos with AI avatars.", cost: 5, color: "from-blue-500 to-cyan-500" },
  { id: "ai-headshot", name: "AI Headshot", icon: PenTool, description: "Create professional corporate headshots from casual selfies.", cost: 3, color: "from-violet-500 to-purple-500" },
  { id: "product-photos", name: "AI Product Photos", icon: Box, description: "Place your products in stunning AI-generated studio environments.", cost: 2, color: "from-fuchsia-500 to-pink-500" },
  { id: "text-to-video", name: "Text to Video", icon: MonitorPlay, description: "Turn your text prompts into cinematic short videos.", cost: 10, color: "from-red-500 to-orange-500" },
  { id: "image-to-video", name: "Image to Video", icon: PlaySquare, description: "Animate your static images into dynamic video clips.", cost: 8, color: "from-yellow-500 to-amber-500" },
  { id: "logo-maker", name: "AI Logo Maker", icon: Palette, description: "Design unique logos for your brand in minutes.", cost: 2, color: "from-lime-500 to-green-500" },
  { id: "ai-avatar", name: "AI Avatar", icon: Smile, description: "Create custom 3D or 2D avatars based on your photos.", cost: 3, color: "from-sky-500 to-blue-500" },
  { id: "batch-generator", name: "Batch Generator", icon: Layers, description: "Generate hundreds of variations at once for A/B testing.", cost: "Var", color: "from-slate-500 to-gray-500" },
];

const SkeletonToolCard = () => (
  <div className="bg-surface border border-white/5 rounded-3xl p-6 animate-pulse h-[240px] flex flex-col">
    <div className="flex items-start justify-between mb-6">
      <div className="w-12 h-12 rounded-2xl bg-white/10"></div>
      <div className="w-16 h-6 rounded-full bg-white/10"></div>
    </div>
    <div className="w-3/4 h-6 bg-white/10 rounded-md mb-4"></div>
    <div className="w-full h-4 bg-white/5 rounded-md mb-2"></div>
    <div className="w-5/6 h-4 bg-white/5 rounded-md mb-6"></div>
    <div className="mt-auto w-24 h-4 bg-white/10 rounded-md"></div>
  </div>
);

export function Tools() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title="AI Tools & Generators | Zemplate.ai"
        description="Explore our suite of AI tools including Image Generator, Face Swap, Background Remover, Upscaler, and more. Create professional content instantly."
        canonical="https://zemplate.ai/tools"
      />
      <Navbar />
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="mb-8 max-w-3xl mx-auto">
          <Breadcrumbs items={[
            { label: "Tools", href: "/tools" }
          ]} />
        </div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            The Ultimate AI Toolkit
          </h1>
          <p className="text-foreground-muted text-lg md:text-xl">
            Everything you need to create, edit, and scale your content. Powered by industry-leading AI models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <SkeletonToolCard key={i} />
            ))
          ) : (
            TOOLS.map((tool, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                key={tool.name}
              >
                <Link
                  to={`/tools/${tool.id}`}
                  className="group relative bg-surface border border-surface-border hover:border-primary/30 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)] overflow-hidden flex flex-col h-full hover:scale-[1.02] active:scale-[0.98]"
                >
                  {/* Background Glow */}
                  <div className={cn(
                    "absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500",
                    tool.color
                  )} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
                        tool.color
                      )}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs font-medium text-white/80 group-hover:bg-white/10 transition-colors">
                        <Zap className="w-3 h-3 text-tertiary" />
                        {tool.cost} {typeof tool.cost === 'number' ? 'cr' : ''}
                      </div>
                    </div>

                    <h3 className="text-xl font-display font-semibold text-foreground mb-2 transition-all">
                      {tool.name}
                    </h3>
                    <p className="text-foreground-muted text-sm flex-1 mb-6 transition-colors">
                      {tool.description}
                    </p>

                    <div className="flex items-center text-sm font-medium text-primary group-hover:text-white transition-colors">
                      Try Tool <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
