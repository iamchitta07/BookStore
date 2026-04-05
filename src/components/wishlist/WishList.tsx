import { useEffect, useState } from "react";
import api from "../../services/axios";
import GenreDropdown from "./DropDown";
import ProductCard from "../common/bookCard/ProductCard";
import type { FavouriteResponse } from "../../types";

const WishList = () => {
  const [favourites, setFavourites] = useState<FavouriteResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await api.get("/favourites/");
        setFavourites(response.data);
      } catch (error) {
        console.error("Failed to fetch favourites", error);
        alert("Failed to load wishlist.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, []);

  const handleRemoveFavourite = async (id: number) => {
    try {
      await api.delete(`/favourites/${id}`);
      setFavourites(favourites.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error("Failed to remove favourite", error);
      alert("Failed to remove from wishlist.");
    }
  };

  const handleAddToCart = async (bookId: number) => {
    try {
      await api.post("/sales/", { book_id: bookId, quantity: 1 });
      alert("Added to cart successfully!");
    } catch (error: any) {
      console.error("Failed to add to cart", error);
      alert(error.response?.data?.detail || "Failed to add to cart.");
    }
  };

  // Get unique categories
  const categories = Array.from(
    new Set(favourites.flatMap((fav) => fav.book.category || []))
  );

  const filteredFavourites =
    selectedCategory === "All"
      ? favourites
      : favourites.filter((fav) => (fav.book.category || []).includes(selectedCategory));

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <h2 className="text-3xl font-black italic">LOADING...</h2>
      </div>
    );
  }

  return (
    <div className="w-full px-20 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center pb-2 gap-2 flex flex-col items-center">
          <h1 className="text-5xl font-black relative inline-block">
            Your Wishlist
          </h1>
        </div>

        <GenreDropdown
          options={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        <div className="flex gap-10 flex-wrap justify-center mt-10">
          {filteredFavourites.map((fav) => (
            <ProductCard
              key={fav.id}
              imageUrl={fav.book.cover_image_url || "https://books.google.com/books/content?id=NM5PqgKd2dsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"}
              title={fav.book.title}
              author={fav.book.author}
              originalPrice={fav.book.price}
              off={fav.book.discount_percentage || 0}
              isWishlisted={true}
              onWishlistClick={() => handleRemoveFavourite(fav.id)}
              onAddToCart={() => handleAddToCart(fav.book.id)}
              onBuyNow={() => {}}
              isbn={fav.book.isbn}
            />
          ))}
          {filteredFavourites.length === 0 && (
            <div className="col-span-full w-full text-center text-2xl font-bold mt-10">
              No books found in your wishlist.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
