import { Movie } from "./interfaces";

export function getRandomMovies(movies: Movie[], count: number = 5): Movie[] {
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
