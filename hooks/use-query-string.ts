import { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback } from "react";

//https://react.dev/reference/react/useCallback
const useQueryString = (searchParams: ReadonlyURLSearchParams) =>
  useCallback(
    (name: string, value: string) => {
      // Use the old search params as base for making the new ones
      const newSearchParams = new URLSearchParams(searchParams.toString());
      // Add our new value to the key/value pair
      newSearchParams.set(name, value);
      return newSearchParams.toString();
    },
    [searchParams]
  );

export default useQueryString;
