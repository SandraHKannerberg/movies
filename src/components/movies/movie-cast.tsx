import React from "react";
import Image from "next/image";
import { CircleX, User } from "lucide-react";
import { Credits } from "@/lib/interfaces/credits-interfaces";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { MovieDetails } from "@/lib/interfaces/movie-interfaces";

interface creditsProps {
  credits: Credits;
  movie: MovieDetails;
  className?: string;
}

const MovieCast = async ({ credits, movie, className }: creditsProps) => {
  // Top 12 cast
  const sortedCast = credits.cast
    .sort((a, b) => a.order - b.order)
    .slice(0, 12);

  return (
    <section className={className}>
      <h2 className="col-span-2 md:col-span-4 uppercase text-2xl font-semibold mt-5 text-center">
        Cast
      </h2>
      {sortedCast.map((cast) => (
        <article key={cast.id} className="flex flex-col items-center">
          {cast.profile_path ? (
            <figure className="w-30 h-30 rounded-full overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={`Profile image of ${cast.name}`}
                width={200}
                height={200}
                className="object-cover"
              ></Image>
            </figure>
          ) : (
            <div className="w-30 h-30 rounded-full bg-neutral-500 flex items-center justify-center text-2xl">
              <User />
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-center">{cast.name}</h3>
            <p className="text-center">{cast.character}</p>
          </div>
        </article>
      ))}

      {/* Drawer to show all cast */}
      <Drawer direction="right">
        <DrawerTrigger className="flex justify-center col-span-2 md:col-span-4 cursor-pointer my-5">
          View all
        </DrawerTrigger>
        <DrawerContent className="h-full w-[90%] ml-auto max-w-sm p-4 space-y-6 overflow-auto">
          <DrawerHeader>
            <div className="flex justify-between">
              <DrawerTitle className="text-2xl">Cast</DrawerTitle>
              <DrawerClose className="cursor-pointer">
                <CircleX></CircleX>
              </DrawerClose>
            </div>

            <DrawerDescription aria-label={`Cast from movie ${movie.title}`}>
              {movie.title}
            </DrawerDescription>
          </DrawerHeader>
          <ul>
            {credits.cast.map((cast) => (
              <li
                key={cast.id}
                className="flex flex-col items-center gap-3 text-center"
              >
                <p>{cast.name}</p>
              </li>
            ))}
          </ul>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default MovieCast;
