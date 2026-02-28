import { Navbar } from "@/components/layout/Navbar";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Cpu,
  Zap,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";
import { getAllAIModels, updateAIModel, seedAIModels, type AIModel } from "@/lib/firestore/aiModels";

const providerColors: Record<string, { bg: string; text: string; border: string }> = {
  gemini: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  imagen: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
  magichour: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  replicate: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
};

export function SuperAdminModels() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterProvider, setFilterProvider] = useState("all");
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    getAllAIModels()
      .then(setModels)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const toggleModel = async (model: AIModel) => {
    const updated = !model.isEnabled;
    try {
      await updateAIModel(model.id!, { isEnabled: updated });
      setModels((prev) => prev.map((m) => (m.id === model.id ? { ...m, isEnabled: updated } : m)));
    } catch (err) {
      console.error("Failed to toggle model:", err);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedAIModels();
      const refreshed = await getAllAIModels();
      setModels(refreshed);
    } catch (err) {
      console.error("Failed to seed models:", err);
    } finally {
      setSeeding(false);
    }
  };

  const filteredModels = filterProvider === "all" ? models : models.filter((m) => m.provider === filterProvider);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO title="AI Models | Super Admin | Zemplate.ai" description="Configure AI model providers, pricing, and rate limits." />
      <Navbar />
      <AdminLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">AI Models</h1>
              <p className="text-white/60">Configure providers, pricing, rate limits, and enable/disable models.</p>
            </div>
            {models.length === 0 && !isLoading && (
              <button onClick={handleSeed} disabled={seeding} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50">
                {seeding ? "Seeding..." : "Seed All Models"}
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface border border-white/10 rounded-xl p-4">
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Total Models</p>
              <p className="text-2xl font-bold text-white mt-1">{models.length}</p>
            </div>
            <div className="bg-surface border border-white/10 rounded-xl p-4">
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Active Models</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{models.filter((m) => m.isEnabled).length}</p>
            </div>
            <div className="bg-surface border border-white/10 rounded-xl p-4">
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Providers</p>
              <p className="text-2xl font-bold text-white mt-1">{new Set(models.map((m) => m.provider)).size}</p>
            </div>
            <div className="bg-surface border border-white/10 rounded-xl p-4">
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Default Model</p>
              <p className="text-2xl font-bold text-white mt-1 truncate">{models.find((m) => m.isDefault)?.name || "None"}</p>
            </div>
          </div>

          {/* Provider Filters */}
          <div className="flex gap-3 flex-wrap">
            {["all", "gemini", "imagen", "magichour", "replicate"].map((p) => (
              <button key={p} onClick={() => setFilterProvider(p)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterProvider === p ? "bg-primary text-white" : "bg-surface border border-white/10 text-white/60 hover:text-white hover:border-white/20"}`}>
                {p === "all" ? "All Providers" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          {/* Models Grid */}
          <div className="grid gap-4">
            {isLoading ? (
              <div className="text-center py-12 text-white/40">Loading models...</div>
            ) : filteredModels.length === 0 ? (
              <div className="text-center py-12 text-white/40">No models found. Click "Seed All Models" to populate.</div>
            ) : filteredModels.map((model, i) => {
              const pColor = providerColors[model.provider] || providerColors.gemini;
              return (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`bg-surface border rounded-2xl p-6 transition-all ${model.isEnabled ? "border-white/10" : "border-white/5 opacity-60"}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-xl ${pColor.bg} flex items-center justify-center shrink-0`}>
                        <Cpu className={`w-6 h-6 ${pColor.text}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-bold">{model.name}</h3>
                          {model.isDefault && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase">Default</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full ${pColor.bg} ${pColor.text} border ${pColor.border} text-[10px] font-medium uppercase`}>{model.provider}</span>
                          <span className="text-white/40 text-xs font-mono">{model.providerModelId}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => toggleModel(model)} className="shrink-0" title={model.isEnabled ? "Disable model" : "Enable model"}>
                      {model.isEnabled ? <ToggleRight className="w-10 h-10 text-emerald-400" /> : <ToggleLeft className="w-10 h-10 text-white/30" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5 pt-5 border-t border-white/5">
                    <div>
                      <p className="text-white/40 text-xs mb-1">Your Cost</p>
                      <p className="text-white font-medium text-sm">${model.providerCost.toFixed(3)}/call</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">User Credits</p>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-tertiary" />
                        <span className="text-white font-medium text-sm">{model.baseCreditCost}</span>
                        <span className="text-white/30 text-xs">/ {model.hdCreditCost} / {model.ultraCreditCost}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Max Resolution</p>
                      <p className="text-white/70 text-sm">{model.maxResolution}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Rate Limit</p>
                      <p className="text-white/70 text-sm">{model.maxPerUserPerDay}/user/day</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Max/Day</p>
                      <p className="text-white/70 text-sm">{model.maxPerDay?.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    {model.supportsTextToImage && <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-medium">Text-to-Image</span>}
                    {model.supportsImageEditing && <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">Image Editing</span>}
                    {model.supportsVideo && <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-medium">Video</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
