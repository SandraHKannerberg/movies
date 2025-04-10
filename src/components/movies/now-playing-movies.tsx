import { fetchNowPlayingMovies } from "@/lib/movies/action";
import React from "react";
import { MovieCard } from "./movie-card";
import { Movie } from "@/lib/movies/interfaces";
import { Rating } from "../ui/rating";
import clsx from "clsx";

export const NowPlayingMovies = async () => {
  const movies = await fetchNowPlayingMovies();

  // Sort by vote
  const sortedByVote = [...movies].sort(
    (a, b) => b.vote_average - a.vote_average
  );

  // Display 10 movies
  const popularMovies: Movie[] = sortedByVote.slice(0, 10);

  return (
    <>
      {popularMovies ? (
        <ul className="grid justify-center grid-cols-2 gap-3 px-3 sm:grid-cols-4 md:grid-cols-5 md:gap-y-8">
          {popularMovies.map((movie, index) => (
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
