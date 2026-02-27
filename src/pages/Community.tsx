import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TemplateCard } from "@/components/home/TemplateCard";
import { Users, Trophy, Flame, Star } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PullToRefresh } from "@/components/ui/PullToRefresh";
import { useState } from "react";

const TOP_CREATORS = [
  { name: "Alex Chen", handle: "@alexc", avatar: "https://picsum.photos/seed/a1/100/100", followers: "12.4k", rank: 1 },
  { name: "Sarah Jenkins", handle: "@sarahj", avatar: "https://picsum.photos/seed/a2/100/100", followers: "8.9k", rank: 2 },
  { name: "David Kim", handle: "@dkim", avatar: "https://picsum.photos/seed/a3/100/100", followers: "7.2k", rank: 3 },
  { name: "Emma Watson", handle: "@emmaw", avatar: "https://picsum.photos/seed/a4/100/100", followers: "6.5k", rank: 4 },
];

const INITIAL_TEMPLATES = [
  {
    id: "c1",
    title: "Neon Cyberpunk Portrait",
    author: { name: "Alex Chen", avatar: "https://picsum.photos/seed/a1/100/100" },
    image: "https://picsum.photos/seed/c1/600/800",
    likes: 3400,
    uses: 12000,
    aspectRatio: "portrait" as const,
    cost: 1,
  },
  {
    id: "c2",
    title: "Minimalist Architecture",
    author: { name: "Sarah Jenkins", avatar: "https://picsum.photos/seed/a2/100/100" },
    image: "https://picsum.photos/seed/c2/800/600",
    likes: 2800,
    uses: 9500,
    aspectRatio: "landscape" as const,
    cost: 1,
  },
  {
    id: "c3",
    title: "Fantasy Character Concept",
    author: { name: "David Kim", avatar: "https://picsum.photos/seed/a3/100/100" },
    image: "https://picsum.photos/seed/c3/600/800",
    likes: 5600,
    uses: 18000,
    aspectRatio: "portrait" as const,
    cost: 2,
  },
  {
    id: "c4",
    title: "Vintage Film Look",
    author: { name: "Emma Watson", avatar: "https://picsum.photos/seed/a4/100/100" },
    image: "https://picsum.photos/seed/c4/600/600",
    likes: 1900,
    uses: 6200,
    aspectRatio: "square" as const,
    cost: 1,
  },
];

export function Community() {
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Shuffle templates to simulate new content
    setTemplates([...templates].sort(() => Math.random() - 0.5));
  };

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
            <Breadcrumbs items={[
              { label: "Community", href: "/community" }
            ]} />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Community Hub
              </h1>
              <p className="text-white/60 text-lg">
                Join 50K+ creators. Discover trending templates, follow top creators, and share your own masterpieces.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-surface border border-white/10 px-4 py-2 rounded-full">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-white">52,481 Members</span>
              </div>
              <button className="bg-gradient-primary text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all">
                Share Template
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content - Community Templates */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="w-5 h-5 text-tertiary" />
                <h2 className="text-2xl font-display font-semibold text-white">Trending This Week</h2>
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="break-inside-avoid">
                    <TemplateCard {...template} />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar - Top Creators */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-surface border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-xl font-display font-semibold text-white">Top Creators</h3>
                </div>
                <div className="space-y-4">
                  {TOP_CREATORS.map((creator) => (
                    <div key={creator.handle} className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={creator.avatar} alt={creator.name} className="w-10 h-10 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
                          {creator.rank === 1 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-surface">
                              <Star className="w-2 h-2 text-white fill-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{creator.name}</p>
                          <p className="text-xs text-white/50">{creator.handle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-white/80">{creator.followers}</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">Followers</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2 rounded-xl border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>
        </main>
      </PullToRefresh>
      <Footer />
    </div>
  );
}
