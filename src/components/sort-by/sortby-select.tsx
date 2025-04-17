"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useQueryParams } from "../../../hooks/use-query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { sortOptions, sortOrders } from "@/constants";

export const SortBySelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useQueryParams(searchParams);

  const currentValue = searchParams.get("sortBy") ?? "popularity.desc";

  const handleChange = (value: string) => {
    const queryString = createQueryString({ sortBy: value }, ["page"]);
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <div className="flex gap-2">
      <Label htmlFor="sortby">Sort by</Label>
      <Select value={currentValue} onValueChange={handleChange}>
        <SelectTrigger
          name="sortby"
          id="sortby"
          className="min-w-[180px] cursor-pointer"
        >
          <SelectValue
            placeholder="Sort by options"
            className="text-neutral-50"
          />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((sort) => {
            const orderSet = sortOrders[sort.type];

            return (["asc", "desc"] as const).map((suffix) => {
              const config = orderSet[suffix];
              const value = `${sort.value}.${suffix}`;
              const Icon = config.icon;

              return (
                <SelectItem
                  key={value}
                  value={value}
                  className="flex items-center gap-2 cursor-pointer hover:bg-primary"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {sort.label} ({config.label})
                </SelectItem>
              );
            });
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
