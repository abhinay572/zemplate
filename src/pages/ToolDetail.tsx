import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Upload, Sparkles, Zap, Image as ImageIcon, Wand2, Palette, SlidersHorizontal, CheckCircle2, Download, AlertCircle, ArrowUpRight, Video, PenTool, Box, MonitorPlay, PlaySquare, Smile, Layers, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { useAuth } from "@/contexts/AuthContext";
import { generateImage, generateLogo, removeBackground, TOOL_CONFIG, type ToolType } from "@/lib/providers/router";
import { faceSwapPhoto } from "@/lib/providers/magichour";
import { uploadGeneratedImage, uploadFile } from "@/lib/storage";
import { createGeneration, updateGeneration } from "@/lib/firestore/generations";
import { deductCredits, incrementGenerations } from "@/lib/firestore/users";

interface ToolDef {
  id: string;
  toolType: ToolType;
  title: string;
  description: string;
  icon: any;
  color: string;
  needsUpload: boolean;
  needsPrompt: boolean;
  comingSoon?: boolean;
}

const TOOLS: ToolDef[] = [
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
    id: "logo-maker",
    toolType: "logo-maker" as ToolType,
    title: "AI Logo Maker",
    description: "Design unique logos for your brand in minutes.",
    icon: Palette,
    color: "from-lime-500 to-green-500",
    needsUpload: false,
    needsPrompt: true,
  },
  { id: "upscaler", toolType: "upscale-4x" as ToolType, title: "AI Upscaler", description: "Enhance image resolution up to 4x without losing quality.", icon: ArrowUpRight, color: "from-emerald-500 to-teal-500", needsUpload: true, needsPrompt: false, comingSoon: true },
  { id: "ugc-creator", toolType: "text-to-image" as ToolType, title: "UGC Creator", description: "Generate user-generated content style videos with AI avatars.", icon: Video, color: "from-blue-500 to-cyan-500", needsUpload: false, needsPrompt: true, comingSoon: true },
  { id: "ai-headshot", toolType: "text-to-image" as ToolType, title: "AI Headshot", description: "Create professional corporate headshots from casual selfies.", icon: PenTool, color: "from-violet-500 to-purple-500", needsUpload: true, needsPrompt: false, comingSoon: true },
  { id: "product-photos", toolType: "text-to-image" as ToolType, title: "AI Product Photos", description: "Place your products in stunning AI-generated studio environments.", icon: Box, color: "from-fuchsia-500 to-pink-500", needsUpload: true, needsPrompt: true, comingSoon: true },
  { id: "text-to-video", toolType: "text-to-image" as ToolType, title: "Text to Video", description: "Turn your text prompts into cinematic short videos.", icon: MonitorPlay, color: "from-red-500 to-orange-500", needsUpload: false, needsPrompt: true, comingSoon: true },
  { id: "image-to-video", toolType: "text-to-image" as ToolType, title: "Image to Video", description: "Animate your static images into dynamic video clips.", icon: PlaySquare, color: "from-yellow-500 to-amber-500", needsUpload: true, needsPrompt: false, comingSoon: true },
  { id: "ai-avatar", toolType: "text-to-image" as ToolType, title: "AI Avatar", description: "Create custom 3D or 2D avatars based on your photos.", icon: Smile, color: "from-sky-500 to-blue-500", needsUpload: true, needsPrompt: false, comingSoon: true },
  { id: "batch-generator", toolType: "text-to-image" as ToolType, title: "Batch Generator", description: "Generate hundreds of variations at once for A/B testing.", icon: Layers, color: "from-slate-500 to-gray-500", needsUpload: false, needsPrompt: true, comingSoon: true },
];

export function ToolDetail() {
  const { id } = useParams();
  const { user, profile, refreshProfile } = useAuth();
  const tool = TOOLS.find(t => t.id === id);

  // Show Coming Soon page for tools not yet implemented or flagged
  if (!tool || tool.comingSoon) {
    const info = tool || { title: "Tool", description: "This tool is not available yet.", icon: Sparkles, color: "from-gray-500 to-gray-600", id: id || "unknown" };
    return (
      <div className="min-h-screen bg-background flex flex-col pt-16">
        <SEO title={`${info.title} - Coming Soon`} description={info.description} />
        <Navbar />
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center text-center">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-6 shadow-lg`}>
            <info.icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{info.title}</h1>
          <p className="text-white/60 text-lg max-w-md mb-6">{info.description}</p>
          <div className="flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-6 py-3 rounded-full font-semibold mb-8">
            <Clock className="w-5 h-5" /> Coming Soon
          </div>
          <Link to="/tools" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Tools
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [targetFileName, setTargetFileName] = useState("");
  const [targetFile, setTargetFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const targetInputRef = useRef<HTMLInputElement>(null);

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
  }, [id]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      setUploadedImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleTargetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTargetFileName(file.name);
    setTargetFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      setTargetImage(base64);
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
    if (tool.toolType === "face-swap" && !targetImage) {
      setError("Please upload both a source face image and a target image.");
      return;
    }

    setIsGenerating(true);
    setIsGenerated(false);
    const startTime = Date.now();

    let generationId = "";
    try {
      generationId = await createGeneration({
        userId: user.id,
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
      const deducted = await deductCredits(user.id, config.creditCost);
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
          outputUrl = await uploadGeneratedImage(results[0].imageBytes, user.id, generationId || Date.now().toString());
        }
      } else if (tool.toolType === "face-swap" && uploadedFile && targetFile) {
        const sourceExt = uploadedFile.name.split(".").pop() || "png";
        const targetExt = targetFile.name.split(".").pop() || "png";
        const sourceUrl = await uploadFile(uploadedFile, `face-swap/${user.id}/source-${Date.now()}.${sourceExt}`);
        const targetUrl = await uploadFile(targetFile, `face-swap/${user.id}/target-${Date.now()}.${targetExt}`);
        const result = await faceSwapPhoto(sourceUrl, targetUrl);
        if (result?.downloads?.[0]) {
          outputUrl = result.downloads[0];
        } else if (result?.result_url) {
          outputUrl = result.result_url;
        }
      } else if (tool.toolType === "logo-maker" && prompt.trim()) {
        const results = await generateLogo(prompt);
        if (results.length > 0) {
          outputUrl = await uploadGeneratedImage(results[0].imageBytes, user.id, generationId || Date.now().toString());
        }
      } else if (tool.toolType === "remove-bg" && uploadedImage) {
        const result = await removeBackground(uploadedImage, false);
        if ("images" in result && result.images.length > 0) {
          outputUrl = await uploadGeneratedImage(result.images[0].imageBytes, user.id, generationId || Date.now().toString());
        } else if ("outputUrl" in result) {
          outputUrl = result.outputUrl;
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

      await incrementGenerations(user.id);
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

              {tool.id === 'logo-maker' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Brand Description</label>
                    <textarea className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none h-32 transition-colors" placeholder="Describe your brand, business name, and style preferences... e.g. 'A modern tech startup called NovaPay, fintech, clean and minimal'" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                  </div>
                </div>
              )}

              {tool.id === 'face-swap' && (
                <div className="space-y-4">
                  <input ref={targetInputRef} type="file" accept="image/*" className="hidden" onChange={handleTargetUpload} />
                  <div className="p-4 rounded-xl border border-white/10 bg-black/20 text-center hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                    <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">Source Face</p>
                    <p className="text-sm text-white/60 mb-2 group-hover:text-white/80 transition-colors">{uploadedImage ? `✓ ${uploadedFileName}` : "Upload the face you want to use"}</p>
                    <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-all active:scale-95">{uploadedImage ? "Change" : "Select Image"}</button>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-black/20 text-center hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => targetInputRef.current?.click()}>
                    <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">Target Photo</p>
                    <p className="text-sm text-white/60 mb-2 group-hover:text-white/80 transition-colors">{targetImage ? `✓ ${targetFileName}` : "Upload the photo to swap face into"}</p>
                    <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-all active:scale-95">{targetImage ? "Change" : "Select Image"}</button>
                  </div>
                </div>
              )}

              {tool.id === 'background-remover' && !uploadedImage && (
                <div className="p-4 rounded-xl border border-white/10 bg-black/20 text-center">
                  <p className="text-sm text-white/60 mb-3">Upload an image to remove its background</p>
                  <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-all active:scale-95">Select Image</button>
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
                  !user ? (
                    <motion.div key="signin-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <Link to="/login" className={`w-full py-4 rounded-xl bg-gradient-to-r ${tool.color} text-white font-bold text-lg shadow-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]`}>
                        <Sparkles className="w-5 h-5" /> Sign in to Generate
                      </Link>
                    </motion.div>
                  ) : (
                  <motion.button key="run-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onClick={handleGenerate} disabled={isGenerating} className={`w-full py-4 rounded-xl bg-gradient-to-r ${tool.color} text-white font-bold text-lg shadow-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]`}>
                    {isGenerating ? (
                      <span className="flex items-center gap-2"><Sparkles className="w-5 h-5 animate-spin" /> Processing...</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> Run Tool
                        <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full text-sm ml-2"><Zap className="w-4 h-4 text-tertiary" /> {config.creditCost}</span>
                      </span>
                    )}
                  </motion.button>
                  )
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
