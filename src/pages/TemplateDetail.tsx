import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_TEMPLATES } from "@/data/mockData";
import { ArrowLeft, Heart, Share2, Download, Zap, Sparkles, SlidersHorizontal, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateProductSchema } from "@/components/seo/JsonLd";
import { getTemplate, getTemplatePrompt, incrementTemplateUsage } from "@/lib/firestore/templates";
import { useAuth } from "@/contexts/AuthContext";
import { generateFromTemplate } from "@/lib/providers/router";
import { uploadGeneratedImage } from "@/lib/storage";
import { createGeneration, updateGeneration } from "@/lib/firestore/generations";
import { deductCredits, incrementGenerations } from "@/lib/firestore/users";

interface TemplateDisplay {
  id: string;
  title: string;
  category: string;
  author: { name: string; avatar: string };
  image: string;
  likes: number;
  uses: number;
  aspectRatio: "portrait" | "landscape" | "square";
  cost: number;
  model?: string;
}

export function TemplateDetail() {
  const { id } = useParams();
  const { user, profile, refreshProfile } = useAuth();
  const [template, setTemplate] = useState<TemplateDisplay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [selectedRatio, setSelectedRatio] = useState("4:5");
  const [selectedStyle, setSelectedStyle] = useState("Original");

  useEffect(() => {
    if (!id) return;
    getTemplate(id)
      .then((t) => {
        if (t) {
          const ratio = t.aspectRatio === "3:4" || t.aspectRatio === "9:16" ? "portrait"
            : t.aspectRatio === "4:3" || t.aspectRatio === "16:9" ? "landscape" : "square";
          setTemplate({
            id: t.id,
            title: t.title,
            category: t.category,
            author: { name: t.authorName || "Zemplate", avatar: t.authorAvatar || "https://picsum.photos/seed/z/100/100" },
            image: t.imageUrl,
            likes: t.likesCount || 0,
            uses: t.usageCount || 0,
            aspectRatio: ratio,
            cost: t.creditCost || 1,
            model: t.model,
          });
          if (t.aspectRatio) setSelectedRatio(t.aspectRatio);
        } else {
          const mock = MOCK_TEMPLATES.find((m) => m.id === id) || MOCK_TEMPLATES[0];
          setTemplate(mock);
        }
      })
      .catch(() => {
        const mock = MOCK_TEMPLATES.find((m) => m.id === id) || MOCK_TEMPLATES[0];
        setTemplate(mock);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleGenerate = async () => {
    if (!user || !profile || !template || !id) return;
    setError("");

    const creditCost = template.cost || 1;
    if (profile.credits < creditCost) {
      setError(`Not enough credits. You need ${creditCost} but have ${profile.credits}.`);
      return;
    }

    setIsGenerating(true);
    setIsGenerated(false);
    const startTime = Date.now();

    let generationId = "";
    try {
      generationId = await createGeneration({
        userId: user.uid,
        templateId: id,
        templateTitle: template.title,
        toolSlug: "template-generate",
        modelUsed: template.model || "imagen-3",
        inputPrompt: "[hidden]",
        outputUrl: "",
        outputType: "image",
        resolution: "1024x1024",
        aspectRatio: selectedRatio,
        creditsCharged: creditCost,
        providerCost: 0,
        processingTimeMs: 0,
        status: "processing",
        errorMessage: "",
      });
    } catch {
      // Non-blocking
    }

    try {
      const deducted = await deductCredits(user.uid, creditCost);
      if (!deducted) {
        setError("Not enough credits.");
        setIsGenerating(false);
        if (generationId) await updateGeneration(generationId, { status: "failed", errorMessage: "Insufficient credits" });
        return;
      }

      const hiddenPrompt = await getTemplatePrompt(id);
      if (!hiddenPrompt) throw new Error("Template prompt not found.");

      const results = await generateFromTemplate(hiddenPrompt, {
        aspectRatio: selectedRatio,
        model: template.model,
        style: selectedStyle !== "Original" ? selectedStyle : undefined,
      });

      if (!results || results.length === 0) throw new Error("No image generated. Please try again.");

      const outputUrl = await uploadGeneratedImage(results[0].imageBytes, user.uid, generationId || Date.now().toString());
      const processingTime = Date.now() - startTime;

      if (generationId) {
        await updateGeneration(generationId, { status: "completed", outputUrl, processingTimeMs: processingTime });
      }

      await incrementGenerations(user.uid);
      await incrementTemplateUsage(id);
      await refreshProfile();

      setResultUrl(outputUrl);
      setIsGenerated(true);
    } catch (err: any) {
      console.error("Template generation failed:", err);
      setError(err.message || "Generation failed. Please try again.");
      if (generationId) await updateGeneration(generationId, { status: "failed", errorMessage: err.message || "Unknown error" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#7c3aed', '#ec4899', '#f59e0b'] });
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `zemplate-${template?.title?.replace(/\s+/g, "-").toLowerCase() || "image"}-${Date.now()}.png`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading || !template) {
    return (
      <div className="min-h-screen bg-background flex flex-col pt-16">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

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
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Templates
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
          {/* Left Column - Preview */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-surface border border-white/10 flex items-center justify-center min-h-[400px] md:min-h-[600px] group">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white font-medium animate-pulse">Applying AI Magic...</p>
                    <p className="text-white/40 text-sm mt-2">This may take 10-30 seconds</p>
                  </motion.div>
                ) : isGenerated && resultUrl ? (
                  <motion.img key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} src={resultUrl} alt="Generated Result" className="w-full h-full object-contain max-h-[800px]" referrerPolicy="no-referrer" />
                ) : (
                  <motion.img key="image" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} src={template.image} alt={template.title} className="w-full h-full object-contain max-h-[800px] transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                )}
              </AnimatePresence>

              {!isGenerated && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl transition-transform duration-300 hover:scale-105">
                  <Sparkles className="w-5 h-5 text-tertiary" />
                  <span className="text-white/90 font-medium tracking-wide">Prompt is hidden by creator</span>
                </div>
              )}
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
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">{template.category}</div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{template.title}</h1>
              <div className="flex items-center gap-6 text-white/50 text-sm">
                <span className="flex items-center gap-1.5"><Heart className="w-4 h-4" /> {template.likes.toLocaleString()} likes</span>
                <span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> {template.uses.toLocaleString()} uses</span>
              </div>
            </div>

            <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" /> Customize
              </h3>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Aspect Ratio</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1:1', '4:5', '9:16', '16:9'].map(ratio => (
                    <button key={ratio} onClick={() => setSelectedRatio(ratio)} className={`py-2 rounded-lg border text-sm font-medium transition-all active:scale-95 ${selectedRatio === ratio ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(124,58,237,0.3)]' : 'bg-black/20 border-white/10 text-white/60 hover:border-white/30 hover:text-white hover:bg-white/5'}`}>
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Style Variation</label>
                <div className="flex flex-wrap gap-2">
                  {['Original', 'Vibrant', 'Muted', 'B&W', 'Warm'].map(s => (
                    <button key={s} onClick={() => setSelectedStyle(s)} className={`px-4 py-2 rounded-full border text-sm font-medium transition-all active:scale-95 ${selectedStyle === s ? 'bg-white/10 border-white/20 text-white shadow-inner' : 'bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:text-white hover:bg-white/5'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {profile && (
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 text-sm">
                  <span className="text-white/50">Your credits</span>
                  <span className="text-white font-medium flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-tertiary" />{profile.credits}</span>
                </div>
              )}

              <AnimatePresence mode="wait">
                {!isGenerated ? (
                  <motion.button key="generate-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onClick={user ? handleGenerate : undefined} disabled={isGenerating || !user} className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]">
                    {!user ? (
                      <Link to="/login" className="flex items-center gap-2">Sign in to Generate</Link>
                    ) : isGenerating ? (
                      <span className="flex items-center gap-2"><Sparkles className="w-5 h-5 animate-spin" /> Generating...</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> Generate Image
                        <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full text-sm ml-2"><Zap className="w-4 h-4 text-tertiary" /> {template.cost}</span>
                      </span>
                    )}
                  </motion.button>
                ) : (
                  <motion.div key="download-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium mb-4"><CheckCircle2 className="w-5 h-5" /> Generation Complete!</div>
                    <button onClick={handleDownload} className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                      <Download className="w-5 h-5" /> Download Image
                    </button>
                    <button onClick={() => { setIsGenerated(false); setResultUrl(null); }} className="w-full py-3 rounded-xl bg-surface border border-white/10 text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                      Generate Another Variation
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-center text-white/40 text-xs">By generating, you agree to our Terms of Service.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
