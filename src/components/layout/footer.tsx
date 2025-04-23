import Link from "next/link";
import React from "react";
import { Logotype } from "../ui/logotype";
import MaxWidthWrapper from "./max-width-wrapper";
// import { Separator } from "@radix-ui/react-select";

export const Footer = () => {
  return (
    <footer className="my-10 mx-auto w-full max-w-screen-xl">
      {/* Layered top borders */}
      <div className="h-3 bg-rose-800 rounded-tr rounded-tl"></div>
      <div className="h-3 bg-rose-900"></div>
      <div className="h-3 bg-rose-950"></div>

      <MaxWidthWrapper className="bg-background-secondary h-min-50 rounded p-5 grid grid-cols-2 gap-5 md:gap-3 justify-between">
        <section className="flex flex-col gap-3 col-span-2 md:col-span-1 ">
          <Link href="/">
            <Logotype className={"w-50 h-30"}></Logotype>
          </Link>
          <h3 className="font-secondary text-lg font-semibold">
            Timeless movies, endless memories
          </h3>
        </section>
        {/* TODO: Update links and content */}
        <nav className="flex flex-col gap-3 text-sm col-span-2 md:col-span-1 md:items-end">
          <Link href="/" className="hover:underline hover:underline-offset-5">
            About us
          </Link>
          <Link href="/" className="hover:underline hover:underline-offset-5">
            Contact us
          </Link>
          <Link href="/" className="hover:underline hover:underline-offset-5">
            Your account
          </Link>
        </nav>

        <hr className="border-t border-rose-800 my-4 col-span-2" />
        <small className="text-center text-xs col-span-2">
          Copyright &copy; Sandra Höst Kannerberg, 2025
        </small>
      </MaxWidthWrapper>
    </footer>
  );
};
