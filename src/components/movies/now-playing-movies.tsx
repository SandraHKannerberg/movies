import { fetchNowPlayingMovies } from "@/lib/movies/action";
import React from "react";
import { MovieCard } from "./movie-card";
import { Movie } from "@/lib/movies/interfaces";
import { Rating } from "../ui/rating";

export const NowPlayingMovies = async () => {
  // Fetch toprated movies
  const movies = await fetchNowPlayingMovies();

  // Sort by vote
  const sortedByVote = [...movies].sort(
    (a, b) => b.vote_average - a.vote_average
  );

  // Get the 10 movies
  //TODO: make this random later
  const popularMovies: Movie[] = sortedByVote.slice(0, 10);

  return (
    <>
      {popularMovies ? (
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-5 gap-8">
          {popularMovies.map((movie) => (
            <li key={movie.id}>
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
