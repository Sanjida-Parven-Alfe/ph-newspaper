import dbConnect from "@/lib/dbConnect";
import News from "@/models/News";
import NewsCard from "@/components/news/NewsCard";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AllNewsPage(props) {
  await dbConnect();

  const searchParams = await props.searchParams;
  
  const filterCategory = searchParams.category || "All";
  const sortBy = searchParams.sort || "date";

  const categories = ["All", "Tech News", "Startups", "AI & Future", "Web Dev", "Career"];

  let query = {};
  if (filterCategory !== "All") {
    query.category = filterCategory;
  }

  let sortOption = { createdAt: -1 }; 
  if (sortBy === "popularity") {
    sortOption = { popularity: -1 };
  }

  const newsRaw = await News.find(query).sort(sortOption).lean();
  const allNews = JSON.parse(JSON.stringify(newsRaw));

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-base-100">
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-base-content mb-2 border-l-4 border-red-600 pl-4">
          All News
        </h1>
        <p className="text-base-content/70 pl-5">
          Browse all the latest updates, articles, and stories in one place.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-base-200 p-4 rounded-xl shadow-sm border border-base-300 mb-8 gap-4 sticky top-[70px] z-40">
        
        <div className="flex items-center gap-2">
           <div className="badge badge-neutral text-white badge-lg">
             Total: {allNews.length}
           </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm m-1 bg-base-100 border border-base-300 hover:bg-base-300 text-base-content">
              Filter: <span className="text-red-600 font-bold ml-1">{filterCategory}</span> ▼
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-300">
              {categories.map(cat => (
                <li key={cat}>
                  <Link 
                    href={`/news?category=${cat}&sort=${sortBy}`}
                    className={`text-base-content hover:bg-base-200 ${filterCategory === cat ? "active font-bold bg-base-200" : ""}`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="join border border-base-300 rounded-lg p-0.5 bg-base-100">
            <Link 
              href={`/news?category=${filterCategory}&sort=date`} 
              className={`btn btn-sm btn-ghost join-item ${sortBy === 'date' ? 'bg-base-content text-base-100 hover:bg-base-content/90' : 'text-base-content/60'}`}
            >
              Date
            </Link>
            <Link 
              href={`/news?category=${filterCategory}&sort=popularity`} 
              className={`btn btn-sm btn-ghost join-item ${sortBy === 'popularity' ? 'bg-base-content text-base-100 hover:bg-base-content/90' : 'text-base-content/60'}`}
            >
              Popularity
            </Link>
          </div>

        </div>
      </div>

      {allNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {allNews.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-base-200 rounded-xl border-2 border-dashed border-base-300">
          <div className="text-6xl mb-4 grayscale opacity-50">📭</div>
          <h2 className="text-2xl font-bold text-base-content/50">No news found!</h2>
          <p className="text-base-content/60 mt-2">Try changing the category filter.</p>
          <Link href="/news" className="btn btn-link text-red-600 mt-2">
            Clear All Filters
          </Link>
        </div>
      )}

    </div>
  );
}