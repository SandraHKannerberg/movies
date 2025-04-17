import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { AgeRangeSelect } from "@/components/navigation/age-range-select";
import { MoviesList } from "@/components/movies/movies-list";
import {
  fetchAllGenres,
  fetchMovieBySearch,
  fetchMovies,
} from "@/lib/data-access";

import React from "react";
import MoviesPagination from "@/components/navigation/movies-pagination";
import { SortBySelect } from "@/components/sort-by/sortby-select";
import { SearchBar } from "@/components/search/search-bar";
import { FilterDrawer } from "@/components/filter/filter-drawer";
import { Genre } from "@/lib/interfaces/category-interfaces";

export default async function YearPage({
  params,
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;

  // Possible params in url
  const {
    yearFrom,
    yearTo,
    category,
    page,
    sortBy,
    runtimeMin,
    runtimeMax,
    ratingMin,
    ratingMax,
    search,
  } = await searchParams;

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

  // Category id
  const fetchedCategories = await fetchAllGenres();
  // Make a string of all category.id
  const allCategoryIdsAsString = fetchedCategories
    .map((category) => category.id)
    .join("|");

  // Creat an new array with all as an option
  const allCategories: Genre[] = [
    { id: 0, name: "All categories" },
    ...fetchedCategories,
  ];

  // If category = all the value = allCategoryIdsAsString, and allCategoryIdsAsString are also default value
  const categoryId =
    typeof category === "string"
      ? category === "all"
        ? allCategoryIdsAsString
        : category
      : allCategoryIdsAsString;

  // Search input
  const searchQuery = search?.toString();

  // Sort by opyions
  const sortByOption = sortBy?.toString();

  // Runtime
  const runtimeMinNumber = Number(runtimeMin) || 70;
  const runtimeMaxNumber = Number(runtimeMax) || 999;

  // Rating
  const ratingMinNumber = Number(ratingMin) || 0;
  const ratingMaxNumber = Number(ratingMax) || 10;

  // Get movies
  const movies = await fetchMovies({
    yearFrom: yearFromParsed,
    yearTo: yearToParsed,
    page: pageNumber,
    sortBy: sortByOption,
    runtimeMin: runtimeMinNumber,
    runtimeMax: runtimeMaxNumber,
    voteRatingMin: ratingMinNumber,
    voteRatingMax: ratingMaxNumber,
    genre: categoryId,
  });

  let searchResults;
  // Get search results
  if (searchQuery) {
    searchResults = await fetchMovieBySearch(searchQuery);
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
          {/* Search, filter and sortby section */}
          <section className="flex justify-between items-center w-full my-10">
            <SearchBar
              placeholder="Search movie..."
              results={searchResults?.results ?? []}
            />
            <div className="flex justify-end items-center gap-5">
              <SortBySelect />
              <FilterDrawer categories={allCategories} />
            </div>
          </section>

          <MoviesList
            movies={movies.results}
            yearFrom={yearFromParsed} // If no age range year of birth are default value
            yearTo={yearToParsed} // If no age range year of birth are default value
            className={
              "grid justify-center gap-3 gap-y-8 px-3 grid-cols-2 md:grid-cols-5 md:px-0 md:gap-8"
            }
          />

          <MoviesPagination
            totalPages={movies.total_pages}
            currentPage={pageNumber}
          ></MoviesPagination>
        </MaxWidthWrapper>
      </main>
    </>
  );
}
