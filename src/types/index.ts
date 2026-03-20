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
  reviews: number;
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