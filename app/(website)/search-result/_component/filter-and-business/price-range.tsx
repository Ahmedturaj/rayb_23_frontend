import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const PriceRange = ({}) => {
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
            Price Range
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-2 text-balance">
            <h1 className="text-gray-600">
              Pricing is an estimate and subject to change. Contact the shop for
              an accurate quote.
            </h1>

            <div className="flex items-center justify-between mt-3">
              <input
                className="border border-gray-200 focus:outline-none h-[50px] p-2 rounded-md bg-[#f7f8f8] w-[110px]"
                placeholder="Min"
              />

              <div className="border w-[25px]"></div>

              <input
                className="border border-gray-200 focus:outline-none h-[50px] p-2 rounded-md bg-[#f7f8f8] w-[110px]"
                placeholder="Max"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PriceRange;
