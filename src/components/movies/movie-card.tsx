import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Movie } from "@/lib/interfaces/movie-interfaces";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <>
      <Link href={`/movies/${movie.id}`}>
        <Card className="h-full overflow-hidden rounded-lg shadow-md shadow-border border-1 border-border hover:shadow-2xl hover:shadow-primary transition-transform duration-300 hover:scale-105">
          <CardTitle className="sr-only">{movie.title}</CardTitle>
          <CardContent className="p-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Movie Poster of ${movie.title}`}
              width={200}
              height={400}
              className="object-cover w-full h-auto"
              priority
            />
          </CardContent>
        </Card>
      </Link>
    </>
  );
};
