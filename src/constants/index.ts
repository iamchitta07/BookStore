import { ACCORDINO, CAROUSEL } from "./IMAGES";
import type { UnderNavProps, AccordinoProps, CentralCarouselProps } from "../types";

export const colors: string[] = ["#FD5A46", "#FB7DA8", "#A6FAFF", "#A5B4FB", "#058CD7"];

export const underNavEle: UnderNavProps[] = [
  {
    title: "Admin",
    href: "admin",
  },
  {
    title: "Sell Book",
    href: "add-product",
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

// Accordino Constants
export const accordinoConst: AccordinoProps[] = [
  {
    title: "Sci-Fi",
    image: ACCORDINO.SCIFI,
    href: "/category/sci-fi",
    color: "bg-acc-scifi",
  },
  {
    title: "Mythology",
    image: ACCORDINO.MYTHOLOGY,
    href: "/category/mythology",
    color: "bg-acc-religious",
  },
  {
    title: "Mystery",
    image: ACCORDINO.MYSTERY,
    href: "/category/mystery",
    color: "bg-acc-mystery",
  },
  {
    title: "Romance",
    image: ACCORDINO.ROMANCE,
    href: "/category/romance",
    color: "bg-acc-romance",
  },
  {
    title: "History",
    image: ACCORDINO.HISTORY,
    href: "/category/history",
    color: "bg-acc-history",
  },
  {
    title: "Teen, Adults",
    image: ACCORDINO.TEEN,
    href: "/category/teen-adults",
    color: "bg-acc-teen",
  },
];

export const centralCarousel: CentralCarouselProps[] = [
  {
    title: "Fantasy",
    tagline: "DEFY REALITY. ENTER THE UNKNOWN.",
    img: CAROUSEL.FANTASY,
    url: "/category/fantasy",
  },
  {
    title: "Horror",
    tagline: "FACE YOUR FEARS.READ IF YOU DARE.",
    img: CAROUSEL.HORROR,
    url: "/category/horror",
  },
  {
    title: "Action & Adventure",
    tagline: "FEEL THE RUSH. CONQUER THE WORLD.",
    img: CAROUSEL.ACTION,
    url: "/category/action",
  },
  {
    title: "Biography & Memoir",
    tagline: "REAL LIVES. RAW STORIES.",
    img: CAROUSEL.BIOGRAPHY,
    url: "/category/biography",
  },
  {
    title: "Comedy & Humor",
    tagline: "LIGHTEN UP. LAUGH IT OFF.",
    img: CAROUSEL.COMEDY,
    url: "/category/comedy",
  },
  {
    title: "Comics Guide",
    tagline: "FIND THE PERFECT COMIC BOOK FOR YOURSELF",
    img: CAROUSEL.COMICS,
    url: "/category/comics",
  },
];
