import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { Credits } from "@/lib/interfaces/credits-interfaces";

interface creditsProps {
  credits: Credits;
  className?: string;
}

const MovieCast = async ({ credits, className }: creditsProps) => {
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
        <article key={cast.id} className="flex flex-col items-center gap-3">
          {cast.profile_path ? (
            <figure className="relative w-30 h-30 rounded-full overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={`Profile image of ${cast.name}`}
                width={200}
                height={200}
                className="object-cover object-center"
              ></Image>
            </figure>
          ) : (
            <div className="w-30 h-30 rounded-full bg-neutral-500 flex items-center justify-center text-2xl">
              <User></User>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-center">{cast.name}</h3>
            <p className="text-center">{cast.character}</p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default MovieCast;
