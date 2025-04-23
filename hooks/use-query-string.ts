import { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback } from "react";

export type ParamUpdates = Record<string, string | undefined>;

/**
 * useQueryParams – Hook to generate querystrings dynamically.
 * - You can set several key/value-pairs at the same time
 * - It is possible to remove keys if needed
 *
 * @param searchParams - URLSearchParams from next/navigation
 * @returns - querystrings with selected updates
 */
export const useQueryParams = (searchParams: ReadonlyURLSearchParams) =>
  useCallback(
    (updates: ParamUpdates, removeKeys?: string[]): string => {
      const params = new URLSearchParams(searchParams.toString());

      // If removeKeys -> remove these
      if (removeKeys && removeKeys.length > 0) {
        removeKeys.forEach((key) => {
          params.delete(key);
        });
      }

      // Add/update selected params
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.set(key, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );
