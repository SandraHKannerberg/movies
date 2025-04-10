"use client";

import { fetchMoviesByYear } from "@/lib/movies/action";
import { getRandomMovies } from "@/lib/movies/utils";
import React, { useEffect, useState } from "react";
import { MovieCard } from "./movie-card";
import { Movie } from "@/lib/movies/interfaces";

interface MoviesListProps {
  yearFrom: number;
  yearTo: number;
  showRandom?: boolean;
  className?: string;
  categoryId?: number | undefined;
}

export const MoviesList = ({
  yearFrom,
  yearTo,
  showRandom = false,
  className,
  categoryId,
}: MoviesListProps) => {
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

  // TODO: put loader component here
  if (loading) return <p>Searching for movies...</p>;

  const filteredMovies = categoryId
    ? movies.filter((movie) => movie.genre_ids.includes(categoryId))
    : movies;

  return (
    <>
      {movies ? (
        <ul className={className}>
          {filteredMovies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
