import Link from "next/link";
import React from "react";
import { Logotype } from "../ui/logotype";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 px-6">
      <section className="bg-yellow w-full flex justify-between">
        <Link href="/">
          <Logotype width={100} className="cursor-pointer"></Logotype>
        </Link>

        {/* TODO: have one navbar-component and import it both in header and here */}
        <nav className="flex flex-col text-xs gap-2">
          <Link href="/movies" className="hover:underline">
            Movies
          </Link>
          <Link href="/nostalgia" className="hover:underline">
            Nostalgia
          </Link>
        </nav>
      </section>

      <small className="text-center text-[0.5rem]">
        Copyright &copy; Sandra Höst Kannerberg, 2025
      </small>
    </footer>
  );
};
