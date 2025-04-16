"use client";

import React from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Movie } from "@/lib/interfaces/movie-interfaces";
import Link from "next/link";

export const SearchBar = ({
  placeholder,
  results,
  className,
}: {
  placeholder: string;
  results?: Movie[];
  className?: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchResults = results;

  const handleSearch = useDebouncedCallback((term) => {
    // Manipulating the URL query parameters
    const params = new URLSearchParams(searchParams);
    // Set the params string based on the user’s input. If the input is empty, delete it
    if (term) {
      params.set("search", term);
      params.delete("page"); //reset pagination
    } else {
      params.delete("search");
    }
    //As the user types into the search bar, params.toString() translates this input into a URL-friendly format.
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex justify-center items-center w-[40%]">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-50 w-5 h-5 z-100" />
      <Label
        htmlFor="search"
        className="sr-only"
        aria-label="Search movie by title"
      >
        Search movie by title
      </Label>
      <Input
        id="search"
        type="search"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("search")?.toString()}
        className="relative pl-10 py-5 text-neutral-50 font-semibold"
      />

      <div className="absolute mt-1 top-full w-full rounded-md shadow z-10 bg-neutral-50 text-neutral-800">
        {searchResults?.map((movie) => (
          <ul>
            <li
              key={movie.id}
              className="flex gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <Link href={`/movies/${movie.id}`}>
                <p>
                  {movie.title}, Release year: {movie.release_date.slice(0, 4)},
                  Original lang: {movie.original_language}
                </p>
              </Link>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};
