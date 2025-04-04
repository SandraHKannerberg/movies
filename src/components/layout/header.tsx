import React from "react";
import { Logotype } from "../ui/logotype";
import { Navbar } from "../ui/navbar";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="py-3 px-6 grid grid-cols-3 absolute top-0 z-1 w-full">
      <Link href="/" legacyBehavior passHref>
        <Logotype width={100} className="cursor-pointer"></Logotype>
      </Link>

      <div className="flex justify-center">
        <Navbar></Navbar>
      </div>
    </header>
  );
};
