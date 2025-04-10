import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";

interface RatingDisplayProps {
  rating: number; // Scale 0-10
}

export const Rating = ({ rating }: RatingDisplayProps) => {
  // Calculate how many stars to fill
  const scaledRating = (rating / 10) * 5;

  // How many of that should be full stars
  const fullStars = Math.floor(scaledRating);

  // Half star?
  const hasHalfStar = scaledRating % 1 >= 0.25 && scaledRating % 1 < 0.75;

  // Leave the rest empty
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  //TODO: förbättra aria-labels
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <section className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {/* Full stars */}
              {Array.from({ length: fullStars }).map((_, i) => (
                <Star
                  key={`full-${i}`}
                  fill="currentColor"
                  stroke="currentColor"
                  aria-label="Star rating"
                />
              ))}

              {/* Half star */}
              {hasHalfStar && (
                <StarHalf
                  key="half"
                  fill="currentColor"
                  stroke="currentColor"
                  aria-label="Star rating"
                />
              )}

              {/* Empty stars */}
              {/* TODO: update text-color after color-theme */}
              {Array.from({ length: emptyStars }).map((_, i) => (
                <StarOutline
                  key={`empty-${i}`}
                  fill="none"
                  className="text-gray-400"
                  aria-label="Star rating"
                />
              ))}
            </div>
          </section>
        </TooltipTrigger>
        <TooltipContent>
          <p>Rating {rating.toFixed(1)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
