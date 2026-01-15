import dbConnect from "@/lib/dbConnect";
import News from "@/models/News";
import NewsCard from "@/components/news/NewsCard";
import { notFound } from "next/navigation"; 

export const dynamic = 'force-dynamic';

export default async function NewsCategoryPage(props) {
  await dbConnect();
  
  const params = await props.params;
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);

  const validCategories = [
    "Tech News", "Startups", "AI & Future", "Web Dev", "Career",
    "Politics", "Technology", "Sports", "International"
  ];

  if (!validCategories.includes(decodedCategory)) {
    return notFound();
  }

  const newsRaw = await News.find({ category: decodedCategory })
    .sort({ createdAt: -1 })
    .lean();
  const news = JSON.parse(JSON.stringify(newsRaw));

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
         <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
         <h1 className="text-3xl font-bold text-base-content uppercase">
           {decodedCategory} <span className="text-red-500 text-sm normal-case align-middle ml-2">({news.length} News)</span>
         </h1>
      </div>

      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item._id} news={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-400">No news found in this category yet.</h2>
        </div>
      )}
    </div>
  );
}