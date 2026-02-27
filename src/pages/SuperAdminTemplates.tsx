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
  Plus,
  Upload,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  MoreVertical,
  X,
  Shield,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "@/components/seo/SEO";

const ADMIN_SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: "Overview", href: "/super-admin" },
  { icon: ImageIcon, label: "Templates", href: "/super-admin/templates", active: true },
  { icon: Cpu, label: "AI Models", href: "/super-admin/models" },
  { icon: Users, label: "Users", href: "/super-admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/super-admin/analytics" },
];

const CATEGORIES = [
  "All",
  "Sci-Fi & Fantasy",
  "Product Photography",
  "Portrait",
  "Instagram",
  "Art & Illustration",
  "YouTube Thumbnails",
  "Food & Restaurant",
  "Real Estate",
  "Fitness",
  "Logo",
  "Business",
];

const MOCK_ADMIN_TEMPLATES = [
  {
    id: "1",
    title: "Cyberpunk Neon Cityscape",
    category: "Sci-Fi & Fantasy",
    hiddenPrompt: "A sprawling cyberpunk cityscape at night, neon lights reflecting on wet streets, flying cars, holographic billboards, ultra-detailed 8K, cinematic lighting, blade runner style",
    model: "Nano Banana",
    creditCost: 2,
    uses: 45000,
    status: "published",
    image: "https://picsum.photos/seed/t1/300/300",
    aspectRatio: "portrait",
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Minimalist Product Mockup",
    category: "Product Photography",
    hiddenPrompt: "Clean minimalist product mockup on white marble surface, soft studio lighting, shadow play, professional product photography, 4K, commercial quality",
    model: "Imagen 3",
    creditCost: 1,
    uses: 21000,
    status: "published",
    image: "https://picsum.photos/seed/t2/300/300",
    aspectRatio: "landscape",
    createdAt: "2023-10-12",
  },
  {
    id: "3",
    title: "Ethereal Fantasy Portrait",
    category: "Portrait",
    hiddenPrompt: "Ethereal fantasy portrait of a person with glowing magical elements, soft dreamy lighting, flowing hair with sparkles, mystical forest background, enchanted atmosphere, 8K ultra detailed",
    model: "Nano Banana Pro",
    creditCost: 3,
    uses: 52000,
    status: "published",
    image: "https://picsum.photos/seed/t3/300/300",
    aspectRatio: "portrait",
    createdAt: "2023-10-10",
  },
  {
    id: "4",
    title: "Vintage Film Photography",
    category: "Instagram",
    hiddenPrompt: "Vintage 35mm film photography, warm golden tones, film grain, nostalgic atmosphere, soft focus, Kodak Portra 400 color palette, golden hour lighting",
    model: "Nano Banana",
    creditCost: 1,
    uses: 12000,
    status: "published",
    image: "https://picsum.photos/seed/t4/300/300",
    aspectRatio: "square",
    createdAt: "2023-10-08",
  },
  {
    id: "5",
    title: "Anime Style Character",
    category: "Art & Illustration",
    hiddenPrompt: "Anime style character illustration, vibrant colors, detailed eyes with reflections, dynamic pose, manga-inspired, clean lineart, professional illustration, studio quality",
    model: "Nano Banana",
    creditCost: 2,
    uses: 89000,
    status: "published",
    image: "https://picsum.photos/seed/t7/300/300",
    aspectRatio: "portrait",
    createdAt: "2023-10-05",
  },
  {
    id: "6",
    title: "Corporate Headshot Pro",
    category: "Portrait",
    hiddenPrompt: "Professional corporate headshot, studio lighting on neutral gray background, confident and professional expression, sharp focus, commercial portrait quality, LinkedIn ready",
    model: "Nano Banana Pro",
    creditCost: 3,
    uses: 15000,
    status: "draft",
    image: "https://picsum.photos/seed/t8/300/300",
    aspectRatio: "square",
    createdAt: "2023-10-01",
  },
];

interface UploadFormData {
  title: string;
  category: string;
  hiddenPrompt: string;
  model: string;
  creditCost: number;
  aspectRatio: string;
  tags: string;
}

export function SuperAdminTemplates() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [revealedPrompts, setRevealedPrompts] = useState<Set<string>>(new Set());
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<UploadFormData>({
    title: "",
    category: "",
    hiddenPrompt: "",
    model: "nano-banana",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: "",
  });

  const togglePromptReveal = (id: string) => {
    setRevealedPrompts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const filteredTemplates = MOCK_ADMIN_TEMPLATES.filter((t) => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Manage Templates | Super Admin | Zemplate.ai"
        description="Upload and manage AI templates with hidden prompts."
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Templates</h1>
                <p className="text-white/60">Upload templates with hidden prompts. Users never see the prompt.</p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <Plus className="w-5 h-5" />
                Upload Template
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Templates", value: "524" },
                { label: "Published", value: "498" },
                { label: "Drafts", value: "26" },
                { label: "Total Uses", value: "1.2M" },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface border border-white/10 rounded-xl p-4">
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search templates by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
                />
              </div>
              <button className="px-4 py-3 rounded-xl bg-surface border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "bg-surface border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Templates Table */}
            <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Template</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Hidden Prompt</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Model</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Credits</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Uses</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Status</th>
                      <th className="p-4 text-xs font-medium text-white/60 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTemplates.map((template) => (
                      <tr key={template.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={template.image}
                              alt={template.title}
                              className="w-12 h-12 rounded-lg object-cover border border-white/10"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="text-white text-sm font-medium">{template.title}</p>
                              <p className="text-white/40 text-xs">{template.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 max-w-[300px]">
                          <div className="flex items-start gap-2">
                            <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                              {revealedPrompts.has(template.id)
                                ? template.hiddenPrompt
                                : "••••••••••••••••••••••••••••••"}
                            </p>
                            <button
                              onClick={() => togglePromptReveal(template.id)}
                              className="text-white/40 hover:text-white transition-colors shrink-0 mt-0.5"
                              title={revealedPrompts.has(template.id) ? "Hide prompt" : "Reveal prompt"}
                            >
                              {revealedPrompts.has(template.id) ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => navigator.clipboard.writeText(template.hiddenPrompt)}
                              className="text-white/40 hover:text-white transition-colors shrink-0 mt-0.5"
                              title="Copy prompt"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-white/70 text-sm">{template.model}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white text-sm font-medium">{template.creditCost}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white/70 text-sm">{template.uses.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              template.status === "published"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                template.status === "published" ? "bg-emerald-400" : "bg-yellow-400"
                              }`}
                            ></span>
                            {template.status === "published" ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-400/10 text-white/50 hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white">Upload New Template</h2>
                  <p className="text-white/50 text-sm mt-1">The hidden prompt will never be exposed to users.</p>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium text-white/80 block mb-2">Template Preview Image</label>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-primary/30 transition-colors">
                    {previewImage ? (
                      <div className="relative inline-block">
                        <img src={previewImage} alt="Preview" className="max-h-48 rounded-xl mx-auto" />
                        <button
                          onClick={() => setPreviewImage(null)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-white/30 mx-auto mb-3" />
                        <p className="text-white/60 text-sm mb-2">Drag & drop or click to upload</p>
                        <p className="text-white/30 text-xs">PNG, JPG, WebP up to 10MB</p>
                        <label className="mt-4 inline-block bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer">
                          Browse Files
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-white/80 block mb-2">Template Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Cyberpunk Neon Cityscape"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-white/80 block mb-2">Category</label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>

                {/* Hidden Prompt — The Key Feature */}
                <div>
                  <label className="text-sm font-medium text-white/80 block mb-2">
                    Hidden Prompt
                    <span className="text-primary ml-2 text-xs font-normal">(never visible to users)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write the detailed AI prompt that generates this template. This is stored server-side and never exposed to users..."
                    value={formData.hiddenPrompt}
                    onChange={(e) => setFormData({ ...formData, hiddenPrompt: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                  <p className="text-white/30 text-xs mt-1.5">
                    Tip: Be descriptive. Include style, lighting, camera angle, and quality keywords.
                  </p>
                </div>

                {/* Model & Cost */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white/80 block mb-2">AI Model</label>
                    <div className="relative">
                      <select
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="nano-banana">Nano Banana (Fast)</option>
                        <option value="nano-banana-pro">Nano Banana Pro (4K)</option>
                        <option value="nano-banana-2">Nano Banana 2 (New)</option>
                        <option value="imagen-3">Imagen 3 (Standard)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white/80 block mb-2">Credit Cost</label>
                    <div className="relative">
                      <select
                        value={formData.creditCost}
                        onChange={(e) => setFormData({ ...formData, creditCost: Number(e.target.value) })}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value={1}>1 Credit (Standard)</option>
                        <option value={2}>2 Credits (HD)</option>
                        <option value={3}>3 Credits (Ultra/4K)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="text-sm font-medium text-white/80 block mb-2">Aspect Ratio</label>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { value: "1:1", label: "Square" },
                      { value: "3:4", label: "Portrait" },
                      { value: "4:3", label: "Landscape" },
                      { value: "9:16", label: "Story" },
                      { value: "16:9", label: "Widescreen" },
                    ].map((ratio) => (
                      <button
                        key={ratio.value}
                        onClick={() => setFormData({ ...formData, aspectRatio: ratio.value })}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          formData.aspectRatio === ratio.value
                            ? "bg-primary text-white"
                            : "bg-background border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {ratio.label} ({ratio.value})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium text-white/80 block mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="cyberpunk, neon, city, night (comma-separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-5 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <div className="flex gap-3">
                  <button className="px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all text-sm font-medium">
                    Save as Draft
                  </button>
                  <button className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-medium shadow-lg shadow-primary/20">
                    Publish Template
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
