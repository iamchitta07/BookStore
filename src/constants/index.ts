import { BookIMG, UserIMG, HISTORY, MYSTERY, RELIGIOUS, ROMANCE, SCIFI, TEEN } from "./IMAGES";
import type { UnderNavProps, TrendingBookProps, VendorProps, AccordinoProps } from "../types";

export const colors: string[] = ["#FD5A46", "#FB7DA8", "#A6FAFF", "#A5B4FB", "#058CD7"];

export const underNavEle: UnderNavProps[] = [
  {
    title: "Your Account",
    href: "acc",
  },
  {
    title: "Sell Book",
    href: "sell",
  },
  {
    title: "Publication",
    href: "pubication",
  },
  {
    title: "Author",
    href: "author",
  },
  {
    title: "Vendor",
    href: "vendor",
  },
];

// Will be Replaced with Dynamic Values
export const trendingBooks: TrendingBookProps[] = [
  {
    image: BookIMG,
    title: "The Midnight Library",
    shortSummary:
      "Between life and death there is a library, and within that library, the shelves go on forever.",
    rating: 4.5,
    totalReviews: 12540,
    price: 24.99,
    off: 15,
    href: "/books/the-midnight-library",
    category: ["Fiction", "Fantasy", "Contemporary"],
  },
  {
    image: BookIMG,
    title: "Atomic Habits",
    shortSummary: "An easy and proven way to build good habits and break bad ones.",
    rating: 4.9,
    totalReviews: 45210,
    price: 18.0,
    off: 10,
    href: "/books/atomic-habits",
    category: ["Self-Help", "Psychology", "Productivity"],
  },
  {
    image: BookIMG,
    title: "Project Hail Mary",
    shortSummary:
      "A lone astronaut must save the earth from disaster in this propulsive sci-fi thriller.",
    rating: 4.7,
    totalReviews: 8900,
    price: 29.99,
    off: 20,
    href: "/books/project-hail-mary",
    category: ["Sci-Fi", "Adventure", "Thriller"],
  },
  {
    image: BookIMG,
    title: "The Silent Patient",
    shortSummary:
      "A shocking psychological thriller of a woman’s act of violence against her husband.",
    rating: 4.5,
    totalReviews: 15600,
    price: 16.5,
    off: 5,
    href: "/books/the-silent-patient",
    category: ["Mystery", "Thriller", "Crime"],
  },
  {
    image: BookIMG,
    title: "The Psychology of Money",
    shortSummary: "Timeless lessons on wealth, greed, and happiness doing well with money.",
    rating: 4.8,
    totalReviews: 21300,
    price: 22.0,
    off: 12,
    href: "/books/psychology-of-money",
    category: ["Finance", "Business", "Non-Fiction"],
  },
];

// Will be Replaced with Dynamic Values
export const topVendor: VendorProps[] = [
  {
    name: "Chittajit Nath",
    href: "iamchitta07",
    sold: 1000390,
    rating: 4.2,
    rank: 1,
    image: UserIMG,
  },
  {
    name: "Subhrajit Maitra",
    href: "iamchitta07",
    sold: 10003,
    rating: 4.8,
    rank: 2,
    image: UserIMG,
  },
  {
    name: "Arghajit Saha",
    href: "iamchitta07",
    sold: 1000088,
    rating: 4.2,
    rank: 3,
    image: UserIMG,
  },
  {
    name: "Ullas Das",
    href: "iamchitta07",
    sold: 77237,
    rating: 3.9,
    rank: 4,
    image: UserIMG,
  },
  {
    name: "Debanjan Pal",
    href: "iamchitta07",
    sold: 8723,
    rating: 3.4,
    rank: 5,
    image: UserIMG,
  },
];

// Accordino Constants
export const accordinoConst: AccordinoProps[] = [
  {
    title: "Sci-Fi",
    image: SCIFI,
    href: "sci-fi",
    color: "bg-acc-scifi",
  },
  {
    title: "Regligious",
    image: RELIGIOUS,
    href: "regligious",
    color: "bg-acc-religious",
  },
  {
    title: "Mystery, Thriller",
    image: MYSTERY,
    href: "mystery",
    color: "bg-acc-mystery",
  },
  {
    title: "Romance",
    image: ROMANCE,
    href: "romanceRegligious",
    color: "bg-acc-romance",
  },
  {
    title: "History",
    image: HISTORY,
    href: "history",
    color: "bg-acc-history",
  },
  {
    title: "Teen, Adults",
    image: TEEN,
    href: "teen-adults",
    color: "bg-acc-teen",
  },
];
