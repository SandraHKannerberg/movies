import React from "react";
import { Credits } from "@/lib/interfaces/credits-interfaces";

interface creditsProps {
  credits: Credits;
  className?: string;
}

const MovieCrew = ({ credits, className }: creditsProps) => {
  // Find the movie director
  const movieDirector = credits.crew.find((crew) => crew.job === "Director");

  // Find the Producer
  const movieProducer = credits.crew.find((crew) => crew.job === "Producer");

  return (
    <section className={className}>
      <h2 className="uppercase text-lg font-semibold mt-5">Director</h2>
      <p>{movieDirector?.name}</p>

      <h2 className="uppercase text-lg font-semibold mt-5">Producer</h2>
      <p>{movieProducer?.name}</p>
    </section>
  );
};

export default MovieCrew;
