import type { FC } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

import type { CentralCarouselProps } from "../../types";

const CarouselOne: FC< CentralCarouselProps & {len:number}> = ({ len, img, title, tagline, url }) => {
  return (
    <div className="h-full shrink-0 relative" style={{ width: `${100 / len}%` }}>
      <img src={img} alt={title} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-center px-4">
        {/* UI Overlay */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest uppercase mb-4 text-[#FACC15] drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
          style={{ WebkitTextStroke: "2px black" }}
        >
          {title}
        </h1>

        <p className="text-lg md:text-2xl font-bold text-white mb-8 tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          {tagline}
        </p>

        <Link
          to={url || "#"}
          className="flex flex-row items-center justify-center gap-2 bg-[#FFB03A] text-black border-[3px] border-black rounded-full px-8 py-3 font-bold text-lg hover:bg-[#ff9c0f] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[5px_5px_0px_rgba(0,0,0,1)]"
        >
          EXPLORE NOW
          <FiChevronRight size={24} strokeWidth={3} className="mt-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default CarouselOne;
