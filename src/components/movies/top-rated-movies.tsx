import { fetchTopRatedMovies } from "@/lib/movies/action";
import React from "react";
import { MovieCard } from "./movie-card";
import { Movie } from "@/lib/movies/interfaces";
import { Rating } from "../ui/rating";

export const TopRatedMovies = async () => {
  // Fetch toprated movies
  const movies = await fetchTopRatedMovies();

  // Sort by vote
  const sortedByVote = [...movies].sort(
    (a, b) => b.vote_average - a.vote_average
  );

  // Get the 10 movies
  //TODO: make this random later
  const topRatedMovies: Movie[] = sortedByVote.slice(0, 10);

  return (
    <>
      {topRatedMovies ? (
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-5 gap-8">
          {topRatedMovies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
              {/* Slice the year from date */}
              <h3 className="my-3 text-lg">
                From year {movie.release_date.slice(0, 4)}
              </h3>
              <Rating rating={movie.vote_average} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
