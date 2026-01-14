import Link from "next/link";
import Marquee from "react-fast-marquee";

const BreakingNews = ({ news }) => {
  return (
    <div className="flex items-center bg-base-100 border border-base-300 shadow-sm p-3 rounded-lg my-4">
      {/* Animated Red Dot */}
      <div className="flex items-center gap-2 px-3 border-r border-base-300">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
        <span className="font-bold text-red-600 text-sm uppercase tracking-wide">Live</span>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <Marquee pauseOnHover={true} speed={60} gradient={false}>
          {news.map((item) => (
            <Link 
              key={item._id} 
              href={`/news/${item.category}/${item._id}`}
              className="mr-12 text-base-content hover:text-red-600 font-medium text-sm transition-colors"
            >
              {item.title}  
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default BreakingNews;