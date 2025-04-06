"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchComponent({
  placeholder = "Search...",
  queryKey = "query",
  pageKey = "page",
  onSearch,
  onClear,
  buttonLabel = "Search",
  clearLabel = "Clear",
  inputClassName = "",
  buttonClassName = "",
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialQuery = searchParams.get(queryKey) || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const createSearchURL = (query, resetPage = false) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set(queryKey, query);
    } else {
      params.delete(queryKey);
    }
    if (resetPage) {
      params.set(pageKey, "1"); // Reset page to 1
    }
    return `${pathname}?${params.toString()}`;
  };

  const handleSearch = () => {
    replace(createSearchURL(searchQuery, true));
    if (onSearch) onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    replace(createSearchURL("", true));
    if (onClear) onClear();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full text-black ${inputClassName}`}
        />
        <Button
          variant="outline"
          onClick={handleSearch}
          className={`flex items-center space-x-2 bg-red-400 ${buttonClassName}`}
        >
          <Search className="h-5 w-5" />
          <span className="hidden sm:block">{buttonLabel}</span>
        </Button>
        <Button
          variant="ghost"
          onClick={handleClear}
          className="text-gray-500 hover:text-red-600"
        >
          {clearLabel}
        </Button>
      </div>
    </Suspense>
  );
}