import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { AgeRangeSelect } from "@/components/navigation/age-range-select";
import { MoviesList } from "@/components/movies/movies-list";
import { CategorySelect } from "@/components/navigation/category-select";
import { fetchAllGenres, fetchMoviesByYear } from "@/lib/data-access";

import React, { Suspense } from "react";
import MoviesPagination from "@/components/navigation/movies-pagination";

export default async function YearPage({
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

  // Current page
  const pageNumber = Number(page) || 1;

  // Get movies
  const movies = await fetchMoviesByYear(
    yearFromParsed,
    yearToParsed,
    pageNumber
  );

  // Get categories
  const categories = await fetchAllGenres();

  // Find the category id
  const categoryId = categories.find((c) => c.name === category)?.id;

  // Filter movies by category id
  const filterMovies = categoryId
    ? movies.results.filter((movie) => movie.genre_ids.includes(categoryId))
    : movies.results;

  // Movies per page -- can't change this, it is always 20 per page from the api
  const moviesPerPage = 20;

  // Count total pages for filterMovies
  let totalPages = Math.ceil(filterMovies.length / moviesPerPage);

  // If no selected category, use total_pages from api
  if (!categoryId) {
    totalPages = movies.total_pages;
  }

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
            <CategorySelect categories={categories} />
          </section>

          {/* TODO: Loader component */}
          <Suspense fallback={"Loading...."}>
            <MoviesList
              movies={filterMovies}
              yearFrom={yearFromParsed} // If no age range year of birth are default value
              yearTo={yearToParsed} // If no age range year of birth are default value
              className={
                "grid justify-center gap-3 gap-y-8 px-3 grid-cols-2 md:grid-cols-5 md:px-0 md:gap-8"
              }
            />
          </Suspense>

          <MoviesPagination
            totalPages={totalPages}
            currentPage={pageNumber}
          ></MoviesPagination>
        </MaxWidthWrapper>
      </main>
    </>
  );
}
