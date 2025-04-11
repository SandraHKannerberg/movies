import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { MoviesList } from "@/components/movies/movies-list";
import { NowPlayingMovies } from "@/components/movies/now-playing-movies";
import { SearchMoviesByYear } from "@/components/movies/search-movies-by-year";
import { TopRatedMovies } from "@/components/movies/top-rated-movies";
import { UpcomingMovies } from "@/components/movies/upcoming-movies";
import { fetchMoviesByYear } from "@/lib/data-access/action";
import { getRandomMovies } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // query from search
  const query = params.query ? String(params.query) : "";
  const year = Number(query);

  // Fetch movies
  const movies = await fetchMoviesByYear(year, year);

  // Get random movies
  const randomMovies = getRandomMovies(movies);

  return (
    <>
      {/* Herosection */}
      <section className="relative bg-[url('/assets/images/popcorn.jpg')] bg-cover bg-center w-full min-h-screen flex flex-col items-center text-background py-10">
        {/* Overlay gradient-background*/}
        <div className="absolute inset-0 bg-gradient-to-b from-overlay/5 to-overlay/90"></div>

        <section className="z-10 flex flex-col gap-5 items-center text-neutral-50 justify-start mx-5 my-15">
          <h1 className="font-secondary text-5xl font-semibold text-center">
            Timeless movies, endless memories
          </h1>
          <p className="text-2xl font-semibold text-center">
            Start here and experience the movies from your year of birth
          </p>
          <SearchMoviesByYear placeholder="Enter year of birth ..." />
        </section>

        {year ? (
          <MaxWidthWrapper className="z-10 grid grid-cols-2">
            {/* TODO: hover animation */}
            <div className="flex justify-end w-full mt-3 mb-5 col-span-2">
              <Link
                href={`/nostalgia/${year}`}
                className="uppercase text-neutral-50 flex hover:underline z-100"
              >
                Discover more movies
                <ArrowRight></ArrowRight>
              </Link>
            </div>
            {/* TODO: Loader component */}
            <Suspense fallback={"Loading...."}>
              <MoviesList
                movies={randomMovies}
                yearFrom={year}
                yearTo={year}
                showRandom={true}
                className={
                  "grid col-span-2 grid-cols-2 z-10 px-3 gap-3 md:grid-cols-5"
                }
              />
            </Suspense>
          </MaxWidthWrapper>
        ) : null}
        {/* Gradient fade to main */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-background z-20" />
      </section>

      <main>
        <MaxWidthWrapper className="grid grid-cols-5">
          {/* TODO: import categories component here */}
          {/* Movie genre / Categories - rullande text med alla kategorier*/}

          {/* Top rated movies */}
          <section className="col-span-5 grid-cols-5 my-20">
            <h2 className="text-2xl text-center font-secondary font-semibold col-span-5 mb-10">
              Top rated movies from different years
            </h2>
            <TopRatedMovies />
          </section>

          {/* Now playing movies */}
          <section className="col-span-5 grid-cols-5 my-20">
            <h2 className="text-2xl text-center font-secondary font-semibold col-span-5 mb-10">
              Currently in theatres
            </h2>
            <NowPlayingMovies />
          </section>

          {/* Upcoming movies */}
          <section className="col-span-5 grid-cols-5 my-20">
            <h2 className="text-2xl text-center font-secondary font-semibold col-span-5 mb-10">
              Keep up with the latest
            </h2>
            <UpcomingMovies />
          </section>

          {/* TODO: import about us overview component here */}
          {/* why memovies -- cta-overview - rullande text med nyckelord about us*/}
        </MaxWidthWrapper>
      </main>
    </>
  );
}
