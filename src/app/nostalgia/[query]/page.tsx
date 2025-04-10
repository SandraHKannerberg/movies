"use client";

import { FilterByCategory } from "@/components/categories-genres/filter-by-category";
import { Header } from "@/components/layout/header";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { AgeRangeSelect } from "@/components/movies/age-range-select";
import { MoviesList } from "@/components/movies/movies-list";
import { Genre } from "@/lib/categories-genres/interfaces";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";

export default function NostalgiaPage() {
  const { query } = useParams();
  const yearFromParam = useSearchParams().get("yearFrom");
  const yearToParam = useSearchParams().get("yearTo");
  const [selectedCategory, setSelectedCategory] = useState<Genre | null>(null);

  // Year of birth
  const year = parseInt(query as string, 10);

  // Year from
  const yearFrom =
    parseInt(
      Array.isArray(yearFromParam) ? yearFromParam[0] : yearFromParam ?? "",
      10
    ) || undefined;

  // YearTo
  const yearTo =
    parseInt(
      Array.isArray(yearToParam) ? yearToParam[0] : yearToParam ?? "",
      10
    ) || undefined;

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
            <FilterByCategory setSelectedCategory={setSelectedCategory} />
          </section>

          {/* TODO: Loader component */}
          <Suspense fallback={"Loading...."}>
            <MoviesList
              yearFrom={yearFrom ?? year} // If no age range year of birth are default value
              yearTo={yearTo ?? year} // If no age range year of birth are default value
              categoryId={selectedCategory?.id}
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
