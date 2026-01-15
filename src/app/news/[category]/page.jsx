import dbConnect from "@/lib/dbConnect";
import News from "@/models/News";
import NewsCard from "@/components/news/NewsCard";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const params = await props.params;
  const category = decodeURIComponent(params.category);
  return {
    title: `${category} News - PH Newspaper`,
    description: `Read the latest ${category} news, updates, and headlines from PH Newspaper.`,
    openGraph: {
      title: `${category} News - PH Newspaper`,
      description: `Latest updates on ${category}.`,
    },
  };
}

export default async function NewsCategoryPage(props) {
  await dbConnect();
  
  const params = await props.params;
  const searchParams = await props.searchParams; 
  
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const sortBy = searchParams.sort || "date"; 
  const page = parseInt(searchParams.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const validCategories = [
    "Tech News", "Startups", "AI & Future", "Web Dev", "Career",
    "Politics", "Technology", "Sports", "International"
  ];

  if (!validCategories.includes(decodedCategory)) {
    return notFound();
  }

  let sortOption = { createdAt: -1 }; 
  if (sortBy === "popularity") {
    sortOption = { popularity: -1 }; 
  }

  const totalNews = await News.countDocuments({ category: decodedCategory });
  const totalPages = Math.ceil(totalNews / limit);

  const newsRaw = await News.find({ category: decodedCategory })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();
  const news = JSON.parse(JSON.stringify(newsRaw));

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-base-300 pb-4 mb-8 gap-4">
         
         <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
            <h1 className="text-3xl font-bold text-base-content uppercase">
              {decodedCategory} 
            </h1>
         </div>

         <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-base-content/60 mr-1">Sort By:</span>
            <div className="join border border-base-300 rounded-lg p-0.5 bg-base-100 shadow-sm">
              <Link 
                href={`/news/${category}?sort=date&page=1`} 
                className={`btn btn-sm btn-ghost join-item ${sortBy === 'date' ? 'bg-black text-white hover:bg-black' : 'text-base-content/60'}`}
              >
                Date
              </Link>
              <Link 
                href={`/news/${category}?sort=popularity&page=1`} 
                className={`btn btn-sm btn-ghost join-item ${sortBy === 'popularity' ? 'bg-black text-white hover:bg-black' : 'text-base-content/60'}`}
              >
                Popularity
              </Link>
            </div>
         </div>

      </div>

      {news.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {news.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="join shadow-md border border-base-300 bg-base-100">
                <Link 
                  href={`/news/${category}?sort=${sortBy}&page=${page > 1 ? page - 1 : 1}`}
                  className={`join-item btn ${page <= 1 ? "btn-disabled" : "btn-ghost"}`}
                >
                  « Prev
                </Link>
                
                <button className="join-item btn btn-ghost no-animation cursor-default font-bold">
                  Page {page} of {totalPages}
                </button>
                
                <Link 
                  href={`/news/${category}?sort=${sortBy}&page=${page < totalPages ? page + 1 : totalPages}`}
                  className={`join-item btn ${page >= totalPages ? "btn-disabled" : "btn-ghost"}`}
                >
                  Next »
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-base-200 rounded-xl border-2 border-dashed border-base-300">
          <div className="text-5xl mb-3 grayscale opacity-40">📰</div>
          <h2 className="text-xl font-bold text-base-content/50">No news available</h2>
        </div>
      )}
    </div>
  );
}