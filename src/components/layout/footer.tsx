import Link from "next/link";
import React from "react";
import { Logotype } from "../ui/logotype";
import MaxWidthWrapper from "./max-width-wrapper";
// import { Separator } from "@radix-ui/react-select";

export const Footer = () => {
  return (
    <footer className="my-10 mx-auto w-full max-w-screen-xl">
      {/* Layered top borders */}
      <div className="h-3 bg-rose-950 rounded-tl rounded-tr shadow-rose-300-lg"></div>
      {/* mörk nyans */}
      <div className="h-3 bg-rose-900"></div> {/* mellan nyans */}
      <div className="h-3 bg-rose-800"></div> {/* ljus nyans */}
      {/* TODO: newsletter */}
      {/* TODO: bugfix - separator from shadcn does not work */}
      {/* <Separator className="my-4 bg-yellow-300 h-5" /> */}
      <MaxWidthWrapper className="bg-background-secondary h-min-50 rounded p-5 grid grid-cols-2 gap-5 md:gap-3 justify-between">
        <section className="flex flex-col gap-3 col-span-2 md:col-span-1 ">
          <Link href="/">
            <Logotype className={"w-50 h-30"}></Logotype>
          </Link>
          <h3 className="font-secondary text-lg font-semibold">
            Timeless movies, endless memories
          </h3>
          {/* TODO: Put social icons here */}
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

        <hr className="border-t border-border my-4 col-span-2" />
        <small className="text-center text-xs col-span-2">
          Copyright &copy; Sandra Höst Kannerberg, 2025
        </small>
      </MaxWidthWrapper>
    </footer>
  );
};
