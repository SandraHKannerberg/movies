import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  count: number;
  className?: string;
}

export const Rating = ({ rating, count, className }: RatingDisplayProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="max-w-fit">
          <section className="flex items-center gap-2 max-w-fit">
            <Star
              fill="currentColor"
              stroke="currentColor"
              aria-label={`Rating ${rating.toFixed(1)} of ${count.toFixed(
                0
              )} votes`}
              className="text-yellow-400"
            />
            <p className="font-bold">{rating?.toFixed(1)} / 10</p>
          </section>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Rating {rating?.toFixed(1)} of {count?.toFixed(0)} votes
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
