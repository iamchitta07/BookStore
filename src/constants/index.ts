import { ACCORDINO, CAROUSEL } from "./IMAGES";
import type {
  UnderNavProps,
  AccordinoProps,
  CentralCarouselProps,
} from "../types";

export const colors: string[] = ["#FD5A46", "#FB7DA8", "#A6FAFF", "#A5B4FB", "#058CD7"];

export const underNavEle: UnderNavProps[] = [
  {
    title: "Admin",
    href: "admin",
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


// Accordino Constants
export const accordinoConst: AccordinoProps[] = [
  {
    title: "Sci-Fi",
    image: ACCORDINO.SCIFI,
    href: "/shop?categories=sci-fi",
    color: "bg-acc-scifi",
  },
  {
    title: "Mythology",
    image: ACCORDINO.MYTHOLOGY,
    href: "/shop?categories=mythology",
    color: "bg-acc-religious",
  },
  {
    title: "Mystery",
    image: ACCORDINO.MYSTERY,
    href: "/shop?categories=mystery",
    color: "bg-acc-mystery",
  },
  {
    title: "Romance",
    image: ACCORDINO.ROMANCE,
    href: "/shop?categories=romance",
    color: "bg-acc-romance",
  },
  {
    title: "History",
    image: ACCORDINO.HISTORY,
    href: "/shop?categories=history",
    color: "bg-acc-history",
  },
  {
    title: "Teen, Adults",
    image: ACCORDINO.TEEN,
    href: "/shop?categories=teen-adults",
    color: "bg-acc-teen",
  },
];

export const centralCarousel: CentralCarouselProps[] = [
  {
    title: "Fantasy",
    tagline: "DEFY REALITY. ENTER THE UNKNOWN.",
    img: CAROUSEL.FANTASY,
    url: "/shop?categories=fantasy",
  },
  {
    title: "Horror",
    tagline: "FACE YOUR FEARS.READ IF YOU DARE.",
    img: CAROUSEL.HORROR,
    url: "/shop?categories=horror",
  },
  {
    title: "Action & Adventure",
    tagline: "FEEL THE RUSH. CONQUER THE WORLD.",
    img: CAROUSEL.ACTION,
    url: "/shop?categories=action",
  },
  {
    title: "Biography & Memoir",
    tagline: "REAL LIVES. RAW STORIES.",
    img: CAROUSEL.BIOGRAPHY,
    url: "/shop?categories=biography",
  },
  {
    title: "Comedy & Humor",
    tagline: "LIGHTEN UP. LAUGH IT OFF.",
    img: CAROUSEL.COMEDY,
    url: "/shop?categories=comedy",
  },
  {
    title: "Comics Guide",
    tagline: "FIND THE PERFECT COMIC BOOK FOR YOURSELF",
    img: CAROUSEL.COMICS,
    url: "/shop?categories=comics",
  },
];
