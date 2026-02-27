import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Mastering AI Portrait Generation: A Complete Guide",
    excerpt: "Learn how to use our new portrait templates to create stunning, photorealistic headshots in seconds.",
    category: "Tutorial",
    date: "Oct 24, 2023",
    readTime: "5 min read",
    image: "https://picsum.photos/seed/b1/800/400",
    author: { name: "Alex Chen", avatar: "https://picsum.photos/seed/a1/100/100" }
  },
  {
    id: 2,
    title: "Introducing Zemplate Pro: Unlimited Generations",
    excerpt: "We're thrilled to announce our new Pro tier, giving creators unlimited access to all our premium AI models.",
    category: "Product News",
    date: "Oct 20, 2023",
    readTime: "3 min read",
    image: "https://picsum.photos/seed/b2/800/400",
    author: { name: "Sarah Jenkins", avatar: "https://picsum.photos/seed/a2/100/100" }
  },
  {
    id: 3,
    title: "10 AI Prompts for Stunning Product Photography",
    excerpt: "Stop spending thousands on photoshoots. Use these 10 templates to generate perfect product shots.",
    category: "Inspiration",
    date: "Oct 15, 2023",
    readTime: "7 min read",
    image: "https://picsum.photos/seed/b3/800/400",
    author: { name: "David Kim", avatar: "https://picsum.photos/seed/a3/100/100" }
  },
  {
    id: 4,
    title: "How AI is Changing the Graphic Design Industry",
    excerpt: "An in-depth look at how tools like Zemplate are empowering non-designers to create professional assets.",
    category: "Industry",
    date: "Oct 10, 2023",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/b4/800/400",
    author: { name: "Emma Watson", avatar: "https://picsum.photos/seed/a4/100/100" }
  }
];

export function Blog() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title="Blog - AI Image Generation Tutorials & News | Zemplate.ai"
        description="Latest news, tutorials, and insights from the Zemplate.ai team. Learn how to make the most of AI image generation."
        canonical="https://zemplate.ai/blog"
      />
      <Navbar />
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="mb-8 max-w-3xl mx-auto">
          <Breadcrumbs items={[
            { label: "Blog", href: "/blog" }
          ]} />
        </div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Zemplate Blog
          </h1>
          <p className="text-white/60 text-lg md:text-xl">
            Latest news, tutorials, and insights from the Zemplate.ai team. Learn how to make the most of AI.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="group relative rounded-3xl overflow-hidden bg-surface border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <img 
                  src={BLOG_POSTS[0].image} 
                  alt={BLOG_POSTS[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {BLOG_POSTS[0].category}
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {BLOG_POSTS[0].date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {BLOG_POSTS[0].readTime}
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {BLOG_POSTS[0].title}
                </h2>
                <p className="text-white/70 text-lg mb-8 line-clamp-3">
                  {BLOG_POSTS[0].excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <img src={BLOG_POSTS[0].author.avatar} alt={BLOG_POSTS[0].author.name} className="w-10 h-10 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
                    <span className="font-medium text-white/90">{BLOG_POSTS[0].author.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post) => (
            <div key={post.id} className="group relative rounded-2xl overflow-hidden bg-surface border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-white/60 text-sm mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
                    <span className="text-sm font-medium text-white/80">{post.author.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
