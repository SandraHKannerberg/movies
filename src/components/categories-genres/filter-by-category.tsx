"use client";

import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchGenres } from "@/lib/movies/action";
import { Genre } from "@/lib/categories-genres/interfaces";

export const FilterByCategory = () => {
  const [categories, setCategories] = useState<Genre[]>([]);

  useEffect(() => {
    // Key in local storage (LS)
    const key = "MOVIE-CATEGORIES";

    const loadCategories = async () => {
      // Check if key exists in LS
      const categoriesInLS = localStorage.getItem(key);

      // Check if the key is empty
      const isValidData =
        categoriesInLS &&
        categoriesInLS !== "null" &&
        categoriesInLS !== "undefined" &&
        categoriesInLS.trim() !== "";

      // If data exists in the key
      if (isValidData) {
        // Parse the data
        const parsedCategories = JSON.parse(categoriesInLS);
        // Set the state categories
        setCategories(parsedCategories);
      } else {
        try {
          // If no key or no valid data - fetch and then save to LS
          const result = await fetchGenres();
          setCategories(result);
          localStorage.setItem(key, JSON.stringify(result));
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }
    };

    loadCategories();
  }, []);

  return (
    <Select>
      <SelectTrigger className="w-[180px] my-10">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
