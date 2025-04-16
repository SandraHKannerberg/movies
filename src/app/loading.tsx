import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="flex gap-2">
      <Skeleton className="w-[20px] h-[20px] rounded-full bg-neutral-600" />
      <Skeleton className="w-[20px] h-[20px] rounded-full bg-neutral-600" />
      <Skeleton className="w-[20px] h-[20px] rounded-full bg-neutral-600" />
    </div>
  );
}
