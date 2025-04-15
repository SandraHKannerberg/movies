"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useQueryParams } from "../../../hooks/use-query-string";

export default function FilterSection({
  paramKeyFrom,
  paramKeyTo,
  placeholder,
}: {
  paramKeyFrom: string;
  paramKeyTo: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useQueryParams(searchParams);

  const handleChange = (key: string, value: string) => {
    const updated = createQueryString({ [key]: value }, ["page"]);
    router.push(`${pathname}?${updated}`);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor={`${paramKeyFrom}`}>Min</Label>
        <Input
          type="number"
          id={`${paramKeyFrom}`}
          placeholder={placeholder}
          defaultValue={searchParams.get(paramKeyFrom) ?? ""}
          onChange={(e) => handleChange(paramKeyFrom, e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor={`${paramKeyTo}`}>Max</Label>
        <Input
          type="number"
          id={`${paramKeyTo}`}
          placeholder={placeholder}
          defaultValue={searchParams.get(paramKeyTo) ?? ""}
          onChange={(e) => handleChange(paramKeyTo, e.target.value)}
        />
      </div>
    </div>
  );
}
