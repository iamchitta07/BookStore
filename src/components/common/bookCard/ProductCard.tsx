import type { FC } from "react";
import { FaHeart, FaRegHeart, FaBolt } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import type { ProductCardProps } from "../../../types";
import { offPrice } from "../../../utils";
// import StarRating from "../ratingComp/StarRating";

const ProductCard: FC<ProductCardProps> = ({
  imageUrl,
  title,
  rating,
  totalReviews,
  isbn = '',
  author,
  originalPrice,
  off,
  isWishlisted = false,
  onWishlistClick,
  onAddToCart,
  onBuyNow,
}) => {
  const price = offPrice(originalPrice, off);
  const formatCurrency = (amount: number) => {
    return `₹ ${amount.toLocaleString()}`;
  };

  return (
    <div className="w-[231px] bg-white border border-black hover:shadow-[2px_2px_0px_#000] shadow-none hover:translate-0.5 duration-200 p-3.5 font-sans flex flex-col">
      {/* Image Container */}
      <div className="w-[200px] h-[280px] bg-white border border-black hover:shadow-[2px_2px_0px_#000] duration-200 relative group shrink-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        {/* Wishlist Button */}
        <button
          onClick={onWishlistClick}
          className="absolute top-2 right-2 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          aria-label="Wishlist"
        >
          {isWishlisted ? (
            <FaHeart size={20} className="text-col-three" />
          ) : (
            <FaRegHeart size={20} className="text-col-three" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="mt-2 flex flex-col w-full">
        {/* Title */}
        <h3
          className="text-[20px] font-bold text-black leading-tight truncate w-full"
          title={title}
        >
          {title}
        </h3>

        {/* Rating Row */}
        {/* <StarRating rating={rating} reviews={totalReviews} /> */}
        <h3
          className="text-[12px] text-black leading-tight truncate w-full"
          title={isbn}
        >
          ISBN: {isbn}
        </h3>

        {/* Author */}
        <p className="text-[10px] text-black mt-1 truncate w-full leading-none" title={author}>
          {author}
        </p>

        {/* Price Row */}
        <div className="flex items-center gap-2.5 mt-1.5">
          <span className="text-[14px] font-bold text-black leading-none">
            {formatCurrency(price)}
          </span>
          <span className="text-[10px] font-bold text-expired line-through leading-none">
            {formatCurrency(originalPrice)}
          </span>
          <span className="text-[10px] font-bold text-col-five leading-none">{off}% Off</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 mt-2.5">
          <button
            onClick={onAddToCart}
            className="w-[81px] h-5 bg-col-one border border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1 hover:translate-0.5 hover:shadow-none transition-all active:shadow-none active:translate-0.75"
          >
            <span className="text-[8px] font-bold text-black uppercase leading-none mt-0.5">
              Add To Cart
            </span>
            <IoMdCart size={11} className="text-black" />
          </button>

          <button
            onClick={onBuyNow}
            className="w-[81px] h-5 bg-col-two border border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1 hover:translate-0.5 hover:shadow-none transition-all active:shadow-none active:translate-0.75"
          >
            <span className="text-[8px] font-bold text-black uppercase leading-none mt-0.5">
              Buy Now
            </span>
            <FaBolt size={8} className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
