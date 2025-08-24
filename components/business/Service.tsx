import React, { useState } from "react";
import { Plus } from "lucide-react";
import ServiceModal from "./modal/ServiceModal";
import ServiceSectionHeader from "./ServiceSectionHeader";
import AddInstrumentTitle from "./AddInstrumentTitle";
import InstrumentGroups from "./InstrumentGroups";
import BuySellGroup from "./BuySellGroup";
import ControlMusicLessons from "./ControlMusicLessons";
import InstrumentGroupsMusic from "./InstrumentGroupsMusic";
import { toast } from "sonner";
import ServiceModalMusic from "./modal/ServiceModalMusic";

type OptionKey = "buy" | "sell" | "trade" | "rent";

interface InstrumentType {
  _id: string;
  type: string;
  serviceType: string[];
}

interface Instruments {
  _id: string;
  instrumentFamily: string;
  instrumentTypes: InstrumentType[];
}

interface Service {
  newInstrumentName: string;
  pricingType: string;
  minPrice: string;
  maxPrice: string;
  price: string;
  selectedInstrumentsGroup?: string;
  selectedInstrumentsGroupMusic?: string;
}

interface PropsTypes {
  allInstrument: Instruments[];
  selectedInstruments: string[];
  setSelectedInstruments: (instruments: string[]) => void;
  selectedInstrumentsMusic: string[];
  setSelectedInstrumentsMusic: (instruments: string[]) => void;
  selectedInstrumentsGroup: string;
  setSelectedInstrumentsGroup: (instrument: string) => void;
  selectedInstrumentsGroupMusic: string;
  setSelectedInstrumentsGroupMusic: (instrument: string) => void;
  newInstrumentName: string;
  setNewInstrumentName: (name: string) => void;
  pricingType: string;
  setPricingType: (type: string) => void;
  price: string;
  setPrice: (price: string) => void;
  handleAddInstrument: () => void;
  handleAddInstrumentMusic: () => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  selected: Service[];
  setSelected: (value: Service[]) => void;
  selectedMusic: Service[];
  setSelectedMusic: (value: Service[]) => void;
  serviceModal: boolean;
  setServiceModal: (value: boolean) => void;
  serviceModalMusic: boolean;
  setServiceModalMusic: (value: boolean) => void;
  selectedOptions: Record<OptionKey, boolean>;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<OptionKey, boolean>>
  >;
  setInstrumentFamily: (family: string) => void;
}

const Service = ({
  allInstrument,
  selectedInstruments,
  setSelectedInstruments,
  selectedInstrumentsMusic,
  setSelectedInstrumentsMusic,
  selectedInstrumentsGroup,
  setSelectedInstrumentsGroup,
  selectedInstrumentsGroupMusic,
  setSelectedInstrumentsGroupMusic,
  newInstrumentName,
  setNewInstrumentName,
  pricingType,
  setPricingType,
  price,
  setPrice,
  handleAddInstrument,
  handleAddInstrumentMusic,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selected,
  serviceModal,
  setServiceModal,
  serviceModalMusic,
  setServiceModalMusic,
  selectedMusic,
  selectedOptions,
  setSelectedOptions,
  setInstrumentFamily,
}: PropsTypes) => {
  const [value, setValue] = useState("");

  const handleService = () => {
    if (selectedInstruments.length === 0 || !selectedInstrumentsGroup) {
      return toast.error("Please select an instrument!");
    } else {
      setServiceModal(true);
    }
  };

  const handleServiceMusic = () => {
    if (
      selectedInstrumentsMusic.length === 0 ||
      !selectedInstrumentsGroupMusic
    ) {
      return toast.error("Please select an instrument!");
    } else {
      setServiceModalMusic(true);
    }
  };

  return (
    <div>
      <div className="space-y-10">
        {/* Section Header */}
        <ServiceSectionHeader />

        {/* Instrument Services */}
        <div>
          <AddInstrumentTitle />

          {/* Instrument Groups */}
          <InstrumentGroups
            setInstrumentFamily={setInstrumentFamily}
            selectedInstruments={selectedInstruments}
            setSelectedInstruments={setSelectedInstruments}
            allInstrument={allInstrument}
          />
        </div>

        {/* Service Type & Pricing */}
        <div>
          <h3 className="text-xl font-semibold">Service Type & Pricing</h3>

          {/* category select */}
          <div>
            {selectedInstruments.length > 0 ? (
              <div className="my-5 grid grid-cols-3 lg:grid-cols-5 gap-2 max-w-[800px]">
                {selectedInstruments.map((service, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`border border-gray-200 py-3 px-5 rounded-lg ${
                      selectedInstrumentsGroup === service &&
                      "bg-teal-600 text-white"
                    }`}
                    onClick={() => {
                      setSelectedInstrumentsGroup(service);

                      const foundFamily = allInstrument.find((group) =>
                        group.instrumentTypes.some((instrument) => instrument.type === service)
                      )?.instrumentFamily;

                      if (foundFamily) {
                        setInstrumentFamily(foundFamily);
                      }
                    }}
                  >
                    {service}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-8">
                <h1 className="font-medium text-gray-500">
                  Please select an instrument
                </h1>
              </div>
            )}
          </div>

          {/* instrument pricing list */}
          <div className="grid grid-cols-3 gap-8 mt-8">
            {selected.length > 0 &&
              selected.map(
                (select, index) =>
                  selectedInstrumentsGroup ===
                    select.selectedInstrumentsGroup && (
                    <div key={index} className="max-w-md rounded-lg">
                      {/* Service Name Input */}
                      <div>
                        <label className="block font-medium text-gray-700 text-xl">
                          {select.newInstrumentName}
                        </label>
                      </div>

                      {/* Service Pricing Input */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 mb-3">
                            {["Exact", "Range", "Hourly"].map((type) => (
                              <label
                                key={type}
                                className="flex items-center space-x-1 text-sm text-gray-600"
                              >
                                <input
                                  type="radio"
                                  checked={
                                    select.pricingType === type.toLowerCase()
                                  }
                                  readOnly
                                  className="accent-teal-500 cursor-not-allowed"
                                />
                                <span>{type}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Conditional Pricing Inputs */}
                        {select.pricingType === "range" ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Min Price"
                              value={select.minPrice}
                              disabled
                              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50 disabled:cursor-not-allowed"
                            />
                            <input
                              type="text"
                              placeholder="Max Price"
                              value={select.maxPrice}
                              disabled
                              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50 disabled:cursor-not-allowed"
                            />
                          </div>
                        ) : (
                          <input
                            type="text"
                            placeholder="$  Service Price"
                            value={select.price}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50 disabled:cursor-not-allowed"
                          />
                        )}
                      </div>
                    </div>
                  )
              )}
          </div>

          {/* Add Instrument Button */}
          <button
            type="button"
            disabled={
              selectedInstruments.length === 0 || !selectedInstrumentsGroup
            }
            className="mt-10 inline-flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-md text-sm hover:bg-teal-50 transition-colors w-[100%] md:w-[580px] h-[48px] disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-600"
            onClick={handleService}
          >
            <Plus className="w-4 h-4" />
            Add a Service
          </button>
        </div>

        {/* Buy / Sell / Trade / Rent */}
        <BuySellGroup
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />

        {/* Music Lessons */}
        <div>
          <ControlMusicLessons value={value} setValue={setValue} />

          {/* add instrument for music lessons */}
          {value === "yes" && (
            <div className="mt-5">
              {/* Instrument Services */}
              <div>
                <AddInstrumentTitle />

                {/* Instrument Groups */}
                <InstrumentGroupsMusic
                  selectedInstrumentsMusic={selectedInstrumentsMusic}
                  setSelectedInstrumentsMusic={setSelectedInstrumentsMusic}
                  allInstrument={allInstrument}
                />
              </div>

              {/* Service Type & Pricing */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold">
                  Service Type & Pricing
                </h3>

                {/* category select */}
                <div>
                  {selectedInstrumentsMusic.length > 0 ? (
                    <div className="my-5 grid grid-cols-3 lg:grid-cols-5 gap-2 max-w-[800px]">
                      {selectedInstrumentsMusic.map((service, index) => (
                        <button
                          type="button"
                          key={index}
                          className={`border border-gray-200 py-3 px-5 rounded-lg ${
                            selectedInstrumentsGroupMusic === service &&
                            "bg-teal-600 text-white"
                          }`}
                          onClick={() => {
                            setSelectedInstrumentsGroupMusic(service);

                            const foundFamily = allInstrument.find((group) =>
                              group.instrumentTypes.some((instrument) => instrument.type === service)
                            )?.instrumentFamily;

                            if (foundFamily) {
                              setInstrumentFamily(foundFamily);
                            }
                          }}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-8">
                      <h1 className="font-medium text-gray-500">
                        Please select an instrument
                      </h1>
                    </div>
                  )}
                </div>

                {/* instrument pricing list */}
                <div className="grid grid-cols-3 gap-8 mt-8">
                  {selectedMusic.length > 0 &&
                    selectedMusic.map(
                      (select, index) =>
                        selectedInstrumentsGroupMusic ===
                          select.selectedInstrumentsGroupMusic && (
                          <div key={index} className="max-w-md rounded-lg">
                            {/* Service Name Input */}
                            <div>
                              <label className="block font-medium text-gray-700 text-xl">
                                {select.newInstrumentName}
                              </label>
                            </div>

                            {/* Service Pricing Input */}
                            <div className="lg:col-span-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 mb-3">
                                  {["Exact", "Range", "Hourly"].map((type) => (
                                    <label
                                      key={type}
                                      className="flex items-center space-x-1 text-sm text-gray-600"
                                    >
                                      <input
                                        type="radio"
                                        checked={
                                          select.pricingType ===
                                          type.toLowerCase()
                                        }
                                        readOnly
                                        className="accent-teal-500 cursor-not-allowed"
                                      />
                                      <span>{type}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>

                              {/* Conditional Pricing Inputs */}
                              {select.pricingType === "range" ? (
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Min Price"
                                    value={select.minPrice}
                                    disabled
                                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50 disabled:cursor-not-allowed"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Max Price"
                                    value={select.maxPrice}
                                    disabled
                                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50 disabled:cursor-not-allowed"
                                  />
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  placeholder="$  Service Price"
                                  value={select.price}
                                  disabled
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50 disabled:cursor-not-allowed"
                                />
                              )}
                            </div>
                          </div>
                        )
                    )}
                </div>

                {/* Add Instrument Button */}
                <button
                  type="button"
                  disabled={
                    selectedInstrumentsMusic.length === 0 ||
                    !selectedInstrumentsGroupMusic
                  }
                  className="mt-10 inline-flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-md text-sm hover:bg-teal-50 transition-colors w-[100%] md:w-[580px] h-[48px] disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-600"
                  onClick={handleServiceMusic}
                >
                  <Plus className="w-4 h-4" />
                  Add a Service
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* services modal */}
      {serviceModal && (
        <ServiceModal
          newInstrumentName={newInstrumentName}
          setNewInstrumentName={setNewInstrumentName}
          handleAddInstrument={handleAddInstrument}
          setServiceModal={setServiceModal}
          pricingType={pricingType}
          setPricingType={setPricingType}
          price={price}
          setPrice={setPrice}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      )}

      {/* services music modal */}
      {serviceModalMusic && (
        <ServiceModalMusic
          newInstrumentName={newInstrumentName}
          setNewInstrumentName={setNewInstrumentName}
          handleAddInstrumentMusic={handleAddInstrumentMusic}
          setServiceModalMusic={setServiceModalMusic}
          pricingType={pricingType}
          setPricingType={setPricingType}
          price={price}
          setPrice={setPrice}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      )}
    </div>
  );
};

export default Service;
