import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, Eye, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getPostBySlug, getRelatedPosts, incrementPostViews, type BlogPost as BlogPostType } from "@/lib/firestore/blog";

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [related, setRelated] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug)
      .then((p) => {
        setPost(p);
        if (p) {
          incrementPostViews(slug);
          getRelatedPosts(p.category, slug).then(setRelated);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col pt-16">
        <Navbar />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/5 rounded w-3/4" />
            <div className="h-4 bg-white/5 rounded w-1/2" />
            <div className="h-64 bg-white/5 rounded-2xl" />
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-white/5 rounded" style={{ width: `${80 + Math.random() * 20}%` }} />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col pt-16">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl font-display font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-white/60 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    author: { "@type": "Person", name: post.authorName },
    publisher: {
      "@type": "Organization",
      name: "Zemplate.ai",
      logo: { "@type": "ImageObject", url: "https://zemplate.ai/favicon.svg" },
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `https://zemplate.ai/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        keywords={post.metaKeywords}
        canonical={`https://zemplate.ai/blog/${post.slug}`}
        type="article"
        image={post.imageUrl || undefined}
        jsonLd={[articleSchema]}
      />
      <Navbar />
      <main className="flex-1 w-full">
        <article className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <Breadcrumbs items={breadcrumbs} />

          {/* Header */}
          <header className="mb-8 md:mb-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
              <span className="text-white/40 text-sm flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="text-white/40 text-sm flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime} min read</span>
              <span className="text-white/40 text-sm flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views} views</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-4">{post.title}</h1>
            <p className="text-lg text-white/60">{post.excerpt}</p>
          </header>

          {/* Hero Image */}
          {post.imageUrl && (
            <div className="rounded-2xl overflow-hidden mb-8 md:mb-12 border border-white/10">
              <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
            </div>
          )}

          {/* Content — rendered as HTML from markdown */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:text-white
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-li:text-white/80
              prose-blockquote:border-primary/50 prose-blockquote:text-white/70
              prose-code:text-primary prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-img:rounded-xl prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-2">
              <Tag className="w-4 h-4 text-white/40 mt-1" />
              {post.tags.map((tag) => (
                <span key={tag} className="bg-white/5 text-white/60 text-sm px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          )}

          {/* Author */}
          <div className="mt-8 bg-surface border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <img src={post.authorAvatar} alt={post.authorName} className="w-12 h-12 rounded-full" />
            <div>
              <p className="text-white font-medium">{post.authorName}</p>
              <p className="text-white/50 text-sm">AI-powered content by Zemplate.ai</p>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 md:px-6 pb-12">
            <h2 className="text-2xl font-display font-bold text-white mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all">
                  {r.imageUrl && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={r.imageUrl} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-primary text-xs font-semibold">{r.category}</span>
                    <h3 className="text-white font-bold mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
                    <p className="text-white/50 text-sm line-clamp-2">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
