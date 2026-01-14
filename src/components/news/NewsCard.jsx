import Link from "next/link";
import Image from "next/image";

const NewsCard = ({ news }) => {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-200 group h-full">
      {/* Image Section */}
      <figure className="relative h-56 overflow-hidden rounded-t-2xl">
        <Image
          src={news.image || "https://placehold.co/600x400/png"}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow-md">
          {news.category}
        </div>
      </figure>

      {/* Content Body */}
      <div className="card-body p-5">
        
        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-base-content/60 mb-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
           {news.createdAt ? new Date(news.createdAt).toDateString() : "Date Unavailable"}
        </div>

        {/* Title (Color Fixed for Dark Mode) */}
        <h2 className="card-title text-xl font-bold leading-snug text-base-content group-hover:text-blue-600 transition-colors">
          <Link href={`/news/${news.category}/${news._id}`} className="hover:underline decoration-blue-500 underline-offset-4">
            {news.title}
          </Link>
        </h2>

        {/* Description */}
        <p className="text-sm text-base-content/70 mt-2 line-clamp-3">
          {news.description ? news.description.substring(0, 100) : "No description available"}...
        </p>

        {/* Read More */}
        <div className="card-actions justify-end mt-4">
          <Link href={`/news/${news.category}/${news._id}`} className="btn btn-link btn-sm text-blue-600 no-underline hover:text-blue-500 px-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
             Read More 
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;