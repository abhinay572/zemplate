import { cn } from "@/lib/utils";
import { Flame, Sparkles, User, Image as ImageIcon, Camera, Palette, Briefcase, Utensils, Shirt, Home, Smartphone, Heart, Gamepad2, Music, BookOpen, Dog, Dumbbell, Plane, Calendar, Cpu, Box, Lightbulb, Youtube, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { name: "Trending", icon: Flame, active: true, slug: "trending" },
  { name: "New", icon: Sparkles, slug: "new" },
  { name: "Portrait", icon: User, slug: "portrait" },
  { name: "Landscape", icon: ImageIcon, slug: "landscape" },
  { name: "Instagram", icon: Camera, slug: "instagram" },
  { name: "Art & Illustration", icon: Palette, slug: "art-illustration" },
  { name: "Business & Marketing", icon: Briefcase, slug: "business-marketing" },
  { name: "Food & Restaurant", icon: Utensils, slug: "food-restaurant" },
  { name: "Fashion & Beauty", icon: Shirt, slug: "fashion-beauty" },
  { name: "Real Estate", icon: Home, slug: "real-estate" },
  { name: "Social Media", icon: Smartphone, slug: "social-media" },
  { name: "Wedding", icon: Heart, slug: "wedding" },
  { name: "Gaming", icon: Gamepad2, slug: "gaming" },
  { name: "Music & Album Art", icon: Music, slug: "music-album-art" },
  { name: "Education", icon: BookOpen, slug: "education" },
  { name: "Pets & Animals", icon: Dog, slug: "pets-animals" },
  { name: "Fitness", icon: Dumbbell, slug: "fitness" },
  { name: "Travel", icon: Plane, slug: "travel" },
  { name: "Seasonal/Holiday", icon: Calendar, slug: "seasonal-holiday" },
  { name: "Sci-Fi & Fantasy", icon: Cpu, slug: "sci-fi-fantasy" },
  { name: "Product Photography", icon: Box, slug: "product-photography" },
  { name: "Motivational/Quotes", icon: Lightbulb, slug: "motivational-quotes" },
  { name: "YouTube Thumbnails", icon: Youtube, slug: "youtube-thumbnails" },
  { name: "Blog & Article Headers", icon: FileText, slug: "blog-article-headers" },
];

export function CategoryFilter() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 mb-8 relative">
      {/* Fade edges for scroll */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden"></div>
      
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
        {CATEGORIES.map((category) => (
          <Link
            key={category.name}
            to={`/templates/${category.slug}`}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 snap-start shrink-0 border",
              category.active
                ? "bg-gradient-primary text-white border-transparent shadow-[0_4px_15px_rgba(236,72,153,0.3)] scale-105"
                : "bg-surface text-white/70 border-white/10 hover:bg-white/5 hover:text-white hover:border-white/20"
            )}
          >
            <category.icon className={cn("w-4 h-4", category.active ? "text-white" : "text-white/50")} />
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
