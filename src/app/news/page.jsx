import dbConnect from "@/lib/dbConnect";
import News from "@/models/News";
import NewsCard from "@/components/news/NewsCard";

// ডাটা যেন সবসময় ফ্রেশ থাকে
export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  await dbConnect();

  // ডাটাবেস থেকে সব নিউজ নিয়ে আসা হচ্ছে (নতুন নিউজ আগে)
  const allNews = await News.find({}).sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-base-100 py-10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Page Title */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1.5 h-8 bg-red-600 rounded-sm"></div>
          <h1 className="text-3xl font-bold text-base-content">All News</h1>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.length > 0 ? (
            allNews.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              No news found available at the moment.
            </div>
          )}
        </div>
        
      </div>
    </main>
  );
}