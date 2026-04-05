import type { FC } from "react";
import { FaHeart, FaRegHeart, FaBolt } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import type { ProductCardProps } from "../../../types";
import { offPrice } from "../../../utils";
import { Link } from "react-router-dom";

const ProductCard2: FC<ProductCardProps> = ({
  id,
  imageUrl,
  title,
  isbn,
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
    <Link
      to={`/product/${id}`}
      className="pl-1 pr-2 h-46.5 rounded-lg bg-white border border-black hover:shadow-[4px_4px_0px_#000] shadow-none hover:translate-0.5 duration-200 font-sans flex"
    >
      {/* Left side: Image Container */}
      <div className="p-1.5 pr-2.5 py-2.5 border-r border-black shrink-0">
        <div className="w-30 rounded-md overflow-hidden h-41 bg-white border border-black duration-200 hover:shadow-[2px_2px_0px_#000] relative group">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
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
      <div className="py-2.5 pl-2.25 pr-2.5 flex flex-col flex-1 overflow-hidden relative">
        {/* Title */}
        <h3 className="text-lg font-bold text-black leading-tight truncate w-full" title={title}>
          {title}
        </h3>

        {/* Rating Row */}
        <div className="mt-1">
          <h1>
            ISBN: <span>{isbn}</span>
          </h1>
        </div>

        {/* Author */}
        <p className="text-xs text-black mt-[1.4px] truncate w-full leading-none" title={author}>
          {author}
        </p>

        {/* Price Row */}
        <div className="flex items-center gap-1 mt-2.5">
          <span className="text-md font-bold text-black leading-none">{formatCurrency(price)}</span>
          <span className="text-xs font-bold text-expired line-through leading-none">
            {formatCurrency(originalPrice)}
          </span>
          <span className="text-sm font-bold text-col-five leading-none">{off}% Off</span>
        </div>

        {/* Stock Left */}
        {stockLeft !== undefined && (
          <div className="mt-2.5">
            <span className="text-md font-bold text-col-three leading-none">
              Stock Left: {stockLeft}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3.5 mt-2">
          <button
            onClick={onAddToCart}
            className="px-3 py-1 bg-col-one border border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-0.5 hover:translate-0.5 hover:shadow-none transition-all active:shadow-none active:translate-1"
          >
            <span className="text-xs font-bold text-black uppercase leading-none mt-0.5">
              Add To Cart
            </span>
            <IoMdCart size={12} className="text-black" />
          </button>

          <button
            onClick={onBuyNow}
            className="px-3 py-1 bg-col-two border border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-0.5 hover:translate-0.5 hover:shadow-none transition-all active:shadow-none active:translate-1"
          >
            <span className="text-xs font-bold text-black uppercase leading-none mt-0.5">
              Buy Now
            </span>
            <FaBolt size={12} className="text-black" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard2;
