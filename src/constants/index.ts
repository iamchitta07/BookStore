// Image Imports
import BookIMG from "/images/Product.webp";



import type { UnderNavProps, TrendingBookProps } from "../types";

export const underNavEle:UnderNavProps[] = [
    {
        title: "Your Account",
        href: "acc",
    },
    {
        title: "Sell Book",
        href: "sell"
    },
    {
        title: "Publication",
        href: "pubication"
    },
    {
        title: "Author",
        href: "author"
    },
    {
        title: "Vendor",
        href: "vendor"
    }
] 

export const trendingBooks: TrendingBookProps[] = [
  {
    image: BookIMG,
    title: "The Midnight Library",
    shortSummary: "Between life and death there is a library, and within that library, the shelves go on forever.",
    rating: 4.5,
    totalReviews: 12540,
    price: 24.99,
    off: 15,
    href: "/books/the-midnight-library",
    category: ["Fiction", "Fantasy", "Contemporary"]
  },
  {
    image: BookIMG,
    title: "Atomic Habits",
    shortSummary: "An easy and proven way to build good habits and break bad ones.",
    rating: 4.9,
    totalReviews: 45210,
    price: 18.00,
    off: 10,
    href: "/books/atomic-habits",
    category: ["Self-Help", "Psychology", "Productivity"]
  },
  {
    image: BookIMG,
    title: "Project Hail Mary",
    shortSummary: "A lone astronaut must save the earth from disaster in this propulsive sci-fi thriller.",
    rating: 4.7,
    totalReviews: 8900,
    price: 29.99,
    off: 20,
    href: "/books/project-hail-mary",
    category: ["Sci-Fi", "Adventure", "Thriller"]
  },
  {
    image: BookIMG,
    title: "The Silent Patient",
    shortSummary: "A shocking psychological thriller of a woman’s act of violence against her husband.",
    rating: 4.5,
    totalReviews: 15600,
    price: 16.50,
    off: 5,
    href: "/books/the-silent-patient",
    category: ["Mystery", "Thriller", "Crime"]
  },
  {
    image: BookIMG,
    title: "The Psychology of Money",
    shortSummary: "Timeless lessons on wealth, greed, and happiness doing well with money.",
    rating: 4.8,
    totalReviews: 21300,
    price: 22.00,
    off: 12,
    href: "/books/psychology-of-money",
    category: ["Finance", "Business", "Non-Fiction"]
  }
];

