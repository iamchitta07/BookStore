import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaBolt, FaChevronRight } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import ProductCard from "../common/bookCard/ProductCard";
import type { BookResponse, FavouriteResponse, ReviewItem, PublicUser } from "../../types";
import api from "../../services/axios";
import { fetchShopCounts } from "../../features/shop/shopSlice";
import type { AppDispatch, RootState } from "../../app/store";
import { offPrice } from "../../utils";
import { PiCurrencyInrLight } from "react-icons/pi";
import { numFormatterUS } from "../../utils";
import StarRow from "./StarRow";
import ReviewSection from "./ReviewSection";
import Capsul from "../common/buttons/Capsul";

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookResponse | null>(null);
  const [similarBooks, setSimilarBooks] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Admin/seller info
  const [sellerName, setSellerName] = useState<string | null>(null);

  // Reviews state
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewUsers, setReviewUsers] = useState<Record<number, string>>({});
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { wishlistMap } = useSelector((state: RootState) => state.shop);
  const [cartLoadingId, setCartLoadingId] = useState<number | null>(null);
  const [wishLoadingId, setWishLoadingId] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  /* ─── Fetch book + similar ──────────────────────────────── */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get<BookResponse & { reviews?: ReviewItem[] }>(`/books/${id}`);
        const data = response.data;
        setBook(data);

        // Extract reviews if returned with book (BookDetailResponse)
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews as ReviewItem[]);
        }

        // Fetch seller username
        if (data.admin_id) {
          try {
            const userRes = await api.get<PublicUser>(`/users/${data.admin_id}/public`);
            setSellerName(userRes.data.username);
          } catch {
            setSellerName(`Seller #${data.admin_id}`);
          }
        }

        // Fetch similar books
        if (data.category && data.category.length > 0) {
          const similarRes = await api.get<BookResponse[]>("/books/best-deals", {
            params: { limit: 4, category: data.category[0] },
          });
          setSimilarBooks(similarRes.data.filter((b) => b.id !== data.id).slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  /* ─── Update Document Title ────────────────────────────── */
  useEffect(() => {
    if (book) {
      document.title = `${book.title} | ${book.author}`;
    } else {
      document.title = "Book Details | BookStore";
    }
  }, [book]);

  /* ─── Fetch reviewer usernames ───────────────────────────── */
  useEffect(() => {
    if (reviews.length === 0) return;
    const uniqueIds = [...new Set(reviews.map((r) => r.user_id))];
    (async () => {
      const map: Record<number, string> = {};
      await Promise.all(
        uniqueIds.map(async (uid) => {
          try {
            const res = await api.get<PublicUser>(`/users/${uid}/public`);
            map[uid] = res.data.username;
          } catch {
            map[uid] = `User #${uid}`;
          }
        }),
      );
      setReviewUsers(map);
    })();
  }, [reviews]);

  /* ─── Cart / Wishlist handlers ───────────────────────────── */
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

  /* ─── Submit review ────────────────────────────────────────  */
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating < 1) {
      setSubmitError("Please select a rating.");
      return;
    }
    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      const res = await api.post<ReviewItem>(`/books/${id}/reviews`, {
        rating: newRating,
        comment: newComment.trim() || undefined,
      });
      setReviews((prev) => [res.data, ...prev]);
      setNewRating(0);
      setNewComment("");
      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.response?.data?.detail || "Failed to submit review.");
    } finally {
      setSubmitLoading(false);
    }
  };

  /* ─── Average rating ─────────────────────────────────────── */
  const avgRating =
    reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;

  /* ─── Loading / error states ─────────────────────────────── */
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background p-10 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="w-full min-h-screen bg-background p-10 flex items-center justify-center">
        <div className="text-3xl font-black bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
          {error || "Product not found!"}
        </div>
      </div>
    );
  }

  const price = offPrice(book.price, book.discount_percentage ?? 0);
  const isWishlisted = wishlistMap[book.id] !== undefined;
  const imageUrl = book.cover_image_url
    ? book.cover_image_url.startsWith("http")
      ? book.cover_image_url
      : `http://localhost:8000${book.cover_image_url}`
    : "https://via.placeholder.com/400x550?text=No+Cover";
  const mainCategory = book.category && book.category.length > 0 ? book.category[0] : "";

  /* ═══════════════════════════ RENDER ════════════════════════ */
  return (
    <div className="w-full min-h-screen bg-background px-10 py-12 md:px-20 md:py-16 font-sans">
      {/* ── Hero Section ─────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-10 bg-white border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-none duration-300 hover:translate-2 p-8 md:p-12 mb-12 relative">
        {/* Wishlist Button */}
        <button
          onClick={() => handleWishlistToggle(book.id)}
          className="absolute top-6 right-6 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-10"
        >
          {isWishlisted ? (
            <FaHeart size={36} className="text-col-three" />
          ) : (
            <FaRegHeart size={36} className="text-black" />
          )}
        </button>

        {/* Image */}
        <div className="w-full lg:w-[40%] xl:w-[35%] shrink-0">
          <div className="border-4 border-black hover:shadow-[8px_8px_0px_#000] hover:-translate-1 duration-300 overflow-hidden bg-white h-150 xl:h-200 relative">
            <img src={imageUrl} alt={book.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col justify-start">
          <h1 className="text-5xl md:text-8xl font-black uppercase text-black leading-tight mb-4 pr-12">
            {book.title}
          </h1>

          <div className="border-l-[6px] border-black pl-4 mb-6">
            <p className="text-5xl font-bold italic text-black shrink-0">{book.author}</p>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <p className="text-3xl font-bold">
              ISBN: <span className="font-medium italic">{book.isbn}</span>
            </p>
            <p className="text-3xl font-bold">
              Publisher: <span className="font-medium italic">{book.publisher}</span>
            </p>
          </div>

          {book.stock_quantity > 0 ? (
            <div className="mb-12">
              <span className="text-5xl font-black uppercase tracking-wider">
                Stock left: <span className="text-col-five">{book.stock_quantity}</span>
              </span>
            </div>
          ) : (
            <div className="">
              <span className="text-col-three text-5xl font-black uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}

          <div className="flex gap-px items-center">
            <PiCurrencyInrLight className="font-bold" size={90} />
            <div className="flex gap-1 items-end">
              <div className="flex text-end text-7xl font-bold">
                {numFormatterUS(
                  offPrice(
                    book.price,
                    book.discount_percentage === undefined ? 0 : book.discount_percentage,
                  ),
                )}
              </div>
              <h1 className="text-col-five text-5xl">
                {book.discount_percentage === undefined ? 0 : book.discount_percentage}% Off
              </h1>
              <h1 className="text-4xl text-expired line-through"> {price} </h1>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-auto pt-8">
            <button
              onClick={() => handleAddToCart(book.id)}
              disabled={cartLoadingId === book.id || book.stock_quantity === 0}
              className="bg-col-one border-4 border-black px-8 py-4 text-xl md:text-2xl font-black uppercase shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <IoMdCart size={28} />
              {cartLoadingId === book.id ? "Adding..." : "Add to Cart"}
            </button>
            <button
              className="bg-col-two border-4 border-black px-10 py-4 text-xl md:text-2xl font-black uppercase shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={book.stock_quantity === 0}
            >
              <FaBolt size={24} />
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ── Product Details ───────────────────────────────────── */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-8 md:p-12 mb-12">
        <h2 className="text-4xl font-black uppercase border-b-4 border-black pb-4 mb-8">
          Product Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8 text-xl">
          <div className="flex items-center gap-4">
            <span className="font-bold w-40">Edition:</span>
            <span>{book.edition || "N/A"}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold w-40">Publication Year:</span>
            <span>{book.publication_year || "N/A"}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold w-40">Seller:</span>
            <span className="font-semibold text-col-six">
              {sellerName ? `@${sellerName}` : book.admin_id ? `#${book.admin_id}` : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold w-40">Categories:</span>
            <span className="capitalize">{book.category?.join(", ") || "N/A"}</span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Description:</h3>
          <div className="bg-[#F3F4F6] border-2 border-black p-6 text-lg leading-relaxed shadow-[4px_4px_0px_#000]">
            {book.description || "No description provided."}
          </div>
        </div>
      </div>

      {/* ── Similar Books ─────────────────────────────────────── */}
      {similarBooks.length > 0 && (
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-4xl font-black uppercase text-black">Similar Books</h2>
            <Capsul
              text="View More"
              href={`/category/${mainCategory}`}
              icon={<FaChevronRight size={24} color="white" />}
              color="text-white"
              bgColor="bg-delete-btn"
            />
          </div>

          <div className="flex flex-wrap gap-6 justify-start">
            {similarBooks.map((similar) => (
              <ProductCard
                key={similar.id}
                id={similar.id}
                title={similar.title}
                author={similar.author}
                isbn={similar.isbn}
                originalPrice={similar.price}
                off={similar.discount_percentage ?? 0}
                imageUrl={
                  similar.cover_image_url
                    ? similar.cover_image_url.startsWith("http")
                      ? similar.cover_image_url
                      : `http://localhost:8000${similar.cover_image_url}`
                    : "https://via.placeholder.com/150x200?text=No+Cover"
                }
                isWishlisted={wishlistMap[similar.id] !== undefined}
                onWishlistClick={() => handleWishlistToggle(similar.id)}
                onAddToCart={() => handleAddToCart(similar.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          REVIEWS SECTION  — desktop only neo-brutalism
      ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block mt-16 mb-10">
        {/* Header + average rating */}
        <div className="flex items-end gap-6 border-b-4 border-black pb-6 mb-0">
          <h2 className="text-6xl font-black uppercase text-black leading-none">Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mb-1">
              <StarRow rating={Math.round(avgRating)} size={24} />
              <span className="text-3xl font-black">{avgRating.toFixed(1)}</span>
              <span className="text-xl font-bold text-gray-600">({reviews.length})</span>
            </div>
          )}
        </div>

        {/* ── Add Review Form ───────────────────────────────── */}
        <ReviewSection
          handleSubmitReview={handleSubmitReview}
          newRating={newRating}
          setNewRating={setNewRating}
          newComment={newComment}
          setNewComment={setNewComment}
          reviews={reviews}
          reviewUsers={reviewUsers}
          submitLoading={submitLoading}
          submitError={submitError}
          submitSuccess={submitSuccess}
        />
      </div>
    </div>
  );
};

export default ProductPage;
