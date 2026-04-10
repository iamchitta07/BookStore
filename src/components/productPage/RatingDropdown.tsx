import {useState, useEffect, useRef} from "react";
import { FaStar } from "react-icons/fa";
import { LuChevronDown } from "react-icons/lu";

const RatingDropdown = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block w-48">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center justify-between w-full px-4 py-3 bg-col-one border-4 border-black font-black text-lg shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all ${
          open ? "shadow-none translate-x-1 translate-y-1" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          {value > 0 ? (
            <>
              <span>{value}</span>
              <FaStar className="text-yellow-600" size={16} />
            </>
          ) : (
            <span>Rating</span>
          )}
        </div>
        <LuChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          size={18}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border-4 border-black shadow-[4px_4px_0px_#000]">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                onChange(n);
                setOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-2 text-left font-bold text-lg hover:bg-col-one transition-colors border-b-2 border-black last:border-b-0 ${
                value === n ? "bg-col-one" : ""
              }`}
            >
              <span>{n}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: n }).map((_, i) => (
                  <FaStar key={i} size={14} className="text-yellow-500" />
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingDropdown