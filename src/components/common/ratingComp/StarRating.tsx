import { useId, type FC } from "react";
import type { StarRatingProps } from "../../../types";
import { numFormatterUS } from "../../../utils";

const StarRating: FC<StarRatingProps> = ({
  rating,
  reviews = undefined,
  color = "#FFF59F",
  strokeColor = "#F8C315",
}) => {
  const uniqueId = useId();
  const validatedRating = Math.min(5, Math.max(0, rating));

  return (
    <div className="flex items-end space-x-1">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;

        // Calculate fill percentage for this specific star
        let fillPercent = 0;
        if (starIndex <= validatedRating) {
          fillPercent = 100;
        } else if (starIndex - 1 < validatedRating) {
          fillPercent = (validatedRating % 1) * 100;
        }

        return (
          <div key={index} className="relative w-6 h-6">
            <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Define a unique gradient for each star to handle partial fills */}
              <defs>
                <linearGradient id={`grad-${uniqueId}-${index}`}>
                  <stop offset={`${fillPercent}%`} stopColor={color} />
                  <stop offset={`${fillPercent}%`} stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* The Star Path */}
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill={`url(#grad-${uniqueId}-${index})`}
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      })}
      {reviews !== undefined && (
        <div className="ml-2 text-md font-bold text-black">{numFormatterUS(reviews)}</div>
      )}
    </div>
  );
};

export default StarRating;
