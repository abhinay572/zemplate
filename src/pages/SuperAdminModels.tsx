import { Navbar } from "@/components/layout/Navbar";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Cpu,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Zap,
  ToggleLeft,
  ToggleRight,
  Edit3,
  IndianRupee,
  Activity,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";

const ADMIN_SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: "Overview", href: "/super-admin" },
  { icon: ImageIcon, label: "Templates", href: "/super-admin/templates" },
  { icon: Cpu, label: "AI Models", href: "/super-admin/models", active: true },
  { icon: Users, label: "Users", href: "/super-admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/super-admin/analytics" },
];

interface AIModel {
  id: string;
  name: string;
  slug: string;
  provider: string;
  providerModelId: string;
  providerCost: number;
  baseCreditCost: number;
  hdCreditCost: number;
  ultraCreditCost: number;
  supportsTextToImage: boolean;
  supportsImageEditing: boolean;
  supportsVideo: boolean;
  maxResolution: string;
  isEnabled: boolean;
  isDefault: boolean;
  callsToday: number;
  maxPerDay: number;
  maxPerUserPerDay: number;
}

const MOCK_MODELS: AIModel[] = [
  {
    id: "1", name: "Nano Banana", slug: "nano-banana", provider: "gemini",
    providerModelId: "gemini-2.5-flash-image", providerCost: 0.039,
    baseCreditCost: 1, hdCreditCost: 2, ultraCreditCost: 3,
    supportsTextToImage: true, supportsImageEditing: true, supportsVideo: false,
    maxResolution: "1024x1024", isEnabled: true, isDefault: true,
    callsToday: 4820, maxPerDay: 10000, maxPerUserPerDay: 100,
  },
  {
    id: "2", name: "Nano Banana Pro", slug: "nano-banana-pro", provider: "gemini",
    providerModelId: "gemini-3-pro-image-preview", providerCost: 0.067,
    baseCreditCost: 2, hdCreditCost: 3, ultraCreditCost: 3,
    supportsTextToImage: true, supportsImageEditing: true, supportsVideo: false,
    maxResolution: "4096x4096", isEnabled: true, isDefault: false,
    callsToday: 1240, maxPerDay: 5000, maxPerUserPerDay: 50,
  },
  {
    id: "3", name: "Nano Banana 2", slug: "nano-banana-2", provider: "gemini",
    providerModelId: "gemini-3.1-flash-image-preview", providerCost: 0.030,
    baseCreditCost: 1, hdCreditCost: 2, ultraCreditCost: 3,
    supportsTextToImage: true, supportsImageEditing: true, supportsVideo: false,
    maxResolution: "4096x4096", isEnabled: true, isDefault: false,
    callsToday: 2180, maxPerDay: 10000, maxPerUserPerDay: 100,
  },
  {
    id: "4", name: "Imagen 3", slug: "imagen-3", provider: "imagen",
    providerModelId: "imagen-3.0-generate-002", providerCost: 0.030,
    baseCreditCost: 1, hdCreditCost: 2, ultraCreditCost: 3,
    supportsTextToImage: true, supportsImageEditing: false, supportsVideo: false,
    maxResolution: "1024x1024", isEnabled: true, isDefault: false,
    callsToday: 3100, maxPerDay: 10000, maxPerUserPerDay: 100,
  },
  {
    id: "5", name: "MH Face Swap", slug: "mh-face-swap", provider: "magichour",
    providerModelId: "face-swap", providerCost: 0.10,
    baseCreditCost: 2, hdCreditCost: 2, ultraCreditCost: 2,
    supportsTextToImage: false, supportsImageEditing: false, supportsVideo: false,
    maxResolution: "N/A", isEnabled: true, isDefault: false,
    callsToday: 620, maxPerDay: 5000, maxPerUserPerDay: 20,
  },
  {
    id: "6", name: "MH Headshot", slug: "mh-headshot", provider: "magichour",
    providerModelId: "ai-headshot", providerCost: 0.15,
    baseCreditCost: 2, hdCreditCost: 2, ultraCreditCost: 2,
    supportsTextToImage: false, supportsImageEditing: false, supportsVideo: false,
    maxResolution: "N/A", isEnabled: true, isDefault: false,
    callsToday: 340, maxPerDay: 3000, maxPerUserPerDay: 10,
  },
  {
    id: "7", name: "MH Text2Video", slug: "mh-text2video", provider: "magichour",
    providerModelId: "text-to-video", providerCost: 0.50,
    baseCreditCost: 5, hdCreditCost: 5, ultraCreditCost: 10,
    supportsTextToImage: false, supportsImageEditing: false, supportsVideo: true,
    maxResolution: "1080p", isEnabled: true, isDefault: false,
    callsToday: 180, maxPerDay: 1000, maxPerUserPerDay: 5,
  },
  {
    id: "8", name: "MH Lip Sync", slug: "mh-lipsync", provider: "magichour",
    providerModelId: "lip-sync", providerCost: 0.40,
    baseCreditCost: 5, hdCreditCost: 5, ultraCreditCost: 5,
    supportsTextToImage: false, supportsImageEditing: false, supportsVideo: true,
    maxResolution: "1080p", isEnabled: true, isDefault: false,
    callsToday: 95, maxPerDay: 500, maxPerUserPerDay: 5,
  },
  {
    id: "9", name: "Real-ESRGAN 2x", slug: "esrgan-2x", provider: "replicate",
    providerModelId: "nightmareai/real-esrgan", providerCost: 0.005,
    baseCreditCost: 1, hdCreditCost: 1, ultraCreditCost: 1,
    supportsTextToImage: false, supportsImageEditing: false, supportsVideo: false,
    maxResolution: "N/A", isEnabled: true, isDefault: false,
    callsToday: 510, maxPerDay: 10000, maxPerUserPerDay: 50,
  },
  {
    id: "10", name: "Real-ESRGAN 4x", slug: "esrgan-4x", provider: "replicate",
    providerModelId: "nightmareai/real-esrgan", providerCost: 0.008,
    baseCreditCost: 2, hdCreditCost: 2, ultraCreditCost: 2,
    supportsTextToImage: false, supportsImageEditing: false, supportsVideo: false,
    maxResolution: "N/A", isEnabled: true, isDefault: false,
    callsToday: 380, maxPerDay: 10000, maxPerUserPerDay: 50,
  },
  {
    id: "11", name: "RemBG Precision", slug: "rembg", provider: "replicate",
    providerModelId: "lucataco/remove-bg", providerCost: 0.002,
    baseCreditCost: 1, hdCreditCost: 1, ultraCreditCost: 1,
    supportsTextToImage: false, supportsImageEditing: false, supportsVideo: false,
    maxResolution: "N/A", isEnabled: true, isDefault: false,
    callsToday: 720, maxPerDay: 20000, maxPerUserPerDay: 100,
  },
];

const providerColors: Record<string, { bg: string; text: string; border: string }> = {
  gemini: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  imagen: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
  magichour: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  replicate: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
};

export function SuperAdminModels() {
  const [models, setModels] = useState(MOCK_MODELS);
  const [filterProvider, setFilterProvider] = useState("all");

  const toggleModel = (id: string) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isEnabled: !m.isEnabled } : m))
    );
  };

  const filteredModels = filterProvider === "all"
    ? models
    : models.filter((m) => m.provider === filterProvider);

  const totalCostToday = models.reduce((sum, m) => sum + m.callsToday * m.providerCost, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="AI Models | Super Admin | Zemplate.ai"
        description="Configure AI model providers, pricing, and rate limits."
      />
      <Navbar />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Admin Sidebar */}
        <aside className="w-64 hidden lg:flex flex-col border-r border-white/10 bg-surface/50 p-6 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Super Admin</h3>
              <p className="text-white/40 text-xs">Zemplate.ai</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {ADMIN_SIDEBAR_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                  link.active
                    ? "bg-primary/10 text-primary"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <link.icon className={`w-5 h-5 ${link.active ? "text-primary" : "text-white/40"}`} />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-1">
            <Link
              to="/dashboard"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all active:scale-95"
            >
              <Settings className="w-5 h-5 text-white/40" />
              User Dashboard
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all active:scale-95">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">AI Models</h1>
              <p className="text-white/60">Configure providers, pricing, rate limits, and enable/disable models.</p>
            </div>

            {/* Cost Overview */}
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
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider">API Calls Today</p>
                <p className="text-2xl font-bold text-white mt-1">{models.reduce((s, m) => s + m.callsToday, 0).toLocaleString()}</p>
              </div>
              <div className="bg-surface border border-white/10 rounded-xl p-4">
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider">API Cost Today</p>
                <p className="text-2xl font-bold text-white mt-1">
                  <span className="text-white/50 text-lg">$</span>{totalCostToday.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Provider Filters */}
            <div className="flex gap-3 flex-wrap">
              {["all", "gemini", "imagen", "magichour", "replicate"].map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterProvider(p)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterProvider === p
                      ? "bg-primary text-white"
                      : "bg-surface border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                  }`}
                >
                  {p === "all" ? "All Providers" : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>

            {/* Models Grid */}
            <div className="grid gap-4">
              {filteredModels.map((model, i) => {
                const pColor = providerColors[model.provider] || providerColors.gemini;
                const usagePercent = Math.round((model.callsToday / model.maxPerDay) * 100);

                return (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`bg-surface border rounded-2xl p-6 transition-all ${
                      model.isEnabled ? "border-white/10" : "border-white/5 opacity-60"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Model Info */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={`w-12 h-12 rounded-xl ${pColor.bg} flex items-center justify-center shrink-0`}>
                          <Cpu className={`w-6 h-6 ${pColor.text}`} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-white font-bold">{model.name}</h3>
                            {model.isDefault && (
                              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase">Default</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full ${pColor.bg} ${pColor.text} border ${pColor.border} text-[10px] font-medium uppercase`}>
                              {model.provider}
                            </span>
                            <span className="text-white/40 text-xs font-mono">{model.providerModelId}</span>
                          </div>
                        </div>
                      </div>

                      {/* Toggle */}
                      <button
                        onClick={() => toggleModel(model.id)}
                        className="shrink-0"
                        title={model.isEnabled ? "Disable model" : "Enable model"}
                      >
                        {model.isEnabled ? (
                          <ToggleRight className="w-10 h-10 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="w-10 h-10 text-white/30" />
                        )}
                      </button>
                    </div>

                    {/* Details Row */}
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
                        <p className="text-white/40 text-xs mb-1">Usage Today</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-white/5 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                usagePercent > 80 ? "bg-red-400" : usagePercent > 50 ? "bg-yellow-400" : "bg-emerald-400"
                              }`}
                              style={{ width: `${Math.min(usagePercent, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-white/50 text-xs">{usagePercent}%</span>
                        </div>
                        <p className="text-white/30 text-[10px] mt-0.5">{model.callsToday.toLocaleString()} / {model.maxPerDay.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {model.supportsTextToImage && (
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-medium">Text-to-Image</span>
                      )}
                      {model.supportsImageEditing && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">Image Editing</span>
                      )}
                      {model.supportsVideo && (
                        <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-medium">Video</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
