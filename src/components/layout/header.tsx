import React from "react";
import { Logotype } from "../ui/logotype";
import { Navbar } from "../ui/navbar";
import Link from "next/link";

const Header = () => {
  return (
    <header className="p-3 pl-6 grid grid-cols-3">
      <Link href="/" legacyBehavior passHref>
        <Logotype width={100} className="cursor-pointer"></Logotype>
      </Link>

      <Navbar></Navbar>
    </header>
  );
};

export default Header;
