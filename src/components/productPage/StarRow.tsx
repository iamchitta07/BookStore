import { FaStar, FaRegStar } from "react-icons/fa";

const StarRow = ({
  rating,
  size = 20,
  interactive = false,
  onSelect,
}: {
  rating: number;
  size?: number;
  interactive?: boolean;
  onSelect?: (r: number) => void;
}) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) =>
      rating >= s ? (
        <FaStar
          key={s}
          size={size}
          className={`text-yellow-400 ${interactive ? "cursor-pointer hover:scale-125 transition-transform" : ""}`}
          onClick={() => interactive && onSelect?.(s)}
        />
      ) : (
        <FaRegStar
          key={s}
          size={size}
          className={`text-yellow-400 ${interactive ? "cursor-pointer hover:scale-125 transition-transform" : ""}`}
          onClick={() => interactive && onSelect?.(s)}
        />
      ),
    )}
  </div>
);

export default StarRow;
