import TrendingBooksCard from "../common/trendingBookCard/BookCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const TrendingBooks = () => {
  const { bestDeals, bestDealsLoading, bestDealsError } = useSelector((state: RootState) => state.books);
  
  const books = bestDeals.slice(0, 5);

  if (bestDealsLoading) {
    return (
      <div className="w-[95%] border-2 rounded-xl p-4 h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-black border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-gray-500">Loading deals...</span>
        </div>
      </div>
    );
  }

  if (bestDealsError) {
    return (
      <div className="w-[95%] border-2 rounded-xl p-4 h-64 flex items-center justify-center">
        <span className="text-col-three font-bold">{bestDealsError}</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 mb-10">
      <h1 className="text-4xl font-bold">Trending Books</h1>
      {books.map((book) => (
        <TrendingBooksCard
          key={book.id}
          href={`/books/${book.id}`}
          isbn={book.isbn}
          title={book.title}
          author={book.author}
          price={book.price}
          off={book.discount_percentage ?? 0}
          image={
            book.cover_image_url
              ? book.cover_image_url.startsWith("http")
                ? book.cover_image_url
                : `http://localhost:8000${book.cover_image_url}`
              : "https://via.placeholder.com/150x200?text=No+Cover"
          }
          category={book.category}
        />
      ))}
    </div>
  );
};

export default TrendingBooks;
