import { fetchTopRatedMovies } from "@/lib/data-access";
import React from "react";
import { MovieCard } from "./movie-card";
import { Rating } from "../ui/rating";
import clsx from "clsx";
import { Movie } from "@/lib/interfaces/movie-interfaces";

export const TopRatedMovies = async () => {
  // Fetch toprated movies
  const movies = await fetchTopRatedMovies();

  // Display 10 movies
  const topRatedMovies: Movie[] = movies.slice(0, 10);

  return (
    <>
      {topRatedMovies ? (
        <ul className="grid justify-center grid-cols-2 gap-3 px-3 sm:grid-cols-4 md:grid-cols-5 md:gap-y-8 md:px-0">
          {topRatedMovies.map((movie, index) => (
            <li
              key={movie.id}
              className={clsx(
                // for sm devices - the first two movie-card span 2 cols
                index < 2 ? "sm:col-span-2" : "sm:col-span-1",
                // from md all movie-card span 1 col
                "md:col-span-1",
                // Baselayout
                "col-span-1 flex flex-col justify-center items-center"
              )}
            >
              <MovieCard movie={movie} />
              {/* Slice the year from date */}
              <h3 className="my-3 text-lg text-center">
                From year {movie.release_date.slice(0, 4)}
              </h3>
              <Rating rating={movie.vote_average} count={movie.vote_count} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
