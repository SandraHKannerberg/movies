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
import { fetchGenres } from "@/lib/data-access/action";
import { Genre } from "@/lib/interfaces/category-interfaces";

interface FilterByCategoryProps {
  setSelectedCategory: (category: Genre | null) => void;
}

export const FilterByCategory = ({
  setSelectedCategory,
}: FilterByCategoryProps) => {
  // State for categories to be able to save categories and save that list in LS
  const [categories, setCategories] = useState<Genre[]>([]);

  //Function to handle category change - Select
  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      setSelectedCategory(null); // Reset
    } else {
      // Find category
      const selectedCategoryObj = categories.find(
        (movie) => movie.name === value
      );

      // If selected category = set the selectedCategory state
      if (selectedCategoryObj) {
        setSelectedCategory(selectedCategoryObj);
      }
    }
  };

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
    <Select onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-[180px] my-10">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="all">All Categories</SelectItem>
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
