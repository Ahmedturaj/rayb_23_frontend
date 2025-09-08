import FilterSkeleton from "@/components/shared/FilterSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFilterStore } from "@/zustand/stores/search-store";
import React from "react";

interface InstrumentType {
  type: string;
  _id: string;
}

interface InstrumentFamilyItem {
  _id: string;
  instrumentFamily: string;
  instrumentTypes: InstrumentType[];
}

interface InstrumentFamilyProps {
  instrumentFamilies: InstrumentFamilyItem[];
  isLoading: boolean;
}

const SelectInstrument: React.FC<InstrumentFamilyProps> = ({
  instrumentFamilies,
  isLoading,
}) => {
  const { setInstrumentTag, instrumentTag } = useFilterStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstrumentTag(e.target.value);
  };

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
            Select Instrument
          </AccordionTrigger>

          {isLoading ? (
            <div className="flex flex-col gap-2 mt-2">
              {[1, 2, 3].map((_, idx) => (
                <FilterSkeleton key={idx} />
              ))}
            </div>
          ) : (
            instrumentFamilies.map((family) => (
              <AccordionContent
                key={family._id}
                className="flex flex-col gap-2 text-balance"
              >
                {/* Instrument types */}
                <div className="flex flex-col gap-1">
                  {family.instrumentTypes.map((type) => (
                    <div key={type._id} className="flex items-center gap-2">
                      <label key={type._id} className="flex items-center gap-2">
                        <input
                          checked={instrumentTag.some(
                            (instrument) => instrument.label === type.type
                          )}
                          type="radio"
                          name="instrument"
                          value={type.type}
                          className="h-4 w-4 accent-primary"
                          onChange={handleInputChange}
                        />
                        <span className="text-base">{type.type}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            ))
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SelectInstrument;
