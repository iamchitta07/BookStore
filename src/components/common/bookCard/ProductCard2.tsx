import type { FC } from "react";
import { FaHeart, FaRegHeart, FaBolt } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import type { ProductCardProps } from "../../../types";
import { offPrice } from "../../../utils";
import StarRating from "../ratingComp/StarRating";
import IMG from "/images/Product.webp";

const ProductCard2: FC<ProductCardProps> = ({
  imageUrl = IMG,
  title,
  rating,
  totalReviews,
  author,
  originalPrice,
  off,
  isWishlisted = false,
  onWishlistClick,
  onAddToCart,
  onBuyNow,
  stockLeft,
}) => {
  const price = offPrice(originalPrice, off);
  const formatCurrency = (amount: number) => {
    return `₹ ${amount.toLocaleString()}`;
  };

  return (
    <div className="w-80 h-44 rounded-xl bg-white border border-black hover:shadow-[2px_2px_0px_#000] shadow-none hover:translate-0.5 duration-200 font-sans flex">
      {/* Left side: Image Container */}
      <div className="p-1.5 border-r border-black shrink-0">
        <div className="w-[117px] rounded-md overflow-hidden h-[163px] bg-white border border-black shadow-[1px_1px_0px_#000] relative group">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          {/* Wishlist Button */}
          <button 
            onClick={onWishlistClick}
            className="absolute top-1.5 right-1.5 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-10"
            aria-label="Wishlist"
          >
            {isWishlisted ? (
              <FaHeart size={12} className="text-col-three" />
            ) : (
              <FaRegHeart size={12} className="text-col-three" />
            )}
          </button>
        </div>
      </div>

      {/* Right side: Content */}
      <div className="pt-2.5 pb-2.5 pl-[9px] pr-2.5 flex flex-col flex-1 overflow-hidden relative">
        {/* Title */}
        <h3 className="text-[13.8px] font-bold text-black leading-tight truncate w-full" title={title}>
          {title}
        </h3>

        {/* Rating Row */}
        <div className="mt-1 transform scale-75 origin-left">
          <StarRating rating={rating} reviews={totalReviews} />
        </div>

        {/* Author */}
        <p className="text-[7px] text-black mt-[1.4px] truncate w-full leading-none" title={author}>
          {author}
        </p>

        {/* Price Row */}
        <div className="flex items-center gap-[5px] mt-[10px]">
          <span className="text-[12px] font-bold text-black leading-none">
            {formatCurrency(price)}
          </span>
          <span className="text-[8.6px] font-bold text-expired line-through leading-none">
            {formatCurrency(originalPrice)}
          </span>
          <span className="text-[8.6px] font-bold text-col-five leading-none">
            {off}% Off
          </span>
        </div>

        {/* Stock Left */}
        {stockLeft !== undefined && (
          <div className="mt-2.5">
            <span className="text-[10.3px] font-bold text-col-three leading-none">
              Stock Left: {stockLeft}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-[14px] mt-2">
          <button 
            onClick={onAddToCart}
            className="w-[56px] h-[14px] bg-col-one border border-black shadow-[1px_1px_0px_#000] flex items-center justify-center gap-[2px] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
          >
            <span className="text-[5.5px] font-bold text-black uppercase leading-none mt-0.5">
              Add To Cart
            </span>
            <IoMdCart size={7.5} className="text-black" />
          </button>
          
          <button 
            onClick={onBuyNow}
            className="w-[56px] h-[14px] bg-col-two border border-black shadow-[1px_1px_0px_#000] flex items-center justify-center gap-[2px] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
          >
            <span className="text-[5.5px] font-bold text-black uppercase leading-none mt-0.5">
              Buy Now
            </span>
            <FaBolt size={5.5} className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
