import FilterSkeleton from "@/components/shared/FilterSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

interface InstrumentFamilyProps {
  instrumentFamilies: { instrumentFamily: string }[];
  isLoading: boolean;
}

const InstrumentFamily: React.FC<InstrumentFamilyProps> = ({
  instrumentFamilies,
  isLoading,
}) => {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full"
      >
        <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger className="hover:no-underline text-xl gap-2">
            Instrument Family
          </AccordionTrigger>

          {isLoading ? (
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((_, idx) => (
                <FilterSkeleton key={idx} />
              ))}
            </div>
          ) : (
            instrumentFamilies.map((item, index) => (
              <AccordionContent
                key={index}
                className="flex items-center gap-2 text-balance"
              >
                <input name="family" type="radio" className="h-4 w-4 accent-primary" />
                <h1 className="text-base">{item?.instrumentFamily}</h1>
              </AccordionContent>
            ))
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default InstrumentFamily;
