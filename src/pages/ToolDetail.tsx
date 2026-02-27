import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Upload, Sparkles, Zap, Image as ImageIcon, Wand2, SlidersHorizontal, CheckCircle2, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

const TOOLS = [
  {
    id: "ai-image-generator",
    title: "AI Image Generator",
    description: "Generate stunning images from text descriptions.",
    icon: ImageIcon,
    cost: 1,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "face-swap",
    title: "AI Face Swap",
    description: "Seamlessly swap faces in photos with high realism.",
    icon: Wand2,
    cost: 2,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "background-remover",
    title: "Background Remover",
    description: "Remove backgrounds instantly with AI precision.",
    icon: Sparkles,
    cost: 1,
    color: "from-emerald-500 to-teal-500",
  },
];

export function ToolDetail() {
  const { id } = useParams();
  const tool = TOOLS.find(t => t.id === id) || TOOLS[0];
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  const handleDownload = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#ec4899']
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col pt-16">
        <Navbar />
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-8">
          <div className="w-32 h-6 bg-white/5 rounded-md animate-pulse mb-8"></div>
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
            <div className="bg-surface border border-white/5 rounded-3xl min-h-[400px] md:min-h-[600px] animate-pulse"></div>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="w-3/4 h-10 bg-white/5 rounded-xl animate-pulse"></div>
                <div className="w-full h-6 bg-white/5 rounded-md animate-pulse"></div>
              </div>
              <div className="bg-surface border border-white/5 rounded-2xl p-6 h-[400px] animate-pulse"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title={`${tool.title} | Zemplate.ai`}
        description={tool.description}
        canonical={`https://zemplate.ai/tools/${tool.id}`}
      />
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <Breadcrumbs items={[
            { label: "Tools", href: "/tools" },
            { label: tool.title, href: `/tools/${tool.id}` }
          ]} />
        </div>
        
        <Link to="/tools" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Tools
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
          {/* Left Column - Workspace */}
          <div className="space-y-6">
            <div className="relative bg-surface border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px] border-dashed overflow-hidden group">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div 
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20"
                  >
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white font-medium animate-pulse">Processing with AI...</p>
                  </motion.div>
                ) : isGenerated ? (
                  <motion.div
                    key="generated"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40"
                  >
                    <img src="https://picsum.photos/seed/toolgen/800/800" alt="Generated Result" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-500`}>
                      <tool.icon className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 text-center">
                      {tool.title} Workspace
                    </h2>
                    <p className="text-white/60 text-center max-w-md mb-8">
                      Drag and drop your image here, or click to browse files.
                    </p>
                    
                    <button className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all active:scale-95 flex items-center gap-3 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                      <Upload className="w-5 h-5" />
                      Upload Image
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Settings Panel */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                {tool.title}
              </h1>
              <p className="text-white/60 text-lg">
                {tool.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-surface border border-white/10 rounded-2xl p-6 space-y-6"
            >
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                Settings
              </h3>

              {/* Tool Specific Settings (Mocked) */}
              {tool.id === 'ai-image-generator' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Prompt</label>
                    <textarea 
                      className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none h-32 transition-colors"
                      placeholder="Describe the image you want to generate..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Style</label>
                    <select className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary transition-colors">
                      <option>Photorealistic</option>
                      <option>Anime</option>
                      <option>3D Render</option>
                      <option>Digital Art</option>
                    </select>
                  </div>
                </div>
              )}

              {tool.id === 'face-swap' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-black/20 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                    <p className="text-sm text-white/60 mb-2 group-hover:text-white/80 transition-colors">Target Face</p>
                    <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-all active:scale-95">Select Target</button>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {!isGenerated ? (
                  <motion.button 
                    key="run-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`w-full py-4 rounded-xl bg-gradient-to-r ${tool.color} text-white font-bold text-lg shadow-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-spin" /> Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> Run Tool
                        <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full text-sm ml-2">
                          <Zap className="w-4 h-4 text-tertiary" /> {tool.cost}
                        </span>
                      </span>
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    key="download-actions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium mb-4">
                      <CheckCircle2 className="w-5 h-5" /> Processing Complete!
                    </div>
                    <button 
                      onClick={handleDownload}
                      className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Download className="w-5 h-5" /> Download Result
                    </button>
                    <button 
                      onClick={() => setIsGenerated(false)}
                      className="w-full py-3 rounded-xl bg-surface border border-white/10 text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      Process Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <p className="text-center text-white/40 text-xs">
                By generating, you agree to our Terms of Service.
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
