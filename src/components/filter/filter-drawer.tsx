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
import { CircleX, Settings2 } from "lucide-react";
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
      <DrawerTrigger className="flex gap-3 cursor-pointer">
        Filter <Settings2 />
      </DrawerTrigger>
      <DrawerContent className="h-full w-[90%] ml-auto max-w-sm p-4 space-y-6">
        <DrawerHeader>
          <div className="flex justify-between">
            <DrawerTitle className="text-2xl">Filter movies</DrawerTitle>
            <DrawerClose className="cursor-pointer">
              <CircleX></CircleX>
            </DrawerClose>
          </div>

          <DrawerDescription>
            Mix and match info to discover movies.
          </DrawerDescription>
        </DrawerHeader>
        <Accordion type="multiple" className="w-full space-y-2">
          <AccordionItem value="categories">
            <AccordionTrigger className="cursor-pointer">
              Categories
            </AccordionTrigger>
            <AccordionContent>
              <CategorySelect categories={categories}></CategorySelect>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="release-year">
            <AccordionTrigger className="cursor-pointer">
              Release year
            </AccordionTrigger>
            <AccordionContent>
              <FilterSection
                paramKeyFrom="yearFrom"
                paramKeyTo="yearTo"
                placeholder="Enter year (YYYY)"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="runtime">
            <AccordionTrigger className="cursor-pointer">
              Runtime (minutes)
            </AccordionTrigger>
            <AccordionContent>
              <FilterSection
                paramKeyFrom="runtimeMin"
                paramKeyTo="runtimeMax"
                placeholder="Enter minutes"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rating">
            <AccordionTrigger className="cursor-pointer">
              Rating (vote)
            </AccordionTrigger>
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
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={resetFilters}
          >
            Reset all filters
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
