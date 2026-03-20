import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TemplateCard } from "@/components/home/TemplateCard";
import { Users, Trophy, Flame, Star } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PullToRefresh } from "@/components/ui/PullToRefresh";
import { useState, useEffect } from "react";
import { getCommunityPosts, type CommunityPost } from "@/lib/firestore/community";

const TOP_CREATORS: any[] = [];

const FALLBACK_TEMPLATES: any[] = [];

export function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommunityPosts({ limitCount: 20 })
      .then(({ posts: p }) => setPosts(p))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleRefresh = async () => {
    const { posts: refreshed } = await getCommunityPosts({ limitCount: 20 });
    setPosts(refreshed);
  };

  // Map community posts to TemplateCard props, fallback to hardcoded if empty
  const templates = posts.length > 0
    ? posts.map((p) => ({
        id: p.id!,
        title: p.title || "Community Post",
        author: { name: p.authorName || "Creator", avatar: p.authorAvatar || "https://picsum.photos/seed/z/100/100" },
        image: p.imageUrl,
        likes: p.likesCount || 0,
        uses: 0,
        aspectRatio: "portrait" as const,
        cost: 0,
      }))
    : FALLBACK_TEMPLATES;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Community & Top Creators | Zemplate.ai"
        description="Join the Zemplate.ai community. Discover top creators, trending templates, and share your own AI image generations."
        canonical="https://zemplate.ai/community"
      />
      <Navbar />
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: "Community", href: "/community" }]} />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Community Hub</h1>
              <p className="text-white/60 text-lg">Join 50K+ creators. Discover trending templates, follow top creators, and share your own masterpieces.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-surface border border-white/10 px-4 py-2 rounded-full">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-white">Community</span>
              </div>
              <button className="bg-gradient-primary text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all">Share Template</button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="w-5 h-5 text-tertiary" />
                <h2 className="text-2xl font-display font-semibold text-white">Trending This Week</h2>
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="break-inside-avoid aspect-[3/4] rounded-2xl bg-surface border border-white/5 animate-pulse" />
                  ))
                ) : templates.length === 0 ? (
                  <div className="col-span-full text-center py-20">
                    <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/50 text-lg mb-2">Community posts coming soon!</p>
                    <p className="text-white/30 text-sm">Be the first to share your AI creations.</p>
                  </div>
                ) : (
                  templates.map((template) => (
                    <div key={template.id} className="break-inside-avoid">
                      <TemplateCard {...template} />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-surface border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-xl font-display font-semibold text-white">Top Creators</h3>
                </div>
                <div className="text-center py-6">
                  <p className="text-white/40 text-sm">Creator leaderboard coming soon!</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PullToRefresh>
      <Footer />
    </div>
  );
}
