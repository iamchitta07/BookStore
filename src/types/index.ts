import type { ReactElement, MouseEventHandler } from "react";

export interface UnderNavProps {
  title: string;
  href: string;
}

export interface TrendingBookProps {
  image: string;
  title: string;
  author: string;
  price: number;
  off: number;
  isbn: string;
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
  username: string;
  sold: number;
  rank: number;
}

export interface AccordinoProps {
  title: string;
  image: string;
  href: string;
  color: string;
}

export interface CartProps {
  id: number;
  publisher: string;
  title: string;
  isbn: string;
  inStock: boolean;
  price: number;
  off: number;
  qnty: number;
  image: string;
  selected: boolean;
  onUpdateQuantity: (id: number, newQnty: number) => void;
  onRemove: (id: number) => void;
  onToggleSelection?: (id: number, isSelected: boolean) => void;
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
  id: number;
  imageUrl: string;
  title: string;
  isbn: string;
  author: string;
  originalPrice: number;
  off: number;
  isWishlisted: boolean;
  onWishlistClick?: () => void;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  stockLeft?: number;
}

export interface CentralCarouselProps {
  img: string;
  url?: string;
  tagline?: string;
  title?: string;
}

export interface NavigateBtnProps {
  onClickFn: MouseEventHandler;
  children: ReactElement;
  className: string;
  aralLabel: string;
}

export interface InputUserProps {
  label: string;
  name: string;
  value: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  color?: string;
  type?: string | undefined;
}

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  role: string;
  username: string;
}

export interface BookResponse {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  edition?: string;
  publication_year?: number;
  price: number;
  category: string[];
  description?: string;
  cover_image_url?: string;
  discount_percentage?: number;
  stock_quantity: number;
  admin_id?: number;
  reviews?: any[];
}

export interface FavouriteResponse {
  id: number;
  book_id: number;
  user_id: number;
  book: BookResponse;
}

export interface BackendCartItemProps {
  id: number;
  book_id: number;
  quantity: number;
  book: {
    title: string;
    isbn: string;
    publisher: string;
    price: number;
    discount_percentage: number;
    stock_quantity: number;
    cover_image_url: string;
  };
}

export interface PublicUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface ReviewItem {
  id: number;
  user_id: number;
  book_id: number;
  rating: number;
  comment?: string;
  timestamp: string;
}

export interface ReviewProps {
    handleSubmitReview: (e: React.FormEvent) => void;
    newRating: number;
    setNewRating: (r: number) => void;
    newComment: string;
    setNewComment: (c: string) => void;
    reviews: ReviewItem[];
    reviewUsers: Record<number, string>;
    submitLoading: boolean;
    submitError: string | null;
    submitSuccess: boolean;
}