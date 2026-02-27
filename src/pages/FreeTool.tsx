import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Upload, Sparkles } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function FreeTool() {
  const { tool } = useParams();
  
  const toolName = tool 
    ? tool.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Free AI Tool";

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title={`Free ${toolName} Online | Zemplate.ai`}
        description={`Use our free AI ${toolName.toLowerCase()} tool. Fast, secure, and professional quality with no sign-up required.`}
        canonical={`https://zemplate.ai/free-tools/${tool}`}
      />
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-surface border-b border-white/5 py-12 md:py-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto mb-8">
            <Breadcrumbs items={[
              { label: "Free Tools", href: "/free-tools" },
              { label: toolName, href: `/free-tools/${tool}` }
            ]} />
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 mb-4 bg-emerald-400/10 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            100% Free Tool
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Free {toolName}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Instantly use our advanced AI {toolName.toLowerCase()} without signing up. Fast, secure, and professional quality.
          </p>
        </div>
      </div>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        
        {/* Workspace */}
        <div className="bg-surface border border-white/10 rounded-3xl p-8 md:p-16 flex flex-col items-center justify-center min-h-[400px] border-dashed mb-16">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-black/50">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 text-center">
            Upload Your Image
          </h2>
          <p className="text-white/60 text-center max-w-md mb-8">
            Drag and drop your image here, or click to browse files. Max file size: 10MB.
          </p>
          
          <button className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-colors flex items-center gap-3">
            <Upload className="w-5 h-5" />
            Browse Files
          </button>
        </div>

        {/* Content Section */}
        <div className="prose prose-invert prose-lg max-w-none text-white/80 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-6">
            Need more power? Try Zemplate Pro.
          </h2>
          <p>
            This free tool offers limited usage. Unlock unlimited generations, 4K resolution, batch processing, and access to our full library of 500+ premium AI templates with Zemplate Pro.
          </p>
          <div className="flex justify-center mt-8">
            <Link to="/pricing" className="bg-gradient-primary text-white px-8 py-3.5 rounded-full font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105 transition-all flex items-center gap-2">
              View Pricing Plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
