import NewsCard from "@/components/news/NewsCard";

const NewsFeed = ({ news }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item._id} news={item} />
      ))}
    </div>
  );
};

export default NewsFeed;