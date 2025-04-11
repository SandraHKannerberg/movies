import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { fetchMovieById } from "@/lib/data-access";
import React from "react";
import Image from "next/image";
import { Rating } from "@/components/ui/rating";
import { Genre } from "@/lib/interfaces/category-interfaces";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const movie = await fetchMovieById(id);

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
        <MaxWidthWrapper className="grid grid-cols-1 px-3 lg:px-0 md:grid-cols-2 gap-8 max-h-fit">
          <section className="flex flex-col gap-5">
            <h1 className="text-5xl">{movie.title}</h1>

            {/* Short info */}
            <section className="flex gap-3">
              <p>{movie.release_date.slice(0, 4)}</p>
              <p>{movie.status}</p>
            </section>

            {/* Rating */}
            <Rating rating={movie.vote_average} />

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {movie.genres.map((genre: Genre) => (
                <span
                  key={genre.id}
                  className="px-2 py-1 text-sm bg-neutral-600 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Movie details and description/overview */}
            <section className="flex flex-col">
              <p>{movie.overview}</p>

              <h2 className="uppercase text-lg font-semibold mt-5">
                Original title
              </h2>
              <p>{movie.original_title}</p>

              <h2 className="uppercase text-lg font-semibold mt-5">
                Original language
              </h2>
              <p>{movie.original_language}</p>

              <h2 className="uppercase text-lg font-semibold mt-5">
                Release date
              </h2>
              <p>{movie.release_date}</p>
            </section>
          </section>

          {/* Movie poster */}
          <figure className="w-100 h-auto justify-self-center md:justify-self-end">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Movie Poster of ${movie.title}`}
              width={200}
              height={300}
              className="object-cover rounded-lg shadow-lg h-auto w-full"
              priority
            />
          </figure>
        </MaxWidthWrapper>
      </main>
    </>
  );
}
