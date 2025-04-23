import React from "react";
import { MovieCard } from "./movie-card";
import { Movie } from "@/lib/interfaces/movie-interfaces";

interface MoviesListProps {
  yearFrom?: number;
  yearTo?: number;
  showRandom?: boolean;
  className?: string;
  movies: Movie[];
}

export const MoviesList = ({ className, movies }: MoviesListProps) => {
  return (
    <>
      {movies.length !== 0 ? (
        <ul className={className}>
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found in selected category</p>
      )}
    </>
  );
};
