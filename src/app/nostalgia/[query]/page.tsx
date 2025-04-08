"use client";

import { Header } from "@/components/layout/header";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { AgeRangeSelect } from "@/components/movies/age-range-select";
import { MoviesList } from "@/components/movies/movies-list";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function NostalgiaPage() {
  const { query } = useParams();
  const yearFromParam = useSearchParams().get("yearFrom");
  const yearToParam = useSearchParams().get("yearTo");

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
      <Header />
      <main>
        <MaxWidthWrapper>
          <h1 className="font-secondary text-2xl font-semibold text-center">
            Nostalgic movie nights
          </h1>
          <p className="text-center">Select an age and relive movie memories</p>
          <AgeRangeSelect year={year} />

          {/* TODO: Loader component */}
          <Suspense fallback={"Loading...."}>
            <MoviesList
              yearFrom={yearFrom ?? year} // If no age range year of birth are default value
              yearTo={yearTo ?? year} // If no age range year of birth are default value
              className={"grid-cols-5"}
            />
          </Suspense>
        </MaxWidthWrapper>
      </main>
    </>
  );
}
