import { Navbar } from "@/components/layout/Navbar";
import { FeatureToolbar } from "@/components/layout/FeatureToolbar";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { CategoryFilter } from "@/components/home/CategoryFilter";
import { TemplateGrid } from "@/components/home/TemplateGrid";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { SEO } from "@/components/seo/SEO";
import { generateOrganizationSchema } from "@/components/seo/JsonLd";

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="inline-block min-h-[1.5em]">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title="AI Image Generator & Templates"
        description="Create stunning, professional AI images in seconds with Zemplate.ai. No prompting required. Just select a template and generate."
        canonical="https://zemplate.ai/"
        jsonLd={[generateOrganizationSchema()]}
      />
      <Navbar />
      <FeatureToolbar />
      <main className="flex-1 w-full flex flex-col">
        
        {/* Hero Section with Parallax */}
        <motion.div 
          className="relative w-full max-w-[1600px] mx-auto px-4 md:px-6 pt-16 pb-8 md:pt-24 md:pb-12 text-center overflow-hidden"
          style={{ y: y1, opacity }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-20">
            <div className="w-[800px] h-[800px] bg-gradient-primary rounded-full blur-[120px] mix-blend-screen"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground tracking-tight mb-6">
              Create Stunning AI Images<br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                In One Click
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto mb-10 font-medium">
              <TypewriterText text="No Prompting Skills Needed. Just select a template and generate." />
            </p>
          </div>
        </motion.div>

        <PromoCarousel />
        <CategoryFilter />
        <TemplateGrid />
      </main>
      <Footer />
    </div>
  );
}
