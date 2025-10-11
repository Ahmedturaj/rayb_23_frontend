import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFilterStore } from "@/zustand/stores/search-store";
import React from "react";

const AlsoOffers = ({}) => {
  const items = [
    { label: "Buy" },
    { label: "Sell" },
    { label: "Trade" },
    { label: "Rental" },
    { label: "Music Lessons" },
  ];

  const { setOffers } = useFilterStore();

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full"
      >
        <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger className="hover:no-underline text-xl gap-2 justify-normal">
            Also Offers
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-2">
            <div className=" space-y-3">
              {items.map((item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    onChange={() => setOffers(true)}
                  />
                  <span className="text-base">{item.label}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AlsoOffers;
