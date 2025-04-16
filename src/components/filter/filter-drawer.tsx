"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import FilterSection from "./filter-section";
import { usePathname, useRouter } from "next/navigation";
import { Settings2 } from "lucide-react";
import { CategorySelect } from "../navigation/category-select";
import { Genre } from "@/lib/interfaces/category-interfaces";

export default function FilterDrawer({ categories }: { categories: Genre[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const resetFilters = () => {
    router.push(pathname); // remove all query parameters
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger className="flex gap-3">
        Filter <Settings2 />
      </DrawerTrigger>
      <DrawerContent className="h-full w-[90%] ml-auto max-w-sm p-4 space-y-6">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Filter movies</DrawerTitle>
          <DrawerDescription>
            Mix and match info to discover movies.
          </DrawerDescription>
        </DrawerHeader>
        <Accordion type="multiple" className="w-full space-y-2">
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <CategorySelect categories={categories}></CategorySelect>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="release-year">
            <AccordionTrigger>Release year</AccordionTrigger>
            <AccordionContent>
              <FilterSection
                paramKeyFrom="yearFrom"
                paramKeyTo="yearTo"
                placeholder="Enter year (YYYY)"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="runtime">
            <AccordionTrigger>Runtime (minutes)</AccordionTrigger>
            <AccordionContent>
              <FilterSection
                paramKeyFrom="runtimeMin"
                paramKeyTo="runtimeMax"
                placeholder="Enter runtime"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rating">
            <AccordionTrigger>Rating (vote)</AccordionTrigger>
            <AccordionContent>
              <FilterSection
                paramKeyFrom="ratingMin"
                paramKeyTo="ratingMax"
                placeholder="Ratingscale 0-10"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <DrawerFooter>
          <Button variant="ghost" className="w-full" onClick={resetFilters}>
            Reset all filters
          </Button>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
