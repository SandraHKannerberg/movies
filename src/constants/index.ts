import { ArrowDown01, ArrowUp01, SortAsc, SortDesc } from "lucide-react";

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
    label: "Rating",
    value: "vote_count",
    type: "numeric",
  },
  {
    label: "Vote Average",
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
    asc: { label: "0 → 1", icon: ArrowUp01 },
    desc: { label: "1 → 0", icon: ArrowDown01 },
  },
  alphabetical: {
    asc: { label: "A → Z", icon: SortAsc },
    desc: { label: "Z → A", icon: SortDesc },
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
