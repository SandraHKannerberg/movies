import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { AgeRangeSelect } from "@/components/navigation/age-range-select";
import { MoviesList } from "@/components/movies/movies-list";
import { CategorySelect } from "@/components/navigation/category-select";
// import { Genre } from "@/lib/categories-genres/interfaces";
import { fetchAllGenres, fetchMoviesByYear } from "@/lib/data-access";

import React, { Suspense } from "react";

export default async function NostalgiaPage({
  params,
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;

  const { yearFrom, yearTo, category, page } = await searchParams;

  // Year of birth
  const year = parseInt(query as string, 10);

  // Year from
  const yearFromParsed: number =
    parseInt(Array.isArray(yearFrom) ? yearFrom[0] : yearFrom ?? "", 10) ||
    year; // fallback

  // YearTo
  const yearToParsed: number =
    parseInt(Array.isArray(yearTo) ? yearTo[0] : yearTo ?? "", 10) || year; // fallback

  // Fetch movies
  const movies = await fetchMoviesByYear(yearFromParsed, yearToParsed);

  // Om kategori finns filtrera filmer movies.filter osv filter function

  // const categories = fetchAllGenres(); // This is a Promise<Genre[]>

  return (
    <>
      <section className="relative bg-[url('/assets/images/movie.jpg')] bg-cover bg-center w-full flex flex-col items-center py-10">
        {/* Overlay gradient-background*/}
        <div className="absolute inset-0 bg-gradient-to-b from-overlay/5 to-overlay/90"></div>
        <MaxWidthWrapper className="z-10 my-15">
          <h1 className="font-secondary text-5xl font-semibold text-center mb-10">
            Nostalgic movie nights
          </h1>
          <p className="text-center text-2xl">
            Select an age and relive movie memories
          </p>
          <AgeRangeSelect year={year} />
        </MaxWidthWrapper>
        {/* Gradient fade to main */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-background z-20" />
      </section>
      <main>
        <MaxWidthWrapper>
          {/* Filter and sortby section */}
          <section className="flex justify-end w-full">
            {/* <CategorySelect categories={categories} /> */}
          </section>

          {/* TODO: Loader component */}
          <Suspense fallback={"Loading...."}>
            <MoviesList
              movies={movies}
              yearFrom={yearFromParsed} // If no age range year of birth are default value
              yearTo={yearToParsed} // If no age range year of birth are default value
              // categoryId={category}
              className={
                "grid justify-center gap-3 gap-y-8 px-3 grid-cols-2 md:grid-cols-5 md:px-0 md:gap-8"
              }
            />
          </Suspense>
        </MaxWidthWrapper>
      </main>
    </>
  );
}
