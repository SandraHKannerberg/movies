"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { fetchMoviesByYear } from "@/lib/movies/action";

export const AgeRangeSelect = ({ year }: { year: number }) => {
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();
  const age = currentYear - year; // Calculate the users age

  const ageRangeOptions = [
    "0-12",
    "13-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
    "70+",
  ];

  // Function to filter age range depending on users age
  const filterAgeRanges = () => {
    // Show all age ranges below their current age
    const filteredRanges = ageRangeOptions.filter((range) => {
      const [minAge] = range
        .split("-")
        .map((v) => (v === "70+" ? 70 : parseInt(v, 10)));

      return age >= minAge;
    });

    return filteredRanges;
  };

  // Get all relevant age ranges
  const availableAgeRanges = filterAgeRanges();

  // Get the age range for the api-call
  const getYearRange = () => {
    if (selectedAgeRange) {
      const [minAge, maxAge] = selectedAgeRange.split("-").map(Number);

      const birthYear = Number(year);

      const yearFrom = birthYear + minAge;
      const yearTo = birthYear + maxAge;

      // When you have the age range - make the fetch
      fetchMoviesByYear(yearFrom, yearTo);
    }
  };

  // Call getYearRange when selectedAgeRange change
  useEffect(() => {
    if (selectedAgeRange) {
      getYearRange();
    }
  }, [selectedAgeRange]); // If selectedAgeRange change

  // Handle age range select
  const handleAgeRangeSelect = (ageRange: string) => {
    setSelectedAgeRange(ageRange); // Start useEffect
  };

  return (
    <>
      <section className="my-10 flex gap-3 justify-center">
        {availableAgeRanges.map((ageRange) => (
          <Button
            key={ageRange}
            variant="outline"
            onClick={() => handleAgeRangeSelect(ageRange)}
            className={`cursor-pointer ${
              selectedAgeRange === ageRange ? "border-2 border-primary" : ""
            }`}
          >
            {ageRange}
          </Button>
        ))}
      </section>
    </>
  );
};
