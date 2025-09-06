"use client";
import React from "react";
import InstrumentFamily from "./instrument-family";
import { getAllInstrument } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import SelectInstrument from "./select-instrument";
import ServiceType from "./service-type";
import PriceRange from "./price-range";

const FilterInfo = () => {
  const { data: instrumentFamilies = [], isLoading } = useQuery({
    queryKey: ["all-instrument"],
    queryFn: async () => {
      const res = await getAllInstrument();
      return res?.data;
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Filters</h1>

      <div className="mt-6 border-b">
        <InstrumentFamily
          instrumentFamilies={instrumentFamilies}
          isLoading={isLoading}
        />

        <SelectInstrument
          instrumentFamilies={instrumentFamilies}
          isLoading={isLoading}
        />

        <ServiceType
          instrumentFamilies={instrumentFamilies}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-3">
        <PriceRange />
      </div>
    </div>
  );
};

export default FilterInfo;
