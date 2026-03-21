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