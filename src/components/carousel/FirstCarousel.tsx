import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-coverflow";
// @ts-ignore
import "swiper/css/autoplay";

import { BsCartCheckFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import api from "../../services/axios";
import { fetchShopCounts } from "../../features/shop/shopSlice";
import type { AppDispatch, RootState } from "../../app/store";

const FirstCarousel = () => {
  const { bestDeals, bestDealsLoading } = useSelector((state: RootState) => state.books);
  const { wishlistMap } = useSelector((state: RootState) => state.shop);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingCart, setLoadingCart] = useState<number | null>(null);
  const [loadingWish, setLoadingWish] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const books = bestDeals.slice(0, 5);

  const handleAddToCart = async (bookId: number) => {
    try {
      setLoadingCart(bookId);
      await api.post("/sales/", { book_id: bookId, quantity: 1 });
      dispatch(fetchShopCounts());
      alert("Added to Cart!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to add to cart");
    } finally {
      setLoadingCart(null);
    }
  };

  const handleAddToWishlist = async (bookId: number) => {
    try {
      setLoadingWish(bookId);
      if (wishlistMap[bookId] !== undefined) {
        await api.delete(`/favourites/${wishlistMap[bookId]}`);
      } else {
        await api.post("/favourites/", { book_id: bookId });
      }
      dispatch(fetchShopCounts());
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to update wishlist");
    } finally {
      setLoadingWish(null);
    }
  };

  if (bestDealsLoading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-[url('/carousel/Hero.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <span className="text-white font-bold text-xl">Loading deals...</span>
        </div>
      </div>
    );
  }

  if (books.length === 0) return null;

  const currentBook = books[activeIndex];
  const isWishlisted = currentBook ? wishlistMap[currentBook.id] !== undefined : false;

  return (
    <div className="w-full h-[90vh] bg-[url('/carousel/Hero.jpg')] bg-no-repeat bg-cover bg-center grid grid-cols-5 relative">
      <div className="col-span-3 flex justify-center items-center h-full pl-20">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 100,
            depth: 0,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full max-w-full h-200 py-40! flex items-center"
        >
          {books.map((book) => (
            <SwiperSlide key={book.id}>
              {({ isActive }) => (
                <div
                  className={`w-80 h-120 transition-all duration-500 ease-in-out border-3 border-black bg-white ${
                    isActive ? "scale-110 -translate-y-25 z-20" : "scale-95 z-10 mb-20"
                  }`}
                >
                  <img
                    src={
                      book.cover_image_url
                        ? book.cover_image_url.startsWith("http")
                          ? book.cover_image_url
                          : `http://localhost:8000${book.cover_image_url}`
                        : "https://placehold.co/320x480?text=No+Cover"
                    }
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="col-span-2 flex flex-col justify-center items-start w-full pr-20">
        <div className="bg-white border-4 shadow-[6px_6px_0px_#000] duration-200 hover:shadow-none hover:translate-1.5 p-5 w-full">
          <h1 className="text-6xl font-bold uppercase tracking-wider text-black">
            {currentBook?.title}
          </h1>
          <p className="text-3xl text-black mb-5 border-l-[6px] border-col-six pl-4">
            ISBN: <span className="italic">{currentBook?.isbn}</span>
          </p>
          <p className="text-3xl text-black mb-10 border-l-[6px] border-col-two pl-4">
            by <span className="italic font-bold">{currentBook?.author}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <button
              onClick={() => handleAddToCart(currentBook?.id)}
              disabled={loadingCart === currentBook?.id}
              className="flex items-center justify-center gap-3 bg-col-six text-white uppercase font-black text-xl px-8 py-4 border-2 border-black shadow-[6px_6px_0px_#000] hover:translate-1 hover:shadow-none transition-all duration-200 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <BsCartCheckFill size={28} /> {loadingCart === currentBook?.id ? "Adding..." : "Add to Cart"}
            </button>
            <button
              onClick={() => handleAddToWishlist(currentBook?.id)}
              disabled={loadingWish === currentBook?.id}
              className="flex items-center justify-center gap-3 bg-col-two text-black uppercase font-black text-xl px-8 py-4 border-2 border-black shadow-[6px_6px_0px_#000] hover:translate-1 hover:shadow-none transition-all duration-200 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isWishlisted ? <FaHeart size={26} className="text-col-three" /> : <FaRegHeart size={26} />} 
              {loadingWish === currentBook?.id ? "Updating..." : (isWishlisted ? "Wishlisted" : "Add to Wishlist")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstCarousel;
