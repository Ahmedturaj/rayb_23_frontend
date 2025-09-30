"use client";

import { useSearchStore } from "@/components/home/states/useSearchStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterStore } from "@/zustand/stores/search-store";
import React from "react";

const ResultsFiltering = () => {
  const { setSort } = useFilterStore();
  const { location } = useSearchStore();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-gray-500">24 Results for</h1>
        <h1 className="text-xl font-bold">{`${location}`}</h1>
      </div>

      <div>
        <h1 className="text-gray-500">Sort by</h1>
        <Select
          defaultValue="high-to-low"
          onValueChange={(value) => setSort(value)}
        >
          <SelectTrigger className="border-none focus:ring-offset-0 p-0 h-5 focus:ring-0 shadow-none justify-normal gap-2 focus:border-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high-to-low">Rated High to Low</SelectItem>
            <SelectItem value="low-to-high">Rated Low to High</SelectItem>
            <SelectItem value="price-low-to-high">Price Low to High</SelectItem>
            <SelectItem value="price-high-to-low">Price High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ResultsFiltering;
