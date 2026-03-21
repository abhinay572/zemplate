import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPublishedPosts, getBlogCategories, type BlogPost } from "@/lib/firestore/blog";

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getPublishedPosts({ limitCount: 13, category: selectedCategory || undefined }),
      getBlogCategories(),
    ])
      .then(([result, cats]) => {
        setPosts(result.posts);
        setNextPage(result.lastPage);
        setCategories(cats);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);

  const loadMore = async () => {
    if (nextPage === null) return;
    const result = await getPublishedPosts({ limitCount: 12, lastPage: nextPage, category: selectedCategory || undefined });
    setPosts((prev) => [...prev, ...result.posts]);
    setNextPage(result.lastPage);
  };

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Blog — AI Image Generation Tutorials, Tips & Trends"
        description="Latest tutorials, AI photography tips, prompt guides, and industry insights from Zemplate.ai. Master AI image generation with expert guides."
        canonical="https://zemplate.ai/blog"
        keywords="AI image generation blog, AI photography tutorials, AI prompt guide, midjourney tips, AI art tutorials, Zemplate blog"
      />
      <Navbar />
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="mb-8 max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
        </div>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Zemplate Blog</h1>
          <p className="text-white/60 text-lg md:text-xl">
            Tutorials, prompt guides, AI photography tips, and the latest trends in AI image generation.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!selectedCategory ? "bg-primary text-white" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? "bg-primary text-white" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-surface border border-white/5 animate-pulse">
                <div className="h-48 bg-white/5 rounded-t-2xl" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-white/5 rounded w-1/3" />
                  <div className="h-6 bg-white/5 rounded w-3/4" />
                  <div className="h-4 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-display font-bold text-white/60 mb-4">No blog posts yet</h2>
            <p className="text-white/40">Check back soon for tutorials, tips, and AI image generation guides.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <div className="mb-16">
                <Link to={`/blog/${featured.slug}`} className="group relative rounded-3xl overflow-hidden bg-surface border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer block">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                      {featured.imageUrl ? (
                        <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-6xl font-display font-bold text-white/10">{featured.title.charAt(0)}</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {featured.category}
                      </div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
                        <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(featured.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</div>
                        <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featured.readTime} min read</div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                      <p className="text-white/70 text-lg mb-8 line-clamp-3">{featured.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <img src={featured.authorAvatar} alt={featured.authorName} className="w-10 h-10 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
                          <span className="font-medium text-white/90">{featured.authorName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-medium group-hover:translate-x-2 transition-transform">
                          Read Article <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="group relative rounded-2xl overflow-hidden bg-surface border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <span className="text-4xl font-display font-bold text-white/10">{post.title.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{post.category}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                      <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</div>
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min read</div>
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-white/60 text-sm mb-6 line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <img src={post.authorAvatar} alt={post.authorName} className="w-6 h-6 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
                        <span className="text-sm font-medium text-white/80">{post.authorName}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {nextPage !== null && (
              <div className="text-center mt-12">
                <button onClick={loadMore} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-xl font-medium transition-colors">
                  Load More Articles
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
