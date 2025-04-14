import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {/* Movies */}
        <NavigationMenuItem className="uppercase">
          <Link href="/movies" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Movies
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Nostalgia */}
        <NavigationMenuItem className="uppercase">
          <Link href="/nostalgia" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Nostalgia
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
