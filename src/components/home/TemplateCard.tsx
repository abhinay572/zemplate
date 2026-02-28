import { Heart, Play, Download, Maximize2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface TemplateCardProps {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  likes: number;
  uses: number;
  aspectRatio?: "portrait" | "landscape" | "square";
  cost?: number;
}

export function TemplateCard({ id, title, author, image, likes, uses, aspectRatio = "portrait", cost = 1 }: TemplateCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-surface border border-surface-border hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)] hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] focus-within:ring-2 focus-within:ring-primary">
      {/* Image Container */}
      <div className="relative w-full overflow-hidden bg-white/5 aspect-[3/4]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
          <div className="flex justify-end gap-2 transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300">
            <button aria-label="Like template" className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-pink-500 hover:bg-pink-500/20 hover:border-pink-500/50 transition-all active:scale-90 focus:outline-none focus:ring-2 focus:ring-white">
              <Heart className="w-4 h-4" />
            </button>
            <Link to={`/template/${id}`} aria-label="Expand template" className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all active:scale-90 focus:outline-none focus:ring-2 focus:ring-white">
              <Maximize2 className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-col items-center justify-center w-full transform translate-y-4 group-hover:translate-y-0 focus-within:translate-y-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 duration-300">
            <div className="text-white/60 text-xs mb-3 font-medium tracking-wide">
              Prompt hidden — Click Try to generate
            </div>
            <Link to={`/template/${id}`} className="bg-white text-black hover:bg-white/90 transition-all px-6 py-2.5 rounded-full font-semibold text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary hover:scale-105 active:scale-95">
              <Play className="w-4 h-4 fill-black" />
              Try Template
              <span className="flex items-center gap-1 bg-black/10 px-2 py-0.5 rounded-full text-xs ml-1">
                <Zap className="w-3 h-3 text-tertiary" />
                {cost}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground text-sm md:text-base line-clamp-1 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0 flex-1 mr-3">
            <img src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full object-cover border border-surface-border shrink-0" referrerPolicy="no-referrer" loading="lazy" />
            <span className="text-xs font-medium text-foreground-muted hover:text-foreground cursor-pointer transition-colors truncate">
              {author.name}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-foreground-muted shrink-0">
            <div className="flex items-center gap-1" aria-label={`${likes} likes`}>
              <Heart className="w-3 h-3 group-hover:text-pink-500/50 transition-colors" />
              {likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes}
            </div>
            <div className="flex items-center gap-1" aria-label={`${uses} uses`}>
              <Download className="w-3 h-3 group-hover:text-primary/50 transition-colors" />
              {uses >= 1000 ? `${(uses / 1000).toFixed(1)}k` : uses}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
