import { Link } from "react-router-dom";
import type { FC, CSSProperties } from "react";
import { FaUser } from "react-icons/fa6";

import type { VendorProps } from "../../../types";
import { colorByRank, formatUsNumber } from "../../../utils";
import { colors } from "../../../constants";

const VendorCard: FC<VendorProps> = ({ username, sold, rank }) => {
  const rgbCol = colorByRank(rank);
  const rankColor = colors[rank - 1];

  return (
    <Link
      to={username}
      className="grid grid-cols-[120px_1fr] w-full h-30 border duration-300 shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_var(--vendor-color)] bg-white"
      style={{ "--vendor-color": rgbCol } as CSSProperties}
    >
      <div className=" flex justify-center items-center">
        <div className="h-24 w-24 rounded-xl relative">
          <div
            className="absolute top-0 left-0 -translate-1/5 rounded-full border-black border w-5 h-5 flex justify-center items-center"
            style={{
              backgroundColor: rankColor,
              boxShadow: `1px 1px 0px ${rgbCol}`,
            }}
          >
            {rank}
          </div>
          <div 
            className="h-24 w-24 rounded-xl border-2 duration-300 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] flex justify-center items-center">
            <FaUser size={60} />
          </div>
        </div>
      </div>

      <div className="my-auto ml-2">
        <h1 className="font-bold">{username}</h1>
        <h1 className="text-expired">Sold {formatUsNumber(sold)} copies of book.</h1>
      </div>
    </Link>
  );
};

export default VendorCard;
