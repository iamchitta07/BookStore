import ProductCard2 from "../common/bookCard/ProductCard2";
import type { ProductCardProps } from "../../types";

const data: ProductCardProps[] = [
  {
    isbn: "9780385742801",
    title: "Tether",
    author: "Anna Jarzab",
    originalPrice: 1262.3,
    imageUrl:
      "https://books.google.com/books/content?id=G_kBDAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    off: 20,
    id: 23,
    stockLeft: 63,
    isWishlisted: false,
  },
  {
    isbn: "9780553260199",
    title: "The Holcroft Covenant",
    author: "Robert Ludlum",
    originalPrice: 1868.45,
    imageUrl:
      "https://books.google.com/books/content?id=afSBdDkZTgkC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    off: 20,
    id: 24,
    stockLeft: 94,
    isWishlisted: false,
  },
  {
    isbn: "9780226502625",
    title: "Mythistory",
    author: "Joseph Mali",
    originalPrice: 1693.42,
    imageUrl:
      "https://books.google.com/books/content?id=aX6Cx2ncsWsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    off: 20,
    id: 11,
    stockLeft: 100,
    isWishlisted: false,
  },
  {
    isbn: "9780857500069",
    title: "Tripwire",
    author: "Lee Child",
    originalPrice: 844.46,
    imageUrl:
      "https://books.google.com/books/content?id=MBtctNppOJAC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    off: 20,
    id: 25,
    stockLeft: 29,
    isWishlisted: false,
  },
  {
    isbn: "9780857500069",
    title: "Tripwire",
    author: "Lee Child",
    originalPrice: 844.46,
    imageUrl:
      "https://books.google.com/books/content?id=MBtctNppOJAC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    off: 20,
    id: 25,
    stockLeft: 29,
    isWishlisted: false,
  },
  {
    isbn: "9780752858548",
    title: "The Bourne Identity",
    author: "Robert Ludlum",
    originalPrice: 1343.08,
    imageUrl:
      "https://books.google.com/books/content?id=Jp1hPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    off: 20,
    id: 34,
    stockLeft: 36,
    isWishlisted: false,
  },
];

const DealsOfTheWk = () => {
  return (
    <div className="w-[90%] border-2 rounded-xl grid grid-cols-2 gap-4 p-4">
      {data.map((item) => (
        <ProductCard2 key={item.id} {...item} />
      ))}
    </div>
  );
};

export default DealsOfTheWk;
