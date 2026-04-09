import Capsul from "../common/buttons/Capsul";
import { FaChevronRight } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../common/bookCard/ProductCard";
import type { BookResponse, FavouriteResponse } from "../../types";
import api from "../../services/axios";
import { fetchShopCounts } from "../../features/shop/shopSlice";
import type { AppDispatch } from "../../app/store";

const CategoryWiseBooks = ({
  categoryTitle,
  category,
  IMG,
}: {
  categoryTitle: string;
  category: string;
  IMG: string;
}) => {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Map of book_id -> favourite record id (for delete on toggle-off)
  const [wishlistMap, setWishlistMap] = useState<Record<number, number>>({});
  const [cartLoadingId, setCartLoadingId] = useState<number | null>(null);
  const [wishLoadingId, setWishLoadingId] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const [booksRes, wishRes] = await Promise.all([
          api.get<BookResponse[]>("/books/best-deals", { params: { limit: 5, category: category} }),
          api.get<FavouriteResponse[]>("/favourites/").catch(() => ({ data: [] })),
        ]);
        setBooks(booksRes.data);

        // Build a map of book_id -> favourite id
        const map: Record<number, number> = {};
        (wishRes.data as FavouriteResponse[]).forEach((fav) => {
          map[fav.book_id] = fav.id;
        });
        setWishlistMap(map);
      } catch (err) {
        setError("Failed to load deals. Please try again.");
        console.error("Error fetching deals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleWishlistToggle = async (bookId: number) => {
    if (wishLoadingId === bookId) return;
    setWishLoadingId(bookId);
    try {
      if (wishlistMap[bookId] !== undefined) {
        // Already wishlisted – remove it
        await api.delete(`/favourites/${wishlistMap[bookId]}`);
        setWishlistMap((prev) => {
          const next = { ...prev };
          delete next[bookId];
          return next;
        });
      } else {
        // Not wishlisted – add it
        const res = await api.post<FavouriteResponse>("/favourites/", { book_id: bookId });
        setWishlistMap((prev) => ({ ...prev, [bookId]: res.data.id }));
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

  if (loading) {
    return (
      <div className="w-[95%] p-4 h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-black border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-gray-500">Loading deals...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[95%] border-2 rounded-xl p-4 h-64 flex items-center justify-center">
        <span className="text-col-three font-bold">{error}</span>
      </div>
    );
  }

  return (
    <div className="w-full px-20 mt-5">
      <div className="w-full flex justify-between mb-3">
        <h1 className="uppercase text-4xl font-bold">{categoryTitle}</h1>
        <Capsul
          text="See More"
          href={`/shop?categories=${category}`}
          icon={<FaChevronRight size={24} color="white" />}
          color="text-white"
          bgColor="bg-delete-btn"
        />
      </div>
      <div className="grid grid-cols-[20%_80%] mb-5">
        <div className="relative h-105 w-full overflow-hidden rounded-2xl border-2 hover:shadow-[6px_6px_0px_#000000] hover:-translate-1 duration-300 ">
          <img src={IMG} alt={categoryTitle} className="object-cover h-full w-full" />
          <Capsul
            text="View More"
            href={`/shop?categories=${category}`}
            icon={<FaChevronRight size={24} color="black" />}
            color="text-black"
            bgColor="bg-col-seven absolute bottom-4 right-4"
          />
        </div>
        <div className="grid grid-cols-5 pl-20">
          {books.map((book) => {
            return (
              <ProductCard
                key={book.id}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseBooks;
