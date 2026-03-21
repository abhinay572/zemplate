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
  "pet-photography": "Pet Photography",
  "event-photography": "Event Photography",
  "food-photography": "Food Photography",
  "real-estate": "Real Estate",
  "fitness-sports": "Fitness & Sports",
  "fashion-editorial": "Fashion Editorial",
  "travel-photography": "Travel Photography",
  "product-photography": "Product Photography",
  "social-media-content": "Social Media Content",
  "art-illustration": "Art & Illustration",
  "holiday-seasonal": "Holiday & Seasonal",
  "anime-fantasy": "Anime & Fantasy",
  "vintage-retro": "Vintage & Retro",
  "cinematic": "Cinematic",
};

// SEO metadata per category for programmatic SEO
const CATEGORY_SEO: Record<string, { keywords: string; description: string; faq: { q: string; a: string }[] }> = {
  "Baby Photography": {
    keywords: "AI baby photo, newborn photography templates, baby portrait generator, AI baby images, infant photo editor",
    description: "Transform your baby photos into professional newborn portraits with AI. Soft lighting, dreamy bokeh, and magazine-quality results in seconds.",
    faq: [
      { q: "Can I use AI to enhance my baby's photos?", a: "Yes! Zemplate's AI baby photography templates apply professional studio lighting, soft skin tones, and dreamy backgrounds to transform your snapshots into magazine-quality newborn portraits." },
      { q: "Are AI baby photo templates safe to use?", a: "Absolutely. Your photos are processed securely and never shared. The AI only applies style transformations like lighting and color grading." },
    ],
  },
  "Wedding Photography": {
    keywords: "AI wedding photos, wedding photography templates, wedding photo editor AI, bridal portrait generator, wedding album AI",
    description: "Create breathtaking wedding photos with AI. From romantic golden hour edits to dramatic black & white, transform your wedding memories into art.",
    faq: [
      { q: "How can AI improve my wedding photos?", a: "Zemplate's wedding templates apply professional color grading, cinematic lighting, and romantic tones to turn casual wedding snaps into stunning album-worthy images." },
      { q: "Can I use these for my wedding album?", a: "Yes! The high-resolution outputs are perfect for printing in wedding albums, framing, or sharing on social media." },
    ],
  },
  "Professional Headshot": {
    keywords: "AI headshot generator, professional headshot AI, LinkedIn photo AI, corporate headshot template, business portrait generator",
    description: "Generate polished, professional headshots for LinkedIn, corporate websites, and resumes. Studio-quality results from any selfie.",
    faq: [
      { q: "Can AI create a professional headshot from a selfie?", a: "Yes! Upload any clear photo of yourself and our AI will transform it with professional studio lighting, clean backgrounds, and corporate-ready styling." },
      { q: "Are AI headshots good enough for LinkedIn?", a: "Absolutely. Our headshot templates are specifically designed for LinkedIn and professional platforms with proper framing, lighting, and resolution." },
    ],
  },
  "Portrait": {
    keywords: "AI portrait generator, portrait photography AI, AI photo portrait, artistic portrait templates, portrait enhancement AI",
    description: "Create stunning AI-enhanced portraits with professional lighting, artistic styles, and editorial quality. From moody to vibrant, find your perfect look.",
    faq: [
      { q: "What styles of AI portraits can I create?", a: "We offer dozens of portrait styles including editorial, fine art, moody cinematic, vibrant color-pop, vintage film, anime-style, and many more." },
      { q: "Do I need photography skills?", a: "No! Just upload any clear photo and select a template. The AI handles all the complex lighting, color grading, and style transformations." },
    ],
  },
  "Couple Photography": {
    keywords: "AI couple photos, romantic photo templates, couple portrait AI, engagement photo generator, love photo editor AI",
    description: "Transform your couple photos into romantic masterpieces. Golden hour glow, intimate studio portraits, and cinematic love stories powered by AI.",
    faq: [
      { q: "Can AI make our couple photos look professional?", a: "Yes! Our couple photography templates apply romantic lighting, warm tones, and professional editing to transform casual photos into stunning couple portraits." },
    ],
  },
};

function getCategorySEO(name: string) {
  return CATEGORY_SEO[name] || {
    keywords: `AI ${name.toLowerCase()} templates, ${name.toLowerCase()} photo generator, AI ${name.toLowerCase()} images`,
    description: `Create stunning ${name.toLowerCase()} images in seconds with AI. Professional quality, no prompting required.`,
    faq: [],
  };
}

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
  const catSEO = getCategorySEO(formattedCategory);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${displayName} AI Templates`,
    description: catSEO.description,
    url: `https://zemplate.ai/templates/${category || ""}`,
    publisher: { "@type": "Organization", name: "Zemplate.ai" },
  };

  const faqSchema = catSEO.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: catSEO.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title={`Best AI ${displayName} Templates — Free to Try`}
        description={catSEO.description}
        keywords={catSEO.keywords}
        canonical={`https://zemplate.ai/templates/${category || ""}`}
        jsonLd={[collectionSchema, ...(faqSchema ? [faqSchema] : [])]}
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

        {/* FAQ Section — Programmatic SEO */}
        {catSEO.faq.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto bg-surface border border-white/5 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {catSEO.faq.map((f, i) => (
                <div key={i} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-bold text-white mb-3">{f.q}</h3>
                  <p className="text-white/60">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
