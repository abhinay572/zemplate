import { TemplateCard } from "./TemplateCard";
import { MOCK_TEMPLATES } from "@/data/mockData";
import { Flame, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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

export function TemplateGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const trendingTemplates = MOCK_TEMPLATES.slice(0, 4);
  const regularTemplates = MOCK_TEMPLATES.slice(4);

  useEffect(() => {
    // Simulate network request
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 pb-24">
      {/* Trending Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-tertiary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Trending This Week
            </h2>
          </div>
          <Link to="/templates/trending" className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-1 group">
            See All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 hide-scrollbar snap-x snap-mandatory">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-[280px] md:w-[320px] shrink-0 snap-start">
                <SkeletonCard height="h-[280px]" />
              </div>
            ))
          ) : (
            trendingTemplates.map((template) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                key={template.id} 
                className="w-[280px] md:w-[320px] shrink-0 snap-start relative"
              >
                <div className="absolute -top-3 -right-3 z-10 bg-surface border border-white/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                  ↑ 340%
                </div>
                <TemplateCard {...template} />
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
          Discover Templates
        </h2>
      </div>
      
      {/* Masonry-style Grid using CSS Columns */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-6 space-y-4 md:space-y-6">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="break-inside-avoid">
              <SkeletonCard height={i % 2 === 0 ? "h-[300px]" : "h-[200px]"} />
            </div>
          ))
        ) : (
          regularTemplates.map((template, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              key={template.id} 
              className="break-inside-avoid"
            >
              <TemplateCard {...template} />
            </motion.div>
          ))
        )}
      </div>
      
      {/* Load More */}
      {!isLoading && (
        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 rounded-full bg-surface border border-white/10 text-white/90 font-medium hover:bg-white/5 hover:border-white/20 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95">
            Load More Templates
          </button>
        </div>
      )}
    </div>
  );
}
