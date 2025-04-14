import React from "react";
import { Logotype } from "../ui/logotype";
import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";

export const Header = () => {
  return (
    // TODO: when more content in navbar change absolute position to fixed header
    <header className="top-3 z-20 w-full absolute">
      <MaxWidthWrapper>
        <nav className="w-full flex items-center rounded shadow-lg py-3 px-3 z-[100] h-14 inset-x-0 border-b border-gray-200 bg-white/55 backdrop-blur-lg transition-all">
          <Link href="/">
            <Logotype className={"w-30 h-20"}></Logotype>
          </Link>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
};
