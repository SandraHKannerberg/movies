"use client";

import React, { use } from "react";
import { Genre } from "@/lib/interfaces/category-interfaces";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import useQueryString from "../../../hooks/use-query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export const CategorySelect = ({ categories }: { categories: Genre[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // The "use" hook has await built in
  const allCategories = categories;

  // If no categories throw an error
  if (!allCategories || allCategories.length <= 0) {
    throw new Error("No categories found");
  }

  const createQueryString = useQueryString(searchParams);

  const handleChange = (value: string): void => {
    const queryString = createQueryString("category", value);
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <>
      <Label htmlFor="category" className="sr-only">
        Category:
      </Label>
      <Select onValueChange={handleChange}>
        <SelectTrigger name="category" id="category" className="flex my-10">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {allCategories.map((category, index) => (
            <SelectItem key={index} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
