import React from "react";
import { Skeleton } from "./skeleton";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="flex gap-2">
        <Skeleton className="w-[20px] h-[20px] rounded-full bg-rose-950" />
        <Skeleton className="w-[20px] h-[20px] rounded-full bg-rose-900" />
        <Skeleton className="w-[20px] h-[20px] rounded-full bg-rose-800" />
      </div>
    </div>
  );
};
