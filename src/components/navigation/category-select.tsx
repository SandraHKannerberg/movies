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
import { Genre } from "@/lib/interfaces/category-interfaces";

export const CategorySelect = ({ categories }: { categories: Genre[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useQueryParams(searchParams);

  const allCategories = categories;

  // If no categories throw an error
  if (!allCategories || allCategories.length <= 0) {
    throw new Error("No categories found");
  }

  const handleChange = (value: string): void => {
    const queryString = createQueryString({ category: value }, ["page"]);
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <div className="flex flex-col gap-2 mx-3">
      <Label htmlFor="category" className="sr-only">
        Select a category
      </Label>
      <Select onValueChange={handleChange}>
        <SelectTrigger name="category" id="category" className="cursor-pointer">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {allCategories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id === 0 ? "all" : category.id.toString()}
              className="cursor-pointer hover:bg-accent"
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
