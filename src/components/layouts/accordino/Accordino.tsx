import { useState } from "react";
import { Link } from "react-router-dom";
import { accordinoConst } from "../../../constants";

const Accordino = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="w-full px-4 py-10 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row w-full h-200 border-5 border-black overflow-hidden">
        {accordinoConst.map((panel, index) => {
          const isActive = index === activeIndex;
          const isLast = index === accordinoConst.length - 1;

          return (
            <Link
              to={panel.href}
              key={panel.title}
              onMouseEnter={() => setActiveIndex(index)}
              className={`
                relative cursor-pointer overflow-hidden no-underline
                transition-all duration-500 ease-in-out
                ${panel.color}
                ${!isLast ? "border-r-5 border-black" : ""}
                ${isActive ? "flex-5" : "flex-2"}
              `}
            >
              {/* ── Expanded state ── */}
              <div
                className={`
                  absolute inset-0 bg-cover bg-bottom bg-no-repeat
                  transition-opacity duration-500
                  ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
                style={{ backgroundImage: `url(${panel.image})` }}
              >
                <h2 className="text-8xl font-bold uppercase text-bold p-6 md:p-8">
                  {panel.title}
                </h2>
              </div>

              {/* ── Collapsed state – vertical text ── */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  transition-opacity duration-500
                  ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
              >
                <span
                  className="text-5xl font-bold uppercase text-bold whitespace-nowrap"
                  style={{ writingMode: "vertical-rl", rotate: "180deg" }}
                >
                  {panel.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Accordino;
