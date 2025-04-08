"use client";

import { fetchMoviesByYear } from "@/lib/movies/action";
import { getRandomMovies } from "@/lib/movies/utils";
import React, { useEffect, useState } from "react";
import { MovieCard } from "./movie-card";
import { Movie } from "@/lib/movies/interfaces";

export const MoviesList = ({
  yearFrom,
  yearTo,
  showRandom = false,
  className,
}: {
  yearFrom: number;
  yearTo: number;
  showRandom?: boolean;
  className?: string;
}) => {
  // let movies;

  //   if (year) {
  //     movies = await fetchMoviesByYear(year);
  //     movies = movies ?? [];

  //     if (showRandom) {
  //       movies = getRandomMovies(movies, 5);
  //     }
  //   }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        let fetchedMovies = await fetchMoviesByYear(yearFrom, yearTo);
        fetchedMovies = fetchedMovies ?? [];

        // If 'showRandom' = true, get random movies
        if (showRandom) {
          fetchedMovies = getRandomMovies(fetchedMovies, 5);
        }

        // Put movies in a state
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (yearFrom && yearTo) {
      fetchMovies(); // Call the async function
    }
  }, [yearFrom, yearTo, showRandom]); // Run when year or showRandom change

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
