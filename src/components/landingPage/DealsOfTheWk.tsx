import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard2 from "../common/bookCard/ProductCard2";
import type { FavouriteResponse } from "../../types";
import api from "../../services/axios";
import { fetchShopCounts } from "../../features/shop/shopSlice";
import type { AppDispatch, RootState } from "../../app/store";

const DealsOfTheWk = () => {
  const { bestDeals, bestDealsLoading, bestDealsError } = useSelector((state: RootState) => state.books);
  const { wishlistMap } = useSelector((state: RootState) => state.shop);
  
  const [cartLoadingId, setCartLoadingId] = useState<number | null>(null);
  const [wishLoadingId, setWishLoadingId] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const books = bestDeals.slice(0, 6); // Take first 6 for deals of the week

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
    <div className="w-[95%] border-2 rounded-xl grid grid-cols-2 gap-4 p-4">
      {books.map((book) => (
        <ProductCard2
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
      ))}
    </div>
  );
};

export default DealsOfTheWk;
