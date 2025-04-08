import { fetchMoviesByYear } from "@/lib/movies/action";
import { getRandomMovies } from "@/lib/movies/utils";
import React from "react";
import { MovieCard } from "./movie-card";

export const MoviesList = async ({
  year,
  showRandom = false,
  className,
}: {
  year: number;
  showRandom?: boolean;
  className?: string;
}) => {
  let movies;

  if (year) {
    movies = await fetchMoviesByYear(year);
    movies = movies ?? [];

    if (showRandom) {
      movies = getRandomMovies(movies, 5);
    }
  }

  return (
    <>
      {movies ? (
        <section className={className}>
          <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-5 gap-8">
            {movies.map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
};
