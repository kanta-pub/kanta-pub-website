"use client";

import React, { Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button"; 
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  ${
            currentPage === page
              ? " text-white "
              : "text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => replace(createPageURL(page))}
        >
          {page}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 bg-white shadow-sm rounded-lg">
        <div className="flex flex-1 justify-between sm:hidden">
          <Button
            variant="outline"
            onClick={() => replace(createPageURL(currentPage - 1))}
            disabled={currentPage <= 1}
            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-offset-2"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => replace(createPageURL(currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-offset-2"
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <Button
                variant="outline"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => replace(createPageURL(currentPage - 1))}
                disabled={currentPage <= 1}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </Button>
              {renderPageButtons()}
              <Button
                variant="outline"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => replace(createPageURL(currentPage + 1))}
                disabled={currentPage >= totalPages}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
