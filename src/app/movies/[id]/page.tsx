import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { fetchMovieById, fetchMovieCredits } from "@/lib/data-access";
import React from "react";
import Details from "@/components/movies/movie-details";
import MoviePoster from "@/components/movies/movie-poster";
import Overview from "@/components/movies/movie-overview";
import MovieCast from "@/components/movies/movie-cast";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const movie = await fetchMovieById(id);
  const credits = await fetchMovieCredits(id);

  return (
    <>
      <section
        className="relative w-full h-[600px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }}
      >
        {/* Gradient fade to main */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-background z-20" />
      </section>
      <main className="py-10 relative">
        <MaxWidthWrapper className="grid grid-cols-2 px-3 md:px-20 max-h-fit gap-5 justify-center items-center">
          {/* Short overview */}
          <Overview
            movie={movie}
            className={"flex flex-col gap-5 col-span-2"}
          ></Overview>

          {/* More details */}
          <Details
            movie={movie}
            credits={credits}
            className={"flex flex-col col-span-2 lg:col-span-1"}
          ></Details>

          {/* Movie poster */}
          <MoviePoster
            movie={movie}
            className={
              "w-75 col-span-2 h-auto justify-self-center lg:col-span-1 lg:justify-self-end"
            }
          ></MoviePoster>

          {/* Cast */}
          <MovieCast
            credits={credits}
            movie={movie}
            className={"col-span-2 grid grid-cols-2 md:grid-cols-4 gap-5"}
          ></MovieCast>

          {/* TODO: Similar movies */}
          {/* TODO: Movie reviews */}
        </MaxWidthWrapper>
      </main>
    </>
  );
}
