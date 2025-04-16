import { fetchUpcomingMovies } from "@/lib/data-access";
import React from "react";
import { MovieCard } from "./movie-card";
import { Rating } from "../ui/rating";
import clsx from "clsx";
import { Movie } from "@/lib/interfaces/movie-interfaces";

export const UpcomingMovies = async () => {
  const movies = await fetchUpcomingMovies();

  // Sort by release-date
  const sortedByReleaseDate = [...movies].sort(
    (a, b) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  // Display 10 movies
  const upcomingMovies: Movie[] = sortedByReleaseDate.slice(0, 10);
  return (
    <>
      {upcomingMovies ? (
        <ul className="grid justify-center grid-cols-2 gap-3 px-3 sm:grid-cols-4 md:grid-cols-5 md:gap-y-8 md:px-0">
          {upcomingMovies.map((movie, index) => (
            <li
              key={movie.id}
              className={clsx(
                // for sm devices - the first two movie-card span 2 cols
                index < 2 ? "sm:col-span-2" : "sm:col-span-1",
                // from md all movie-card span 1 col
                "md:col-span-1",
                // Baselayout
                "col-span-1"
              )}
            >
              <MovieCard movie={movie} />
              <h3 className="my-3 text-lg">Release {movie.release_date}</h3>
              <Rating rating={movie.vote_average} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
