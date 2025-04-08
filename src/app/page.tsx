import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { MoviesList } from "@/components/movies/movies-list";
import { SearchMoviesByYear } from "@/components/movies/search-movies-by-year";
import { Logotype } from "@/components/ui/logotype";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home({
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
        <div className="absolute inset-0 bg-foreground opacity-30"></div>

        <section className="z-10 flex flex-col items-center justify-start text-background mx-5 mb-10">
          <Logotype />
          <h1 className="font-secondary text-2xl font-semibold">
            Timeless movies, endless memories
          </h1>

          <SearchMoviesByYear placeholder="Enter year of birth" />
        </section>

        {year ? (
          <>
            {/* TODO: hover animation */}
            <div className="flex justify-end w-full mb-3 mr-5 z-10">
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
          </>
        ) : null}
      </section>

      <main>
        <MaxWidthWrapper className="grid grid-cols-5">
          {/* About us -- cta-overview */}
          {/* TODO: update Lorem ipsum text content */}
          <section className="py-10 grid grid-cols-2 col-span-5">
            <h2 className="flex items-center font-secondary font-semibold">
              Why Memovies?
            </h2>
            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <Check></Check>
                <p className="text-xs">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Check></Check>
                <p className="text-xs">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Check></Check>
                <p className="text-xs">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </p>
              </li>
            </ul>
          </section>

          {/* Selected movies */}
          <h2 className="text-center font-secondary font-semibold col-span-5">
            Selected movies
          </h2>
          {/* TODO: import selected-movies component here */}

          {/* Movie genre / Categories */}
          <h2 className="text-center font-secondary font-semibold col-span-5">
            Categories
          </h2>
          {/* TODO: import categories component here */}
        </MaxWidthWrapper>
      </main>
    </>
  );
}
