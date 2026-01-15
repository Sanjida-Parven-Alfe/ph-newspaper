import dbConnect from "@/lib/dbConnect";
import News from "@/models/News";
import NewsCard from "@/components/news/NewsCard";

export const dynamic = 'force-dynamic';

export default async function CategoryPage(props) {
  await dbConnect();

  const params = await props.params;
  const searchParams = await props.searchParams;

  const categoryName = decodeURIComponent(params.category); 
  const page = parseInt(searchParams.page) || 1;
  const limit = 10;
  const sortBy = searchParams.sort || "date";

  // Sorting Logic
  let sortOption = { createdAt: -1 }; 
  if (sortBy === "popularity") {
    sortOption = { popularity: -1 };
  }

  const skip = (page - 1) * limit;

  // Database Query
  const newsListRaw = await News.find({ category: categoryName })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const totalNews = await News.countDocuments({ category: categoryName });
  const totalPages = Math.ceil(totalNews / limit);
  
  const newsList = JSON.parse(JSON.stringify(newsListRaw));

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-8 bg-red-600 rounded-sm"></div>
           <h1 className="text-3xl font-bold text-base-content uppercase">{categoryName}</h1>
           <span className="badge badge-error text-white ml-2">{totalNews} News</span>
        </div>

        {/* Sort Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-base-content/70">Sort By:</span>
          <div className="join">
            <a href={`/news/${params.category}?sort=date&page=1`} className={`btn btn-sm join-item ${sortBy === 'date' ? 'btn-active btn-neutral' : ''}`}>Date</a>
            <a href={`/news/${params.category}?sort=popularity&page=1`} className={`btn btn-sm join-item ${sortBy === 'popularity' ? 'btn-active btn-neutral' : ''}`}>Popularity</a>
          </div>
        </div>
      </div>

      {/* News Grid */}
      {newsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-400">No news found in this category.</h2>
          <p className="text-gray-500 mt-2">Try checking other categories or come back later.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="join shadow-md">
            <a href={`/news/${params.category}?page=${page > 1 ? page - 1 : 1}&sort=${sortBy}`} className={`join-item btn ${page <= 1 ? 'btn-disabled' : ''}`}>« Prev</a>
            
            {[...Array(totalPages)].map((_, index) => {
              const p = index + 1;
              return (
                <a key={p} href={`/news/${params.category}?page=${p}&sort=${sortBy}`} className={`join-item btn ${page === p ? 'btn-active btn-primary' : ''}`}>{p}</a>
              );
            })}

            <a href={`/news/${params.category}?page=${page < totalPages ? page + 1 : totalPages}&sort=${sortBy}`} className={`join-item btn ${page >= totalPages ? 'btn-disabled' : ''}`}>Next »</a>
          </div>
        </div>
      )}
    </div>
  );
}