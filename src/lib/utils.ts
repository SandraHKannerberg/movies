import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Movie } from "./interfaces/movie-interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomMovies(movies: Movie[], count: number = 5): Movie[] {
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
