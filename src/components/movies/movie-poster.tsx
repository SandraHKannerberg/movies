import { MovieDetails } from "@/lib/interfaces/movie-interfaces";
import React from "react";
import Image from "next/image";

interface movieDetailsProps {
  movie: MovieDetails;
  className?: string;
}

const MoviePoster = ({ movie, className }: movieDetailsProps) => {
  return (
    <figure className={className}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`Movie Poster of ${movie.title}`}
        width={200}
        height={300}
        className="rounded-lg shadow-lg w-full h-full object-contain"
        priority
      />
    </figure>
  );
};

export default MoviePoster;
