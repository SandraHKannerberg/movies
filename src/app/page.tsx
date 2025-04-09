import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { MoviesList } from "@/components/movies/movies-list";
import { NowPlayingMovies } from "@/components/movies/now-playing-movies";
import { SearchMoviesByYear } from "@/components/movies/search-movies-by-year";
import { TopRatedMovies } from "@/components/movies/top-rated-movies";
import { UpcomingMovies } from "@/components/movies/upcoming-movies";
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

  return (
    <>
      {/* Herosection */}
      <section className="relative bg-[url('/assets/images/popcorn.jpg')] bg-cover bg-center w-full h-screen flex flex-col items-center text-background pt-10">
        {/* Overlay gradient-background*/}
        <div className="absolute inset-0 bg-gradient-to-b from-overlay/5 to-overlay/90"></div>

        <section className="z-10 flex flex-col gap-5 items-center text-neutral-50 justify-start mx-5 my-15">
          <h1 className="font-secondary text-5xl font-semibold">
            Timeless movies, endless memories
          </h1>
          <p className="text-2xl font-semibold">
            Start here and experience the movies from your year of birth
          </p>
          <SearchMoviesByYear placeholder="Enter year of birth ..." />
        </section>

        {year ? (
          <MaxWidthWrapper className="z-10">
            {/* TODO: hover animation */}
            <div className="flex justify-end w-full mb-3 mr-5">
              <Link
                href={`/nostalgia/${year}`}
                className="uppercase text-white flex hover:underline"
              >
                Discover more
                <ArrowRight></ArrowRight>
              </Link>
            </div>
            {/* TODO: Loader component */}
            <Suspense fallback={"Loading...."}>
              <MoviesList
                yearFrom={year}
                yearTo={year}
                showRandom={true}
                className={"px-5 grid-cols-5 w-full z-10"}
              />
            </Suspense>
          </MaxWidthWrapper>
        ) : null}
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
