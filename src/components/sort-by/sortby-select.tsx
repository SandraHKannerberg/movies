"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useQueryParams } from "../../../hooks/use-query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { sortOptions } from "@/constants";

export const SortBySelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useQueryParams(searchParams);

  const currentValue = searchParams.get("sortBy") ?? "popular-desc";

  const handleChange = (value: string) => {
    const queryString = createQueryString({ sortBy: value }, ["page"]);
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <>
      <Label htmlFor="sortby" className="sr-only">
        Sort by:
      </Label>
      <Select value={currentValue} onValueChange={handleChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
