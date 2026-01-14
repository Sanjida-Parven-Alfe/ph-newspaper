import dbConnect from "@/lib/dbConnect";
import News from "@/models/News";
import BreakingNews from "@/components/home/BreakingNews";
import FeaturedNews from "@/components/home/FeaturedNews";
import NewsFeed from "@/components/home/NewsFeed";

export const dynamic = 'force-dynamic';

export default async function Home() {
  await dbConnect();
  
  const allNewsRaw = await News.find({}).sort({ createdAt: -1 }).lean();
  const allNews = JSON.parse(JSON.stringify(allNewsRaw));

  const breakingNews = allNews.filter((news) => news.isBreaking === true);
  const featuredNews = allNews.find((news) => news.isFeatured === true);
  const latestNews = allNews; 

  return (
    <main className="min-h-screen bg-base-100 transition-colors duration-300">
      
      {/* Breaking News Section */}
      {breakingNews.length > 0 && (
        <section className="container mx-auto px-4 mt-4">
          <BreakingNews news={breakingNews} />
        </section>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6">
        {featuredNews ? (
          <FeaturedNews 
            mainNews={featuredNews} 
            subNews={latestNews.slice(0, 2)}
          />
        ) : (
          <div className="text-center p-10 text-base-content">No Featured News Available</div>
        )}
      </section>

      {/* Latest News Feed */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-8 bg-red-600 rounded-sm"></div>
          <h2 className="text-3xl font-bold text-base-content">Latest News</h2>
        </div>
        
        <NewsFeed news={latestNews} />
      </section>

    </main>
  );
}