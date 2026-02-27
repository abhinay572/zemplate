import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TemplateCard } from "@/components/home/TemplateCard";
import { MOCK_TEMPLATES } from "@/data/mockData";
import { ArrowRight, Filter, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

const SkeletonCard = ({ height }: { height: string }) => (
  <div className="rounded-2xl bg-surface border border-white/5 overflow-hidden animate-pulse">
    <div className={`w-full ${height} bg-white/5`}></div>
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
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [category]);

  // Format category name from URL slug (e.g., "instagram-posts" -> "Instagram Posts")
  const formattedCategory = category 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "All Templates";

  // Filter templates (mock logic)
  const categoryTemplates = MOCK_TEMPLATES.filter(t => 
    category ? t.category.toLowerCase().includes(category.split('-')[0].toLowerCase()) : true
  );

  // If no exact match, just show all for demo purposes
  const displayTemplates = categoryTemplates.length > 0 ? categoryTemplates : MOCK_TEMPLATES;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title={`Best AI ${formattedCategory} Templates | Zemplate.ai`}
        description={`Create stunning, professional ${formattedCategory.toLowerCase()} in seconds. No prompting skills required. Just select a template, customize, and generate.`}
        canonical={`https://zemplate.ai/templates/${category || ''}`}
      />
      <Navbar />
      
      {/* SEO Header */}
      <div className="bg-surface border-b border-white/5 py-12 md:py-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto mb-8">
            <Breadcrumbs items={[
              { label: "Templates", href: "/templates" },
              { label: formattedCategory, href: `/templates/${category}` }
            ]} />
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4 bg-primary/10 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            500+ AI Templates
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Best AI {formattedCategory} Templates
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Create stunning, professional {formattedCategory.toLowerCase()} in seconds. No prompting skills required. Just select a template, customize, and generate.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="bg-gradient-primary text-white px-8 py-3.5 rounded-full font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              Start Creating Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium whitespace-nowrap">All</button>
            <button className="px-4 py-2 rounded-full bg-surface border border-white/10 text-white/70 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">Trending</button>
            <button className="px-4 py-2 rounded-full bg-surface border border-white/10 text-white/70 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">Newest</button>
            <button className="px-4 py-2 rounded-full bg-surface border border-white/10 text-white/70 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">Most Used</button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-colors">
              Sort by: Popular
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="break-inside-avoid">
                <SkeletonCard height={i % 2 === 0 ? "h-[300px]" : "h-[200px]"} />
              </div>
            ))
          ) : (
            <>
              {displayTemplates.map((template, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  key={template.id} 
                  className="break-inside-avoid"
                >
                  <TemplateCard {...template} />
                </motion.div>
              ))}
              {/* Duplicate for visual bulk in category pages */}
              {displayTemplates.map((template, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i + displayTemplates.length) * 0.05 }}
                  key={`${template.id}-dup`} 
                  className="break-inside-avoid"
                >
                  <TemplateCard {...template} id={`${template.id}-dup`} />
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* SEO Content Section at bottom */}
        <div className="mt-24 max-w-4xl mx-auto bg-surface border border-white/5 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
            Why use Zemplate for {formattedCategory}?
          </h2>
          <div className="space-y-6 text-white/70">
            <p>
              Creating high-quality {formattedCategory.toLowerCase()} traditionally requires expensive software, hours of learning, or hiring professional designers. With Zemplate.ai, you can generate stunning visuals in seconds using our pre-engineered AI templates.
            </p>
            <h3 className="text-xl font-bold text-white mt-8 mb-4">How it works</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Select a template:</strong> Browse our curated library of {formattedCategory.toLowerCase()} templates.</li>
              <li><strong>Customize:</strong> Adjust aspect ratios, styles, and resolutions to fit your needs.</li>
              <li><strong>Generate:</strong> Click "Try Template" and let our advanced AI models do the heavy lifting. The complex prompting is completely hidden from you.</li>
              <li><strong>Download:</strong> Get your high-resolution image ready for use.</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
