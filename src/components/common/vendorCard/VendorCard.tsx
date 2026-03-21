import { Link } from "react-router-dom";
import type { FC, CSSProperties } from "react";

import type { VendorProps } from "../../../types";
import { colorByRank, formatUsNumber } from "../../../utils";
import { colors } from "../../../constants";
import StarRating from "../ratingComp/StarRating";

const VendorCard: FC<VendorProps> = ({ name, sold, rating, rank, href, image }) => {

    const rgbCol = colorByRank(rank);
    const rankColor = colors[rank - 1];

  return (
    <Link
      to={href}
      className="grid grid-cols-5 w-74 h-30 border-3 duration-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_var(--vendor-color)] bg-white rounded-xl"
      style={{ "--vendor-color": rgbCol } as CSSProperties}
    >
      <div className="col-span-2 flex justify-center items-center">
        <div className="h-24 w-24 rounded-2xl relative">
          <div
            className="absolute top-0 left-0 -translate-1/5 rounded-full border-black border w-5 h-5 flex justify-center items-center"
            style={{
              backgroundColor: rankColor,
              boxShadow: `1px 1px 0px ${rgbCol}`,
            }}
          >
            {rank}
          </div>
          <img
            src={image}
            className="h-24 w-24 rounded-2xl border-2 duration-300 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            alt={name + rank}
          />
        </div>
      </div>

      <div className="col-span-3 my-auto ml-2">
        <h1 className="uppercase font-bold">{name}</h1>
        <h1 className="text-expired">Sold {formatUsNumber(sold)} copies of book.</h1>
        <StarRating rating={rating} />
      </div>
    </Link>
  );
};

export default VendorCard;
