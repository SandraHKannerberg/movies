"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const ClearFilterButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  // Check if params exists - only show this button when params exists
  const hasParams = Array.from(searchParams.entries()).length > 0;

  if (!hasParams) return null;

  const resetFilters = () => {
    router.push(pathname); // Reset all filters / sortby and remove all query parameters
  };

  return (
    <Button variant="ghost" className="cursor-pointer" onClick={resetFilters}>
      Clear all
    </Button>
  );
};

export default ClearFilterButton;
