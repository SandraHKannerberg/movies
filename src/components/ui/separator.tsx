"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      // className={cn(
      //   "bg-neutral-50 shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
      //   className
      // )}
      className={cn(
        "shrink-0 bg-white",
        orientation === "horizontal" ? "h-[5px] w-full" : "h-full w-[5px]",
        className
      )}
    />
  );
}

export { Separator };
