import React from "react";
import { MovieCard } from "./movie-card";
import { Movie } from "@/lib/interfaces/movie-interfaces";

interface MoviesListProps {
  yearFrom: number;
  yearTo: number;
  showRandom?: boolean;
  className?: string;
  categoryId?: number | undefined;
  movies: Movie[];
}

export const MoviesList = ({
  className,
  categoryId,
  movies,
}: MoviesListProps) => {
  // const filteredMovies = categoryId
  //   ? movies.filter((movie) => movie.genre_ids.includes(categoryId))
  //   : movies;

  return (
    <>
      {movies ? (
        <ul className={className}>
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
