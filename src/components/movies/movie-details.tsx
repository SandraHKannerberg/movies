import { Credits } from "@/lib/interfaces/credits-interfaces";
import { MovieDetails } from "@/lib/interfaces/movie-interfaces";
import React from "react";
import MovieCrew from "./movie-crew";

interface movieDetailsProps {
  movie: MovieDetails;
  credits: Credits;
  className?: string;
}

const Details = ({ movie, credits, className }: movieDetailsProps) => {
  return (
    <section className={className}>
      <p>{movie.overview}</p>

      <h2 className="uppercase text-lg font-semibold mt-5">Original title</h2>
      <p>{movie.original_title}</p>

      <h2 className="uppercase text-lg font-semibold mt-5">
        Original language
      </h2>
      <p>{movie.original_language}</p>

      <MovieCrew credits={credits}></MovieCrew>

      <h2 className="uppercase text-lg font-semibold mt-5">Release date</h2>
      <p>{movie.release_date}</p>
    </section>
  );
};

export default Details;
