"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export const CardPagination = ({
  count,
  page,
}: {
  count: number;
  page: number;
}) => {
  const searchParams = useSearchParams();
  const card = searchParams.get("card");

  const totalPages = Math.ceil(count / 20);
  const baseUrl = `/trading/create/?page=`;

  const getPageNumbers = () => {
    const numbers: (number | string)[] = [];

    // Always add page 1
    numbers.push(1);

    // Add ellipsis if there's a gap after 1
    if (page > 3) {
      numbers.push("...");
    }

    // Add pages around current page
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    )
      if (!numbers.includes(i)) numbers.push(i);

    // Add ellipsis if there's a gap before last page
    if (page < totalPages - 2) numbers.push("...");

    // Add last page if not already included
    if (totalPages > 1 && !numbers.includes(totalPages))
      numbers.push(totalPages);

    return numbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${baseUrl}${Math.max(1, page - 1)}${card ? `&card=${card}` : ""}`}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const url = `${baseUrl}${pageNumber}${card ? `&card=${card}` : ""}`;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink href={url} isActive={pageNumber === page}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={`${baseUrl}${Math.min(totalPages, page + 1)}${card ? `&card=${card}` : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
