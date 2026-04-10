import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/axios";
import ProductCard from "../common/bookCard/ProductCard";
import type { BookResponse, FavouriteResponse } from "../../types";
import { fetchShopCounts } from "../../features/shop/shopSlice";
import type { AppDispatch, RootState } from "../../app/store";

const CategoryBooks = () => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category || "");
  
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const { wishlistMap } = useSelector((state: RootState) => state.shop);
  const [cartLoadingId, setCartLoadingId] = useState<number | null>(null);
  const [wishLoadingId, setWishLoadingId] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const limit = 30;

  // Reset when category changes
  useEffect(() => {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    setIsInitialLoad(true);
  }, [category]);

  const fetchBooks = async (pageNum: number) => {
    if (loading || (!hasMore && pageNum > 1)) return;
    setLoading(true);
    try {
      const skip = (pageNum - 1) * limit;
      let endpoint = "/books/";
      let params: any = { limit, skip };
      
      const catLower = decodedCategory.toLowerCase();
      if (catLower === "popular" || catLower === "trending") {
        endpoint = "/books/best-deals";
      } else if (catLower !== "all" && catLower !== "shop") {
        params.category = decodedCategory;
      }
      
      const res = await api.get<BookResponse[]>(endpoint, { params });
      
      if (res.data.length < limit) {
        setHasMore(false);
      }
      
      setBooks((prev) => pageNum === 1 ? res.data : [...prev, ...res.data]);
    } catch (err) {
      console.error("Failed to load category books", err);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchBooks(page);
    }
  }, [page, category]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleWishlistToggle = async (bookId: number) => {
    if (wishLoadingId === bookId) return;
    setWishLoadingId(bookId);
    try {
      if (wishlistMap[bookId] !== undefined) {
        await api.delete(`/favourites/${wishlistMap[bookId]}`);
      } else {
        await api.post<FavouriteResponse>("/favourites/", { book_id: bookId });
      }
      dispatch(fetchShopCounts());
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to update wishlist");
    } finally {
      setWishLoadingId(null);
    }
  };

  const handleAddToCart = async (bookId: number) => {
    if (cartLoadingId === bookId) return;
    setCartLoadingId(bookId);
    try {
      await api.post("/sales/", { book_id: bookId, quantity: 1 });
      dispatch(fetchShopCounts());
      alert("Added to Cart!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to add to cart");
    } finally {
      setCartLoadingId(null);
    }
  };

  const getPageTitle = () => {
    const catLower = decodedCategory.toLowerCase();
    if (catLower === "popular") return "Popular Books";
    if (catLower === "trending") return "Trending Books";
    if (catLower === "all" || catLower === "shop") return "All Books";
    // Capitalize first letter
    return decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1) + " Books";
  };

  useEffect(() => {
    document.title = `${getPageTitle()} | BookStore`;
  }, [decodedCategory]);

  return (
    <div className="px-20 py-10 min-h-screen bg-background">
      <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
        <h1 className="text-6xl font-black uppercase tracking-tight">{getPageTitle()}</h1>
        <div className="text-xl font-bold border-2 border-black bg-col-four px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {books.length} {books.length === 1 ? "Result" : "Results"} {hasMore && "+"}
        </div>
      </div>

      {isInitialLoad && loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-8 border-black border-t-col-five rounded-full animate-spin"></div>
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-10">
          <h2 className="text-4xl font-bold uppercase mb-4">No Books Found</h2>
          <p className="text-xl font-semibold text-gray-700">Try a different category</p>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-8">
          {books.map((book, index) => {
            const isLast = index === books.length - 1;
            return (
              <div key={`${book.id}-${index}`} ref={isLast ? lastBookElementRef : null}>
                <ProductCard
                  id={book.id}
                  isbn={book.isbn}
                  title={book.title}
                  author={book.author}
                  originalPrice={book.price}
                  off={book.discount_percentage ?? 0}
                  imageUrl={
                    book.cover_image_url
                      ? book.cover_image_url.startsWith("http")
                        ? book.cover_image_url
                        : `http://localhost:8000${book.cover_image_url}`
                      : "https://via.placeholder.com/150x200?text=No+Cover"
                  }
                  isWishlisted={wishlistMap[book.id] !== undefined}
                  stockLeft={book.stock_quantity}
                  onWishlistClick={() => handleWishlistToggle(book.id)}
                  onAddToCart={() => handleAddToCart(book.id)}
                />
              </div>
            );
          })}
        </div>
      )}

      {loading && !isInitialLoad && (
        <div className="flex justify-center items-center py-10 mt-8">
          <div className="w-10 h-10 border-6 border-black border-t-col-three rounded-full animate-spin"></div>
        </div>
      )}
      
      {!hasMore && books.length > 0 && (
        <div className="mt-16 text-center border-t-4 border-black pt-8 pb-10">
          <span className="inline-block border-2 border-black bg-col-two font-bold uppercase text-xl px-10 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            End of Results
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryBooks;