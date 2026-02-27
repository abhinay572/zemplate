import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_TEMPLATES } from "@/data/mockData";
import { ArrowLeft, Heart, Share2, Download, Zap, Sparkles, Image as ImageIcon, SlidersHorizontal, Layers, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateProductSchema } from "@/components/seo/JsonLd";

export function TemplateDetail() {
  const { id } = useParams();
  const template = MOCK_TEMPLATES.find(t => t.id === id) || MOCK_TEMPLATES[0];
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

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
      colors: ['#7c3aed', '#ec4899', '#f59e0b']
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title={`${template.title} - AI Template | Zemplate.ai`}
        description={`Generate stunning ${template.title} images instantly with Zemplate.ai. No prompting required. Try this ${template.category} template now.`}
        canonical={`https://zemplate.ai/template/${template.id}`}
        image={template.image}
        jsonLd={[generateProductSchema(template)]}
      />
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <Breadcrumbs items={[
            { label: "Templates", href: "/" },
            { label: template.category, href: `/templates/${template.category.toLowerCase().replace(/\s+/g, '-')}` },
            { label: template.title, href: `/template/${template.id}` }
          ]} />
        </div>
        
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Templates
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
          {/* Left Column - Preview */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-surface border border-white/10 flex items-center justify-center min-h-[400px] md:min-h-[600px] group">
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
                    <p className="text-white font-medium animate-pulse">Applying AI Magic...</p>
                  </motion.div>
                ) : (
                  <motion.img 
                    key="image"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-full object-contain max-h-[800px] transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
              </AnimatePresence>
              
              {/* Prompt Hidden Notice */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl transition-transform duration-300 hover:scale-105">
                <Sparkles className="w-5 h-5 text-tertiary" />
                <span className="text-white/90 font-medium tracking-wide">Prompt is hidden by creator</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={template.author.avatar} alt={template.author.name} className="w-12 h-12 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="text-white font-medium">{template.author.name}</h3>
                  <p className="text-white/50 text-sm">Creator</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white/70 hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/30 transition-all active:scale-90">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white/70 hover:text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/30 transition-all active:scale-90">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Customization Panel */}
          <div className="space-y-8">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                {template.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                {template.title}
              </h1>
              <div className="flex items-center gap-6 text-white/50 text-sm">
                <span className="flex items-center gap-1.5"><Heart className="w-4 h-4" /> {template.likes.toLocaleString()} likes</span>
                <span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> {template.uses.toLocaleString()} uses</span>
              </div>
            </div>

            <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                Customize
              </h3>

              {/* Aspect Ratio */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Aspect Ratio</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1:1', '4:5', '9:16', '16:9'].map(ratio => (
                    <button key={ratio} className={`py-2 rounded-lg border text-sm font-medium transition-all active:scale-95 ${ratio === '4:5' ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(124,58,237,0.3)]' : 'bg-black/20 border-white/10 text-white/60 hover:border-white/30 hover:text-white hover:bg-white/5'}`}>
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Variations */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Style Variation</label>
                <div className="flex flex-wrap gap-2">
                  {['Original', 'Vibrant', 'Muted', 'B&W', 'Warm'].map(style => (
                    <button key={style} className={`px-4 py-2 rounded-full border text-sm font-medium transition-all active:scale-95 ${style === 'Original' ? 'bg-white/10 border-white/20 text-white shadow-inner' : 'bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:text-white hover:bg-white/5'}`}>
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Resolution</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="py-3 rounded-xl border border-primary bg-primary/10 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-[0_0_10px_rgba(124,58,237,0.2)]">
                    <span className="text-white font-medium text-sm">Standard</span>
                    <span className="text-white/50 text-xs">1080p</span>
                  </button>
                  <button className="py-3 rounded-xl border border-white/10 bg-black/20 hover:border-white/30 hover:bg-white/5 transition-all active:scale-95 flex flex-col items-center justify-center gap-1">
                    <span className="text-white font-medium text-sm">HD</span>
                    <span className="text-white/50 text-xs flex items-center gap-1">2K <Zap className="w-3 h-3 text-tertiary" />+1</span>
                  </button>
                  <button className="py-3 rounded-xl border border-white/10 bg-black/20 hover:border-white/30 hover:bg-white/5 transition-all active:scale-95 flex flex-col items-center justify-center gap-1">
                    <span className="text-white font-medium text-sm">Ultra</span>
                    <span className="text-white/50 text-xs flex items-center gap-1">4K <Zap className="w-3 h-3 text-tertiary" />+2</span>
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isGenerated ? (
                  <motion.button 
                    key="generate-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-spin" /> Generating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> Generate Image
                        <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full text-sm ml-2">
                          <Zap className="w-4 h-4 text-tertiary" /> {template.cost}
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
                      <CheckCircle2 className="w-5 h-5" /> Generation Complete!
                    </div>
                    <button 
                      onClick={handleDownload}
                      className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Download className="w-5 h-5" /> Download Image
                    </button>
                    <button 
                      onClick={() => setIsGenerated(false)}
                      className="w-full py-3 rounded-xl bg-surface border border-white/10 text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                    >
                      Generate Another Variation
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <p className="text-center text-white/40 text-xs">
                By generating, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
