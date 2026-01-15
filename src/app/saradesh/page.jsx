import dbConnect from "@/lib/dbConnect"; 
import News from "@/models/News";      
import MapWrapper from "@/components/map/MapWrapper"; 

export const dynamic = 'force-dynamic'; 

export default async function SaraDeshPage() {
  await dbConnect();
  const allNewsRaw = await News.find({}).select('title category district image _id').lean();
  const allNews = JSON.parse(JSON.stringify(allNewsRaw));
  const mapData = allNews.filter(news => news.district);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-base-content mb-2">
          Sara Desh <span className="text-red-500">Map Interface</span>
        </h1>
        <p className="text-base-content/70">
          Find news from any district using our interactive map.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto">
         <MapWrapper newsData={mapData} />
      </div>

    </div>
  );
}