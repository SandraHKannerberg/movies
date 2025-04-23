import { Movie, MovieDetails } from "@/lib/interfaces/movie-interfaces";
import { formatTime } from "@/lib/utils";
import React from "react";
import { Rating } from "../ui/rating";
import { Genre } from "@/lib/interfaces/category-interfaces";

interface movieDetailsProps {
  movie: MovieDetails;
  className?: string;
}

const Overview = ({ movie, className }: movieDetailsProps) => {
  return (
    <section className={className}>
      <h1 className="text-5xl">{movie.title}</h1>

      {/* Short info */}
      <section className="flex gap-3">
        <p>{movie.release_date.slice(0, 4)}</p>
        <p>{movie.status}</p>
        <p>{formatTime(movie.runtime)}</p>
      </section>

      {/* Rating */}
      <Rating rating={movie.vote_average} count={movie.vote_count} />

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {movie.genres.map((genre: Genre) => (
          <span
            key={genre.id}
            className="px-2 py-1 text-sm bg-neutral-600 rounded-full"
          >
            {genre.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Overview;
