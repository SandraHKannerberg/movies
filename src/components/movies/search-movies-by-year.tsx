"use client";

import React from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";

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
    // TODO: use form from shadcn??
    <form className="space-y-4 relative mt-5 w-full">
      <Label
        htmlFor="year"
        className="sr-only"
        aria-label="Enter year of birth"
      >
        Enter year of birth
      </Label>
      <Input
        id="year"
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
        className="relative py-5 border-4 border-neutral-300 text-neutral-50 font-semibold bg-white/55 backdrop-blur-lg transition-all"
      />
      <SearchIcon className="absolute right-3 top-1/3 h-[20px] w-[20px] -translate-y-1/2 text-neutral-50 peer-focus:text-neutral-900" />
    </form>
  );
};
