"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryParams } from "../../../hooks/use-query-string";
import { ageRangeOptions } from "@/constants";

export const AgeRangeSelect = ({ year }: { year: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const createQueryString = useQueryParams(searchParams);

  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null);
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

  // Calculate the years of the selected age range
  const getYearRange = () => {
    if (!selectedAgeRange) return;

    const birthYear = Number(year);
    const currentYear = new Date().getFullYear();

    let minAge: number;
    let maxAge: number | undefined;

    if (selectedAgeRange.includes("+")) {
      minAge = parseInt(selectedAgeRange, 10);
      maxAge = undefined;
    } else {
      [minAge, maxAge] = selectedAgeRange.split("-").map(Number);
    }

    // Calculate yearFrom and yearTo
    const yearFrom = birthYear + minAge;
    const yearTo = maxAge ? birthYear + maxAge : currentYear;

    // Use the hook to create queryStrings for yearFrom and yearTo
    const queryString = createQueryString(
      { yearFrom: String(yearFrom), yearTo: String(yearTo) },
      ["page"] // reset page (pagination)
    );

    // Navigate to the new querystring
    replace(`${pathname}?${queryString}`);
  };

  // Run getYearRange when selectedAgeRange change
  useEffect(() => {
    if (selectedAgeRange) {
      getYearRange();
    }
  }, [selectedAgeRange]); // If selectedAgeRange change

  // Handle age range select
  const handleAgeRangeSelect = (ageRange: string) => {
    setSelectedAgeRange(ageRange); // Start useEffect
  };

  // Clear age range and delete age range params
  const handleClear = () => {
    setSelectedAgeRange(null);

    const params = new URLSearchParams(searchParams);
    params.delete("yearFrom");
    params.delete("yearTo");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <section className="my-3 flex gap-3 justify-center z-10">
        {availableAgeRanges.map((ageRange) => (
          <Button
            key={ageRange}
            variant="default"
            onClick={() => handleAgeRangeSelect(ageRange)}
            className={`cursor-pointer shadow-lg hover:bg-rose-50 hover:text-neutral-950 ${
              selectedAgeRange === ageRange
                ? " bg-rose-50 text-neutral-950"
                : ""
            }`}
          >
            {ageRange}
          </Button>
        ))}

        {selectedAgeRange && (
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
        )}
      </section>
    </>
  );
};
