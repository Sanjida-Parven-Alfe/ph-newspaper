import dbConnect from "@/lib/dbConnect";
import News from "@/models/News";
import NewsCard from "@/components/news/NewsCard";
import NewsChart from "@/components/charts/NewsChart"; 
import Link from "next/link";

export const dynamic = 'force-dynamic';

const divisionMap = {
  "Dhaka": "Dhaka Division", "Gazipur": "Dhaka Division", "Faridpur": "Dhaka Division", "Gopalganj": "Dhaka Division",
  "Chittagong": "Chittagong Division", "Cox's Bazar": "Chittagong Division", "Comilla": "Chittagong Division",
  "Sylhet": "Sylhet Division",
  "Rajshahi": "Rajshahi Division", "Bogura": "Rajshahi Division",
  "Khulna": "Khulna Division", "Jessore": "Khulna Division",
  "Barishal": "Barishal Division",
  "Rangpur": "Rangpur Division",
  "Mymensingh": "Mymensingh Division"
};

export default async function DistrictDetailPage(props) {
  await dbConnect();
  
  const params = await props.params;
  const searchParams = await props.searchParams;

  const district = decodeURIComponent(params.district);
  const division = divisionMap[district] || "Bangladesh"; 

  const filterCategory = searchParams.category || "All";
  const sortBy = searchParams.sort || "date";
  
  let query = { district: district };
  if (filterCategory !== "All") {
    query.category = filterCategory;
  }

  let sortOption = { createdAt: -1 }; 
  if (sortBy === "popularity") {
    sortOption = { popularity: -1 };
  }

  const filteredNewsRaw = await News.find(query).sort(sortOption).lean();
  const filteredNews = JSON.parse(JSON.stringify(filteredNewsRaw));

  const allNewsForStatsRaw = await News.find({ district: district }).lean();
  const allNewsStats = JSON.parse(JSON.stringify(allNewsForStatsRaw));

  const stats = {};
  allNewsStats.forEach(news => {
    stats[news.category] = (stats[news.category] || 0) + 1;
  });

  const chartData = Object.keys(stats).map(key => ({
    name: key,
    count: stats[key]
  }));

  const categories = ["All", ...Object.keys(stats)];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-base-100">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-start">
        
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-error text-white font-bold uppercase">District</span>
            <span className="text-sm text-gray-500 font-semibold uppercase tracking-widest">{division}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            {district}
          </h1>
          
          <p className="text-base-content/70 text-lg leading-relaxed max-w-2xl">
            Welcome to the dedicated news portal for {district}. 
            Here you can find all the latest updates, development stories, and local happenings 
            curated specifically from our correspondents in {division}.
          </p>

          <div className="mt-6 flex gap-4">
            <div className="stat bg-base-200 rounded-xl w-auto inline-flex px-6 py-2">
              <div className="stat-figure text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
              </div>
              <div className="stat-title font-bold text-gray-500">Total News</div>
              <div className="stat-value text-red-600">{allNewsStats.length}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 w-full">
           {chartData.length > 0 ? (
             <NewsChart data={chartData} />
           ) : (
             <div className="h-[200px] flex items-center justify-center bg-base-200 rounded-xl text-gray-400">
               No Chart Data
             </div>
           )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 gap-4 sticky top-[70px] z-40">
        
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
          <h3 className="text-lg font-bold">News Archive</h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm m-1 bg-base-200 border-none hover:bg-base-300">
              Filter: <span className="text-red-600 font-bold">{filterCategory}</span> ▼
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-white rounded-box w-52 border border-gray-100">
              {categories.map(cat => (
                <li key={cat}>
                  <Link 
                    href={`/saradesh/${district}?category=${cat}&sort=${sortBy}`}
                    className={filterCategory === cat ? "active font-bold" : ""}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="join border border-gray-200 rounded-lg p-0.5 bg-base-100">
            <Link 
              href={`/saradesh/${district}?category=${filterCategory}&sort=date`} 
              className={`btn btn-sm btn-ghost join-item ${sortBy === 'date' ? 'bg-black text-white hover:bg-black' : 'text-gray-500'}`}
            >
              Date
            </Link>
            <Link 
              href={`/saradesh/${district}?category=${filterCategory}&sort=popularity`} 
              className={`btn btn-sm btn-ghost join-item ${sortBy === 'popularity' ? 'bg-black text-white hover:bg-black' : 'text-gray-500'}`}
            >
              Popularity
            </Link>
          </div>

        </div>
      </div>

      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredNews.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-xl border-2 border-dashed border-base-200">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-gray-400">No news found!</h2>
          <p className="text-gray-500 mt-2">Try changing the category filter.</p>
          <Link href={`/saradesh/${district}`} className="btn btn-link text-red-600 mt-2">
            Clear All Filters
          </Link>
        </div>
      )}

    </div>
  );
}