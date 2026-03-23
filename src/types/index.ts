import type { ReactElement } from "react";

export interface UnderNavProps {
    title: string;
    href: string;
}

export interface TrendingBookProps {
    image: string;
    title: string;
    shortSummary: string;
    rating: number;
    totalReviews: number;
    price: number;
    off: number;
    href: string;
    category: string[];
}

export interface StarRatingProps {
  reviews?: number | undefined;
  rating: number;
  color?: string;
  strokeColor?: string;
}

export interface ButtonProps {
  text: string;
  href: string;
  icon: ReactElement;
  color: string;
  bgColor: string;
}

export interface VendorProps {
    name: string;
    sold: number;
    rating: number;
    rank: number;
    href: string;
    image: string;
}

export interface AccordinoProps {
  title: string;
  image: string;
  href: string;
  color: string;
}

export interface CartProps {
  title: string;
  des: string;
  inStock: boolean;
  price: number;
  off: number;
  qnty: number;
  image: string;
  selected: boolean;
}

export interface InputFieldProps {
  title: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PasswordProps {
  title: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckBoxProps {
  agreed: boolean;
  setAgreed: (value: boolean) => void;
  children: ReactElement;
}

export interface ProductCardProps {
  imageUrl: string;
  title: string;
  rating: number;
  totalReviews: number;
  author: string;
  originalPrice: number;
  off: number;
  isWishlisted: boolean;
  onWishlistClick: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  stockLeft?: number;
}