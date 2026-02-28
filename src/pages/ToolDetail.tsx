import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Upload, Sparkles, Zap, Image as ImageIcon, Wand2, SlidersHorizontal, CheckCircle2, Download, AlertCircle, PenTool } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { useAuth } from "@/contexts/AuthContext";
import { generateImage, removeBackground, generateProductPhoto, TOOL_CONFIG, type ToolType } from "@/lib/providers/router";
import { uploadGeneratedImage } from "@/lib/storage";
import { createGeneration, updateGeneration } from "@/lib/firestore/generations";
import { deductCredits, incrementGenerations } from "@/lib/firestore/users";

const TOOLS = [
  {
    id: "ai-image-generator",
    toolType: "text-to-image" as ToolType,
    title: "AI Image Generator",
    description: "Generate stunning images from text descriptions.",
    icon: ImageIcon,
    color: "from-blue-500 to-cyan-500",
    needsUpload: false,
    needsPrompt: true,
  },
  {
    id: "face-swap",
    toolType: "face-swap" as ToolType,
    title: "AI Face Swap",
    description: "Seamlessly swap faces in photos with high realism.",
    icon: Wand2,
    color: "from-purple-500 to-pink-500",
    needsUpload: true,
    needsPrompt: false,
  },
  {
    id: "background-remover",
    toolType: "remove-bg" as ToolType,
    title: "Background Remover",
    description: "Remove backgrounds instantly with AI precision.",
    icon: Sparkles,
    color: "from-emerald-500 to-teal-500",
    needsUpload: true,
    needsPrompt: false,
  },
  {
    id: "ai-headshot",
    toolType: "headshot" as ToolType,
    title: "AI Headshot Generator",
    description: "Upload a selfie and get a professional corporate headshot instantly. No prompt needed.",
    icon: PenTool,
    color: "from-violet-500 to-purple-500",
    needsUpload: true,
    needsPrompt: false,
  },
];

export function ToolDetail() {
  const { id } = useParams();
  const { user, profile, refreshProfile } = useAuth();
  const tool = TOOLS.find(t => t.id === id) || TOOLS[0];
  const config = TOOL_CONFIG[tool.toolType];

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Photorealistic");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [headshotStyle, setHeadshotStyle] = useState("Corporate");
  const [autoGenerate, setAutoGenerate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    setIsGenerated(false);
    setResultUrl(null);
    setError("");
    setPrompt("");
    setUploadedImage(null);
    setUploadedFileName("");
    setAutoGenerate(false);
  }, [id]);

  // Auto-trigger generation for headshot tool after image upload
  useEffect(() => {
    if (autoGenerate && uploadedImage && tool.id === "ai-headshot" && user && profile && !isGenerating) {
      setAutoGenerate(false);
      handleGenerate();
    }
  }, [autoGenerate, uploadedImage]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      setUploadedImage(base64);
      // Auto-trigger for headshot tool
      if (tool.id === "ai-headshot") {
        setAutoGenerate(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!user || !profile) return;
    setError("");

    if (profile.credits < config.creditCost) {
      setError(`Not enough credits. You need ${config.creditCost} but have ${profile.credits}.`);
      return;
    }

    if (tool.needsPrompt && !prompt.trim()) {
      setError("Please enter a prompt to generate an image.");
      return;
    }
    if (tool.needsUpload && !uploadedImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsGenerating(true);
    setIsGenerated(false);
    const startTime = Date.now();

    let generationId = "";
    try {
      generationId = await createGeneration({
        userId: user.uid,
        templateId: "",
        templateTitle: "",
        toolSlug: tool.toolType,
        modelUsed: config.modelSlug,
        inputPrompt: prompt || `[${tool.title}]`,
        outputUrl: "",
        outputType: "image",
        resolution: "1024x1024",
        aspectRatio: "1:1",
        creditsCharged: config.creditCost,
        providerCost: 0,
        processingTimeMs: 0,
        status: "processing",
        errorMessage: "",
      });
    } catch {
      // Non-blocking
    }

    try {
      const deducted = await deductCredits(user.uid, config.creditCost);
      if (!deducted) {
        setError("Not enough credits.");
        setIsGenerating(false);
        if (generationId) await updateGeneration(generationId, { status: "failed", errorMessage: "Insufficient credits" });
        return;
      }

      let outputUrl = "";

      if (tool.toolType === "text-to-image") {
        const results = await generateImage(prompt, { style });
        if (results.length > 0) {
          outputUrl = await uploadGeneratedImage(results[0].imageBytes, user.uid, generationId || Date.now().toString());
        }
      } else if (tool.toolType === "remove-bg" && uploadedImage) {
        const result = await removeBackground(uploadedImage, false);
        if ("images" in result && result.images.length > 0) {
          outputUrl = await uploadGeneratedImage(result.images[0].imageBytes, user.uid, generationId || Date.now().toString());
        } else if ("outputUrl" in result) {
          outputUrl = result.outputUrl;
        }
      } else if (tool.toolType === "headshot" && uploadedImage) {
        // Headshot: use Gemini to generate a professional headshot from the selfie
        const headshotPrompt = `Transform this casual selfie into a professional ${headshotStyle.toLowerCase()} headshot. Clean background, professional lighting, sharp focus on face, business-appropriate appearance. High quality portrait photography style.`;
        const { editWithGemini } = await import("@/lib/providers/gemini-image");
        const results = await editWithGemini(uploadedImage, headshotPrompt);
        if (results.length > 0) {
          outputUrl = await uploadGeneratedImage(results[0].imageBytes, user.uid, generationId || Date.now().toString());
        }
      }

      if (!outputUrl) {
        throw new Error("No output generated. Please try again.");
      }

      const processingTime = Date.now() - startTime;

      if (generationId) {
        await updateGeneration(generationId, {
          status: "completed",
          outputUrl,
          processingTimeMs: processingTime,
        });
      }

      await incrementGenerations(user.uid);
      await refreshProfile();

      setResultUrl(outputUrl);
      setIsGenerated(true);
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError(err.message || "Generation failed. Please try again.");
      if (generationId) {
        await updateGeneration(generationId, { status: "failed", errorMessage: err.message || "Unknown error" });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#3b82f6', '#8b5cf6', '#ec4899'] });
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `zemplate-${tool.id}-${Date.now()}.png`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <SEO title={`${tool.title} | Zemplate.ai`} description={tool.description} canonical={`https://zemplate.ai/tools/${tool.id}`} />
      <Navbar />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: tool.title, href: `/tools/${tool.id}` }]} />
        </div>

        <Link to="/tools" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Tools
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
          {/* Left Column - Workspace */}
          <div className="space-y-6">
            <div className="relative bg-surface border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px] border-dashed overflow-hidden group">
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white font-medium animate-pulse">Processing with AI...</p>
                    <p className="text-white/40 text-sm mt-2">This may take 10-30 seconds</p>
                  </motion.div>
                ) : isGenerated && resultUrl ? (
                  <motion.div key="generated" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <img src={resultUrl} alt="Generated Result" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </motion.div>
                ) : uploadedImage ? (
                  <motion.div key="uploaded" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex flex-col items-center justify-center">
                    <img src={`data:image/png;base64,${uploadedImage}`} alt="Uploaded" className="max-h-[500px] object-contain rounded-xl" />
                    <p className="text-white/50 text-sm mt-4">{uploadedFileName}</p>
                  </motion.div>
                ) : (
                  <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-500`}>
                      <tool.icon className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 text-center">{tool.title} Workspace</h2>
                    <p className="text-white/60 text-center max-w-md mb-8">
                      {tool.needsUpload ? "Drag and drop your image here, or click to browse files." : "Enter a prompt in the settings panel to generate your image."}
                    </p>
                    {tool.needsUpload && (
                      <button onClick={() => fileInputRef.current?.click()} className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all active:scale-95 flex items-center gap-3">
                        <Upload className="w-5 h-5" /> Upload Image
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Settings Panel */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{tool.title}</h1>
              <p className="text-white/60 text-lg">{tool.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="bg-surface border border-white/10 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" /> Settings
              </h3>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}

              {tool.id === 'ai-image-generator' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Prompt</label>
                    <textarea className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none h-32 transition-colors" placeholder="Describe the image you want to generate..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Style</label>
                    <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary transition-colors">
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
                  <div className="p-4 rounded-xl border border-white/10 bg-black/20 text-center hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                    <p className="text-sm text-white/60 mb-2 group-hover:text-white/80 transition-colors">{uploadedImage ? "Image uploaded" : "Upload source image"}</p>
                    <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-all active:scale-95">{uploadedImage ? "Change Image" : "Select Image"}</button>
                  </div>
                </div>
              )}

              {tool.id === 'background-remover' && !uploadedImage && (
                <div className="p-4 rounded-xl border border-white/10 bg-black/20 text-center">
                  <p className="text-sm text-white/60 mb-3">Upload an image to remove its background</p>
                  <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-all active:scale-95">Select Image</button>
                </div>
              )}

              {tool.id === 'ai-headshot' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-black/20 text-center hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                    <p className="text-sm text-white/60 mb-2 group-hover:text-white/80 transition-colors">{uploadedImage ? "Selfie uploaded — processing automatically" : "Upload a selfie to generate your headshot"}</p>
                    <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-all active:scale-95">{uploadedImage ? "Change Photo" : "Upload Selfie"}</button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Headshot Style</label>
                    <select value={headshotStyle} onChange={(e) => setHeadshotStyle(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary transition-colors">
                      <option>Corporate</option>
                      <option>Creative</option>
                      <option>Casual Professional</option>
                      <option>LinkedIn</option>
                    </select>
                  </div>
                  <p className="text-xs text-white/40">Upload a clear selfie. AI will automatically generate a professional headshot — no prompt needed.</p>
                </div>
              )}

              {profile && (
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 text-sm">
                  <span className="text-white/50">Your credits</span>
                  <span className="text-white font-medium flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-tertiary" />{profile.credits}</span>
                </div>
              )}

              <AnimatePresence mode="wait">
                {!isGenerated ? (
                  <motion.button key="run-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onClick={user ? handleGenerate : undefined} disabled={isGenerating || !user} className={`w-full py-4 rounded-xl bg-gradient-to-r ${tool.color} text-white font-bold text-lg shadow-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]`}>
                    {!user ? (
                      <Link to="/login" className="flex items-center gap-2">Sign in to Generate</Link>
                    ) : isGenerating ? (
                      <span className="flex items-center gap-2"><Sparkles className="w-5 h-5 animate-spin" /> Processing...</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> Run Tool
                        <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full text-sm ml-2"><Zap className="w-4 h-4 text-tertiary" /> {config.creditCost}</span>
                      </span>
                    )}
                  </motion.button>
                ) : (
                  <motion.div key="download-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium mb-4"><CheckCircle2 className="w-5 h-5" /> Processing Complete!</div>
                    <button onClick={handleDownload} className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                      <Download className="w-5 h-5" /> Download Result
                    </button>
                    <button onClick={() => { setIsGenerated(false); setResultUrl(null); setUploadedImage(null); setUploadedFileName(""); }} className="w-full py-3 rounded-xl bg-surface border border-white/10 text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 active:scale-95">
                      Process Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-center text-white/40 text-xs">By generating, you agree to our Terms of Service.</p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
