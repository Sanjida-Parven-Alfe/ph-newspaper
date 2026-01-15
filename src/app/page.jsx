import Link from "next/link";
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
  
  // Slider Logic
  const sliderData = allNews.filter((news) => news.isFeatured === true).slice(0, 5);
  const finalSliderData = sliderData.length > 0 ? sliderData : allNews.slice(0, 5);

  const latestNews = allNews; 

  return (
    <main className="min-h-screen bg-base-100 transition-colors duration-300">
      
      {breakingNews.length > 0 && (
        <section className="container mx-auto px-4 mt-4">
          <BreakingNews news={breakingNews} />
        </section>
      )}

      <section className="container mx-auto px-4 py-6">
        <FeaturedNews 
          sliderNews={finalSliderData} 
          subNews={latestNews.slice(0, 2)} 
        />
      </section>

      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-8 bg-red-600 rounded-sm"></div>
            <h2 className="text-3xl font-bold text-base-content">Latest News</h2>
          </div>

          <Link href="/news" className="btn btn-outline btn-sm border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
            View All News ➜
          </Link>
        </div>
        
        <NewsFeed news={latestNews.slice(0, 6)} />
      </section>

    </main>
  );
}