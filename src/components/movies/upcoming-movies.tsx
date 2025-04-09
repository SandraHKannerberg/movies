import { fetchUpcomingMovies } from "@/lib/movies/action";
import React from "react";
import { MovieCard } from "./movie-card";
import { Movie } from "@/lib/movies/interfaces";
import { Rating } from "../ui/rating";

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
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-5 gap-8">
          {upcomingMovies.map((movie) => (
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
