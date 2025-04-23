import { ArrowDown01, ArrowDownAZ, ArrowUpAZ, ArrowUp10 } from "lucide-react";

type SortType = "numeric" | "alphabetical";
type SortDirection = "asc" | "desc";

interface SortOption {
  label: string;
  value: string;
  type: SortType;
}

export const sortOptions: SortOption[] = [
  {
    label: "Popularity",
    value: "popularity",
    type: "numeric",
  },
  {
    label: "Movie Title",
    value: "title",
    type: "alphabetical",
  },
  {
    label: "Release year",
    value: "primary_release_date",
    type: "numeric",
  },
  {
    label: "Vote count",
    value: "vote_count",
    type: "numeric",
  },
  {
    label: "Rating",
    value: "vote_average",
    type: "numeric",
  },
];

export const sortOrders: Record<
  SortType,
  Record<
    SortDirection,
    {
      label: string;
      icon: React.ComponentType<{ className?: string }>;
    }
  >
> = {
  numeric: {
    asc: { label: "asc", icon: ArrowDown01 },
    desc: { label: "desc", icon: ArrowUp10 },
  },
  alphabetical: {
    asc: { label: "asc", icon: ArrowDownAZ },
    desc: { label: "desc", icon: ArrowUpAZ },
  },
};

export const ageRangeOptions = [
  "0-12",
  "13-19",
  "20-29",
  "30-39",
  "40-49",
  "50-59",
  "60-69",
  "70+",
];
