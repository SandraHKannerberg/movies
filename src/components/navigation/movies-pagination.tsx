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
import { useQueryParams } from "../../../hooks/use-query-string";
import { getPageNumbers } from "@/lib/utils";

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
  const createQueryString = useQueryParams(searchParams);

  // Previous page
  const prevPage = Math.max(currentPage - 1, 1);
  const prevQueryString = createQueryString({ page: String(prevPage) });
  const prevHref = `${pathname}?${prevQueryString}`;

  // Next page
  const nextPage = currentPage + 1;
  const nextQueryString = createQueryString({ page: String(nextPage) });
  const nextHref = `${pathname}?${nextQueryString}`;

  // Navigate to selected pagenumber
  const handleClick = (e: React.MouseEvent, page: number | "...") => {
    e.preventDefault();
    const href = `${pathname}?${createQueryString({ page: String(page) })}`;
    router.push(href);
  };

  const pagesToRender = getPageNumbers(currentPage, totalPages);

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

        {/* Pagenumbers */}
        {pagesToRender.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={`${pathname}?${createQueryString({
                  page: String(prevPage),
                })}`}
                onClick={(e) => {
                  handleClick(e, page);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

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
