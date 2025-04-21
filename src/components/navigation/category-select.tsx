"use client";

import React, { useEffect, useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const allCategories = categories;

  // If no categories throw an error
  if (!allCategories || allCategories.length <= 0) {
    throw new Error("No categories found");
  }

  useEffect(() => {
    const categoryFromSearch = searchParams.get("category");

    if (categoryFromSearch) {
      // Check if category from url exists in allCategories
      const currentCategory = allCategories.find(
        (cat) =>
          cat.id ===
          (categoryFromSearch === "all" ? 0 : Number(categoryFromSearch))
      );

      // If category exists --- set selected category
      if (currentCategory) {
        setSelectedCategory(currentCategory.id.toString());
      } else {
        setSelectedCategory("all");
      }
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams, allCategories]);

  const handleChange = (value: string): void => {
    const queryString = createQueryString({ category: value }, ["page"]);
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <div className="flex flex-col gap-2 mx-3">
      <Label htmlFor="category" className="sr-only">
        Select a category
      </Label>
      <Select value={selectedCategory} onValueChange={handleChange}>
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
