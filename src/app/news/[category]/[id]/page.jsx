import dbConnect from "@/lib/dbConnect";
import News from "@/models/News";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage(props) {
  await dbConnect();
  
  const params = await props.params;
  const { id, category } = params;
  const decodedCategory = decodeURIComponent(category);

  const newsRaw = await News.findByIdAndUpdate(
    id,
    { $inc: { popularity: 1 } },
    { new: true }
  ).lean();

  if (!newsRaw) {
    return <div className="text-center py-20 text-2xl">News article not found!</div>;
  }
  const news = JSON.parse(JSON.stringify(newsRaw));

  const relatedNewsRaw = await News.find({
    category: decodedCategory,
    _id: { $ne: id }
  })
  .sort({ createdAt: -1 })
  .limit(4)
  .lean();
  const relatedNews = JSON.parse(JSON.stringify(relatedNewsRaw));

  const breakingNewsRaw = await News.find({ isBreaking: true })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  const breakingNewsList = JSON.parse(JSON.stringify(breakingNewsRaw));

  return (
    <main className="min-h-screen bg-base-100 pb-10 pt-6"> 

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8">
          
          <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/70 mb-6">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/news/${category}`} className="hover:text-red-600 transition-colors">{decodedCategory}</Link>
            <span>/</span>
            <span className="text-base-content font-medium line-clamp-1">{news.title}</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-base-content leading-tight">
            {news.title}
          </h1>
          
          <div className="flex items-center flex-wrap gap-4 text-sm text-base-content/60 mb-6 border-b border-base-200 pb-4">
            <span className="font-bold text-red-600">{news.author || "PH Reporter"}</span>
            <span className="hidden md:inline">|</span>
            <span>{new Date(news.createdAt).toDateString()}</span>
            <span className="hidden md:inline">|</span>
            <span className="font-semibold text-base-content">
              Views: {news.popularity}
            </span>
          </div>

          <figure className="relative w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden mb-8 shadow-sm">
            <Image
              src={news.image || "https://placehold.co/800x500"}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </figure>

          <article className="prose prose-lg max-w-none text-base-content/80 text-justify leading-loose">
            <p className="whitespace-pre-line">
              {news.description}
            </p>
          </article>
        </div>

        <div className="lg:col-span-4 space-y-10">
          
          <div>
            <div className="border-l-4 border-red-600 pl-3 mb-4">
              <h3 className="text-xl font-bold text-base-content">Related News</h3>
            </div>
            <div className="flex flex-col gap-5">
              {relatedNews.length > 0 ? (
                relatedNews.map((item) => (
                  <Link key={item._id} href={`/news/${item.category}/${item._id}`} className="group flex gap-3 items-start p-2 hover:bg-base-200 rounded-lg transition-colors">
                    <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base-content group-hover:text-red-600 transition-colors line-clamp-2 text-sm">
                        {item.title}
                      </h4>
                      <span className="text-xs text-base-content/50 mt-1 block">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No related news found.</p>
              )}
            </div>
          </div>

          <div className="bg-base-200/50 p-5 rounded-xl border border-base-200">
            <div className="flex items-center gap-2 mb-4">
               <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
               <h3 className="text-xl font-bold text-base-content">Top Headlines</h3>
            </div>
            
            <div className="flex flex-col gap-4 divide-y divide-base-300">
              {breakingNewsList.map((item) => (
                <Link key={item._id} href={`/news/${item.category}/${item._id}`} className="pt-3 hover:text-red-600 transition-colors">
                   <h4 className="font-medium text-sm leading-snug">
                     {item.title}
                   </h4>
                   <span className="text-[10px] text-gray-500 uppercase mt-1 block tracking-wider">
                     {item.category} • {new Date(item.createdAt).toLocaleDateString()}
                   </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}