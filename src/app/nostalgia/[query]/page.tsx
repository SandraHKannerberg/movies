"use client";

import { Header } from "@/components/layout/header";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { AgeRangeSelect } from "@/components/movies/age-range-select";
import { MoviesList } from "@/components/movies/movies-list";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";

export default function NostalgiaPage() {
  const { query } = useParams();

  const yearString = Array.isArray(query) ? query[0] : query;

  const year = yearString ? parseInt(yearString, 10) : 2000;

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
          {/* <Suspense fallback={"Loading...."}>
            <MoviesList year={year} className={"grid-cols-5"} />
          </Suspense> */}
        </MaxWidthWrapper>
      </main>
    </>
  );
}
