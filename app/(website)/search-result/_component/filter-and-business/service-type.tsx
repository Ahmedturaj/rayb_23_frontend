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
  serviceType: string[]; // Added property
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

const ServiceType: React.FC<InstrumentFamilyProps> = ({
  instrumentFamilies,
  isLoading,
}) => {
  const { serviceTag, setServiceTag } = useFilterStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceTag(e.target.value);
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
            Service Type
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
                <div className="flex flex-col gap-2">
                  {family.instrumentTypes.map((type) => (
                    <div key={type._id} className="flex flex-col gap-1">
                      {/* Service Types under this instrument */}
                      {type.serviceType.length > 0 && (
                        <div className="flex flex-col gap-1">
                          {type.serviceType.map((service, i) => (
                            <label key={i} className="flex items-center gap-2">
                              <input
                                checked={serviceTag.some(
                                  (item) => item.label === service
                                )}
                                type="radio"
                                name={`service`}
                                value={service}
                                className="h-4 w-4 accent-primary"
                                onChange={handleInputChange}
                              />
                              <span className="text-base">{service}</span>
                            </label>
                          ))}
                        </div>
                      )}
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

export default ServiceType;
