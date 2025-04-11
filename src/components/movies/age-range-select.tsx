"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const AgeRangeSelect = ({ year }: { year: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
    "70+", // TODO: checka hur denna fungerar
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

      const params = new URLSearchParams(searchParams);

      params.set("yearFrom", yearFrom.toString());
      params.set("yearTo", yearTo.toString());

      replace(`${pathname}?${params.toString()}`);
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
