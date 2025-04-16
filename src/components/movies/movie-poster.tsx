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
        className="object-cover rounded-lg shadow-lg h-auto w-full"
        priority
      />
    </figure>
  );
};

export default MoviePoster;
