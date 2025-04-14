"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useQueryString from "../../../hooks/use-query-string";

const MoviesPagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useQueryString(searchParams);

  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = currentPage + 1;

  const prevQueryString = createQueryString("page", String(prevPage));
  const nextQueryString = createQueryString("page", String(nextPage));

  const prevHref = `${pathname}?${prevQueryString}`;
  const nextHref = `${pathname}?${nextQueryString}`;

  const handleClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    const href = `${pathname}?${createQueryString("page", String(page))}`;
    router.push(href);
  };

  return (
    <Pagination className="my-10">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={prevHref}
            onClick={(e) => handleClick(e, prevPage)}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {/* Current page / total pages */}
        <div className="flex items-center px-2">
          <span>
            {currentPage} / {totalPages}
          </span>
        </div>

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href={nextHref}
            onClick={(e) => handleClick(e, nextPage)}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MoviesPagination;
