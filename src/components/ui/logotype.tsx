import React from "react";
import Image from "next/image";

interface LogotypeProps {
  width?: number;
  height?: number;
  className?: string;
}

export const Logotype = ({
  width = 200,
  height = 150,
  className,
}: LogotypeProps) => {
  return (
    <Image
      src="/assets/images/memovies.png"
      alt="Memovies logotype"
      width={width}
      height={height}
      className={className}
    />
  );
};
