import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Movie } from "./interfaces/movie-interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns random movies
export function getRandomMovies(
  movies: Movie[] = [],
  count: number = 5
): Movie[] {
  if (!Array.isArray(movies)) return [];
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// This function returns an array with number and possibly ellipsis (...)
export function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  // If less then 7 pages -> show all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Prepare an empty array for the pagenumbers
  const pages: (number | "...")[] = [];

  const showStart = currentPage <= 4; // In the beginning
  const showEnd = currentPage >= totalPages - 3; // Near the last page

  // Near the start -> show the first 5, then "..." and then the last pagenumber
  if (showStart) {
    pages.push(1, 2, 3, 4, 5, "...", totalPages);

    // The the end -> Show the first pagenumber, then "..." and then the last 5 pagenumbers
  } else if (showEnd) {
    pages.push(
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );

    // In the middle -> show the first pagenumber, then "...", then display the current pagenumber plus the pagenumbers on either side of the currentpage, new "..." before the last pagenumber
  } else {
    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    );
  }

  return pages;
}
