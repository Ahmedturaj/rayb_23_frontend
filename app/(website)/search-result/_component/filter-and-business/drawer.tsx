"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import FilterInfo from "./filter-info";
import { Filter } from "lucide-react";

export function FilterDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Filter /> <span>Filters</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-5">
        <FilterInfo />
      </DrawerContent>
    </Drawer>
  );
}
