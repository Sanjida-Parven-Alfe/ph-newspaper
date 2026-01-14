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
    <main className="min-h-screen bg-base-100">
      {breakingNews.length > 0 && (
        <section className="container mx-auto px-4 mt-4">
          <BreakingNews news={breakingNews} />
        </section>
      )}

      <section className="container mx-auto px-4 py-6">
        {featuredNews ? (
          <FeaturedNews news={featuredNews} />
        ) : (
          <div className="text-center p-10">No Featured News Available</div>
        )}
      </section>

      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-red-600 pl-3">
          Latest News
        </h2>
        <NewsFeed news={latestNews} />
      </section>
    </main>
  );
}