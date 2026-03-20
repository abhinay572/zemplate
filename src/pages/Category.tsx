import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TemplateCard } from "@/components/home/TemplateCard";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getPublicTemplates, type PublicTemplate } from "@/lib/firestore/templates";

// Map URL slugs to DB category names
const SLUG_TO_CATEGORY: Record<string, string> = {
  "trending": "",
  "new": "",
  "baby-photography": "Baby Photography",
  "family-photoshoot": "Family Photoshoot",
  "model-portfolio": "Model Portfolio",
  "wedding-photography": "Wedding Photography",
  "professional-headshot": "Professional Headshot",
  "couple-photography": "Couple Photography",
  "maternity-photography": "Maternity Photography",
  "portrait": "Portrait",
};

const SkeletonCard = () => (
  <div className="rounded-2xl bg-surface border border-white/5 overflow-hidden animate-pulse">
    <div className="w-full aspect-[3/4] bg-white/5"></div>
    <div className="p-4 space-y-3">
      <div className="w-3/4 h-4 bg-white/10 rounded-full"></div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/10"></div>
        <div className="w-1/2 h-3 bg-white/10 rounded-full"></div>
      </div>
    </div>
  </div>
);

export function Category() {
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [templates, setTemplates] = useState<PublicTemplate[]>([]);
  const [sortBy, setSortBy] = useState<"usageCount" | "createdAt" | "likesCount">(
    category === "new" ? "createdAt" : "usageCount"
  );

  // Format category name from URL slug
  const formattedCategory = category
    ? SLUG_TO_CATEGORY[category] || category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "All Templates";

  useEffect(() => {
    setIsLoading(true);
    const dbCategory = category ? SLUG_TO_CATEGORY[category] : undefined;
    const sort = category === "new" ? "createdAt" : category === "trending" ? "usageCount" : sortBy;

    getPublicTemplates({
      category: dbCategory || undefined,
      limitCount: 40,
      sortBy: sort,
    })
      .then(({ templates: t }) => setTemplates(t))
      .catch(() => setTemplates([]))
      .finally(() => setIsLoading(false));
  }, [category, sortBy]);

  const displayName = formattedCategory || "All Templates";

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title={`Best AI ${displayName} Templates | Zemplate.ai`}
        description={`Create stunning, professional ${displayName.toLowerCase()} images in seconds. No prompting skills required. Just select a template, customize, and generate.`}
        canonical={`https://zemplate.ai/templates/${category || ''}`}
      />
      <Navbar />

      {/* SEO Header */}
      <div className="bg-surface border-b border-white/5 py-12 md:py-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto mb-8">
            <Breadcrumbs items={[
              { label: "Templates", href: "/" },
              { label: displayName, href: `/templates/${category}` }
            ]} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            {displayName} Templates
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Create stunning {displayName.toLowerCase()} images in seconds. Upload your photo, select a template, and let AI do the rest.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/" className="bg-gradient-primary text-white px-8 py-3.5 rounded-full font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              Browse All Templates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-12">
        {/* Sort Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 hide-scrollbar">
          {(["usageCount", "createdAt", "likesCount"] as const).map((s) => {
            const labels: Record<string, string> = { usageCount: "Most Popular", createdAt: "Newest", likesCount: "Most Liked" };
            return (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  sortBy === s
                    ? "bg-white/10 text-white"
                    : "bg-surface border border-white/10 text-white/70 hover:text-white"
                }`}
              >
                {labels[s]}
              </button>
            );
          })}
        </div>

        {/* Grid — uniform layout matching home page */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : templates.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-white/50 text-lg mb-4">No templates found in this category yet.</p>
              <Link to="/" className="text-primary hover:underline">Browse all templates</Link>
            </div>
          ) : (
            templates.map((t, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.5) }}
                key={t.id}
              >
                <TemplateCard
                  id={t.id}
                  title={t.title}
                  author={{ name: t.authorName || "Zemplate", avatar: t.authorAvatar || "https://picsum.photos/seed/z/100/100" }}
                  image={t.imageUrl}
                  likes={t.likesCount || 0}
                  uses={t.usageCount || 0}
                  cost={t.creditCost || 1}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* SEO Content Section */}
        <div className="mt-24 max-w-4xl mx-auto bg-surface border border-white/5 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
            Why use Zemplate for {displayName}?
          </h2>
          <div className="space-y-6 text-white/70">
            <p>
              Creating high-quality {displayName.toLowerCase()} images traditionally requires expensive software, hours of learning, or hiring professional photographers. With Zemplate.ai, you can generate stunning visuals in seconds using our pre-engineered AI templates.
            </p>
            <p>
              Simply upload your photo, choose a template style, and let our advanced AI transform your image. The complex prompting is completely hidden — you get professional results with zero effort.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
