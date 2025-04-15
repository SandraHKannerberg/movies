"use client";

import React from "react";
import { Genre } from "@/lib/interfaces/category-interfaces";
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
    <div className="flex flex-col gap-2">
      <Label htmlFor="category">Category:</Label>
      <Select onValueChange={handleChange}>
        <SelectTrigger name="category" id="category">
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
    </div>
  );
};
