"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ageRangeOptions } from "@/constants";
import { Button } from "../ui/button";

export const AgeRangeSelect = ({ year }: { year: number }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const yearFrom = searchParams.get("yearFrom");
  const yearTo = searchParams.get("yearTo");

  const currentYear = new Date().getFullYear();
  const age = currentYear - year; // Calculate the users age -- this value is used to filter out age ranges higher than the user's current age

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

  // Active agerange from url params
  const initialAgeRange = (() => {
    if (!yearFrom || !year) return null;

    const fromAge = Number(yearFrom) - Number(year);
    const toAge = yearTo ? Number(yearTo) - Number(year) : null;

    const match = availableAgeRanges.find((range) => {
      if (range.includes("+")) {
        const min = parseInt(range, 10);
        return fromAge >= min && toAge === null;
      } else {
        const [min, max] = range.split("-").map(Number);
        return fromAge >= min && toAge !== null && toAge <= max;
      }
    });

    return match ?? null;
  })();

  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(
    initialAgeRange
  );

  // Handle age range selection
  const handleClick = (range: string) => {
    setSelectedAgeRange(range);

    if (!year) return;

    const birth = Number(year);
    let yearFrom, yearTo;

    if (range.includes("+")) {
      const minAge = parseInt(range, 10);
      yearFrom = birth + minAge;
    } else {
      const [minAge, maxAge] = range.split("-").map(Number);
      yearFrom = birth + minAge;
      yearTo = birth + maxAge;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("yearFrom", yearFrom.toString());
    if (yearTo) {
      params.set("yearTo", yearTo.toString());
    } else {
      params.delete("yearTo");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedAgeRange(null);

    const params = new URLSearchParams(searchParams);
    params.delete("yearFrom");
    params.delete("yearTo");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="my-3 flex gap-3 justify-center z-10">
      {availableAgeRanges.map((range) => (
        <Button
          key={range}
          onClick={() => handleClick(range)}
          className={`cursor-pointer shadow-lg hover:bg-rose-50 hover:text-neutral-950 ${
            selectedAgeRange === range ? " bg-rose-50 text-neutral-950" : ""
          }`}
        >
          {range}
        </Button>
      ))}
      {selectedAgeRange && (
        <Button variant="outline" onClick={clearSelection}>
          Clear
        </Button>
      )}
    </section>
  );
};
