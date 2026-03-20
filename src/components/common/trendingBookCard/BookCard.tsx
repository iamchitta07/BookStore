import type { FC } from "react";
import { Link } from "react-router-dom";
import type { TrendingBookProps } from "../../../types";

import StarRating from "../ratingComp/StarRating";
import PriceTag from "../priceTag/PriceTag";

const BookCard: FC<TrendingBookProps> = ({
  image,
  title,
  shortSummary,
  rating,
  totalReviews,
  price,
  off,
  href,
  category,
}) => {
  return (
    <Link
      to={href}
      className="grid grid-cols-3 w-88 h-40 border-2 duration-200 hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] bg-white"
    >
      <div className="col-span-1 flex justify-center items-center">
        <img
          src={image}
          alt={title}
          className=" h-36 w-26 border duration-200 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]"
        />
      </div>
      <div className="pl-2 col-span-2 flex flex-col my-auto">
        <h1 className="text-xl font-bold">{title}</h1>
        <StarRating reviews={totalReviews} rating={rating} />
        <p className="text-[10px]">{shortSummary}</p>
        <PriceTag price={price} off={off} />
        <div className="flex gap-1">
          {category.map((ele, idx) => (
            <h1 key={idx} className="text-col-six text-xs">
              {"#"}
              {ele}
            </h1>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
