import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import News from "@/models/News";
import BreakingNews from "@/components/home/BreakingNews";
import FeaturedNews from "@/components/home/FeaturedNews";
import NewsFeed from "@/components/home/NewsFeed";
import NewsCard from "@/components/news/NewsCard";

export const dynamic = 'force-dynamic';

export default async function Home() {
  await dbConnect();
  
  const allNewsRaw = await News.find({}).sort({ createdAt: -1 }).limit(100).lean();
  const allNews = JSON.parse(JSON.stringify(allNewsRaw));

  const breakingNews = allNews.filter((news) => news.isBreaking === true);

  const sliderData = allNews.filter((news) => news.isFeatured === true).slice(0, 5);
  const finalSliderData = sliderData.length > 0 ? sliderData : allNews.slice(0, 5);

  const latestNews = allNews; 

  const techNews = allNews.filter((news) => news.category === "Tech News").slice(0, 3);

  return (
    <main className="min-h-screen bg-base-100 transition-colors duration-300 pb-10">

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
        <div className="flex items-center justify-between mb-6 border-b border-base-200 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-8 bg-red-600 rounded-sm"></div>
            <h2 className="text-3xl font-bold text-base-content">Latest News</h2>
          </div>

          <Link href="/news" className="btn btn-outline btn-sm border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
            View All News ➜
          </Link>
        </div>
        
        <NewsFeed news={latestNews.slice(0, 8)} />
      </section>

      {techNews.length > 0 && (
        <section className="container mx-auto px-4 py-6 bg-base-200/50 rounded-xl my-8">
           <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-8 bg-red-600 rounded-sm"></div>
            <h2 className="text-3xl font-bold text-base-content">Tech & Future</h2>
          </div>

            <Link href="/news/Tech News" className="link link-hover text-sm font-semibold text-red-600">
              See All Tech News
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techNews.map(news => (
               <NewsCard key={news._id} news={news} />
            ))}
          </div>
        </section>
      )}

    </main>
  );
}