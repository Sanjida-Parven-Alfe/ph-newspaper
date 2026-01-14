import Link from "next/link";
import Image from "next/image";

const FeaturedNews = ({ mainNews, subNews }) => {
  if (!mainNews) return null;

  return (
    <section className="relative mb-24 md:mb-16">
      {/* Main Big Hero Image Section */}
      <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg group">
        <Image
          src={mainNews.image || "https://placehold.co/800x600/png"}
          alt={mainNews.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        <div className="absolute bottom-16 md:bottom-24 left-0 w-full p-6 md:p-12 z-10">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider mb-4 inline-block">
            {mainNews.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4 md:w-3/4 drop-shadow-md">
            <Link href={`/news/${mainNews.category}/${mainNews._id}`} className="hover:text-blue-400 transition-colors">
              {mainNews.title}
            </Link>
          </h1>
          <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
            <span>{mainNews.author || "PH Reporter"}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>{new Date(mainNews.createdAt).toDateString()}</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Card (Background Fixed) */}
      {subNews && subNews.length > 0 && (
        <div className="relative z-20 -mt-12 mx-4 md:mx-auto md:w-[95%] lg:w-[90%]">
          <div className="bg-base-100 rounded-xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t-4 border-blue-600 dark:border-blue-500">
            {subNews.map((news) => (
              <div key={news._id} className="flex items-center gap-4 group cursor-pointer">
                <div className="relative w-24 h-24 md:w-32 md:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={news.image || "https://placehold.co/400x300/png"}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <span className="text-blue-600 text-xs font-bold uppercase mb-1 block">
                    {news.category}
                  </span>
                  <h3 className="font-bold text-base-content leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={`/news/${news.category}/${news._id}`}>
                      {news.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-base-content/60 mt-2">
                    {new Date(news.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedNews;