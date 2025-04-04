import { Logotype } from "@/components/ui/logotype";
import { Check } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      {/* Herosection */}
      <section className="relative bg-[url('/assets/images/popcorn.jpg')] bg-cover bg-center w-full h-screen flex justify-center items-center text-background">
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground opacity-30"></div>

        {/* Overlay content */}
        <div className="absolute flex flex-col items-center justify-center text-background">
          <h1 className="font-secondary text-2xl font-semibold">
            Timeless movies, endless memories
          </h1>
          <Logotype></Logotype>
        </div>
      </section>

      <main>
        {/* About us -- cta-overview */}
        {/* TODO: update Lorem ipsum text content */}
        <section className="grid grid-cols-2 py-10">
          <h2 className="flex justify-center items-center">Why Memovies?</h2>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-3">
              <Check></Check>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li className="flex items-center gap-3">
              <Check></Check>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li className="flex items-center gap-3">
              <Check></Check>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
