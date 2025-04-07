"use client";

import React from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";

export const SearchMoviesByYear = ({
  placeholder,
}: {
  placeholder: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    // Manipulating the URL query parameters
    const params = new URLSearchParams(searchParams);
    // Set the params string based on the user’s input. If the input is empty, delete it
    if (term) {
      params.set("query", term);
      params.delete("page"); //reset pagination
    } else {
      params.delete("query");
    }
    //As the user types into the search bar, params.toString() translates this input into a URL-friendly format.
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <section className="my-20 relative">
      {/* TODO: Update colors in theme colors. Neutral colors that do not change in light/dark mode */}
      <Input
        id="search"
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
        className="relative bg-accent border-2 border-gray-500"
      />
      <SearchIcon className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </section>
  );
};
