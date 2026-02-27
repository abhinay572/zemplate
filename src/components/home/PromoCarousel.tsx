import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Instagram, Sparkles, Zap, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    id: 1,
    title: "🎁 Tag @zemplate.ai on Instagram → Get 10 FREE Credits!",
    description: "Share your creations and get rewarded instantly.",
    cta: "Learn How",
    icon: Instagram,
    image: "https://picsum.photos/seed/promo1/800/400",
    gradient: "from-pink-500 to-orange-400",
  },
  {
    id: 2,
    title: "New: AI Face Swap is here — Try it now!",
    description: "Seamlessly swap faces in seconds with our new AI model.",
    cta: "Try Face Swap",
    icon: Sparkles,
    image: "https://picsum.photos/seed/promo2/800/400",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: 3,
    title: "Zemplate Pro: Unlimited generations for ₹499/month",
    description: "Unlock all premium features, faster generation, and commercial rights.",
    cta: "Upgrade to Pro",
    icon: Zap,
    image: "https://picsum.photos/seed/promo3/800/400",
    gradient: "from-blue-600 to-purple-600",
  },
  {
    id: 4,
    title: "Join 50K+ creators on Zemplate Community",
    description: "Share prompts, get inspired, and learn from top creators.",
    cta: "Join Community",
    icon: Users,
    image: "https://picsum.photos/seed/promo4/800/400",
    gradient: "from-emerald-500 to-teal-400",
  },
];

export function PromoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 py-8 relative group">
      <div className="overflow-hidden rounded-2xl md:rounded-3xl relative" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
              <div className={cn(
                "relative h-[280px] md:h-[320px] w-full overflow-hidden bg-gradient-to-r",
                slide.gradient
              )}>
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 right-0 md:left-1/3 z-0">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover opacity-80 mix-blend-overlay md:mix-blend-normal md:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent md:hidden"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 hidden md:block"></div>
                  <div className={cn("absolute inset-0 bg-gradient-to-r hidden md:block", slide.gradient, "opacity-90 mix-blend-multiply")}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                    <slide.icon className="w-4 h-4" />
                    Featured
                  </div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4 drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base lg:text-lg mb-6 max-w-xl drop-shadow">
                    {slide.description}
                  </p>
                  <button className="bg-white text-black hover:bg-white/90 transition-colors px-6 py-3 rounded-xl font-semibold text-sm md:text-base w-fit shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 duration-200">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={scrollPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === selectedIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  );
}
