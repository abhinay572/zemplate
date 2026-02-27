import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Image,
  User,
  Scissors,
  ArrowUpRight,
  Video,
  PenTool,
  Box,
  MonitorPlay,
  PlaySquare,
  Palette,
  Smile,
  Layers,
} from "lucide-react";

const FEATURES = [
  { name: "AI Image Generator", icon: Image, href: "/tools/image-generator", active: true },
  { name: "AI Face Swap", icon: User, href: "/tools/face-swap" },
  { name: "AI Background Remover", icon: Scissors, href: "/tools/bg-remover" },
  { name: "AI Upscaler", icon: ArrowUpRight, href: "/tools/upscaler" },
  { name: "UGC Creator", icon: Video, href: "/tools/ugc" },
  { name: "AI Headshot", icon: PenTool, href: "/tools/headshot" },
  { name: "AI Product Photos", icon: Box, href: "/tools/product-photos" },
  { name: "Text to Video", icon: MonitorPlay, href: "/tools/text-to-video" },
  { name: "Image to Video", icon: PlaySquare, href: "/tools/image-to-video" },
  { name: "AI Logo Maker", icon: Palette, href: "/tools/logo-maker" },
  { name: "AI Avatar", icon: Smile, href: "/tools/avatar" },
  { name: "Batch Generator", icon: Layers, href: "/tools/batch" },
];

export function FeatureToolbar() {
  return (
    <div className="w-full border-b border-white/5 bg-surface/50 backdrop-blur-sm sticky top-16 z-40">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-3 hide-scrollbar snap-x snap-mandatory">
          {FEATURES.map((feature) => (
            <Link
              key={feature.name}
              to={feature.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 snap-start shrink-0 border",
                feature.active
                  ? "bg-gradient-primary text-white border-transparent shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                  : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
              )}
            >
              <feature.icon className="w-4 h-4" />
              {feature.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
