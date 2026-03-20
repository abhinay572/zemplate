import { cn } from "@/lib/utils";
import { Flame, Sparkles, User, Camera, Briefcase, Shirt, Heart, Dog, Dumbbell, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { name: "Trending", icon: Flame, active: true, slug: "trending" },
  { name: "New", icon: Sparkles, slug: "new" },
  { name: "Baby Photography", icon: Heart, slug: "baby-photography" },
  { name: "Family Photoshoot", icon: User, slug: "family-photoshoot" },
  { name: "Model Portfolio", icon: Shirt, slug: "model-portfolio" },
  { name: "Wedding Photography", icon: Heart, slug: "wedding-photography" },
  { name: "Professional Headshot", icon: Briefcase, slug: "professional-headshot" },
  { name: "Couple Photography", icon: Heart, slug: "couple-photography" },
  { name: "Maternity Photography", icon: Heart, slug: "maternity-photography" },
  { name: "Pet Photography", icon: Dog, slug: "pet-photography" },
  { name: "Event Photography", icon: Calendar, slug: "event-photography" },
  { name: "Portrait", icon: Camera, slug: "portrait" },
  { name: "Fitness", icon: Dumbbell, slug: "fitness" },
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
