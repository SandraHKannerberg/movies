import React from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  // CardFooter, //Save for later
  // CardHeader, //Save for later
  CardTitle,
} from "@/components/ui/card";
import { Movie } from "@/lib/movies/interfaces";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Card className="overflow-hidden rounded-lg shadow-md shadow-border border-1 border-border">
      <CardTitle className="sr-only">{movie.title}</CardTitle>
      <CardContent className="relative h-[300px] p-0">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`Movie Poster of ${movie.title}`}
          fill
          className="object-cover"
        />
      </CardContent>
    </Card>
  );
};
