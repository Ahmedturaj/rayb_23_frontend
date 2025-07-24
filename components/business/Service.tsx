import React, { useState } from "react";
import InstrumentModal from "./modal/InstrumentModal";
import { Plus } from "lucide-react";
import ServiceModal from "./modal/ServiceModal";
import { useQuery } from "@tanstack/react-query";
import { getAllInstrument } from "@/lib/api";


interface Instruments {
  _id: string;
  instrumentFamily : string;
  instrumentTypes: string[];
}

const Service = () => {
  const [instrumentModalOpen, setInstrumentModalOpen] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [newInstrumentName, setNewInstrumentName] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("Strings");
  const [pricingType, setPricingType] = useState("exact");
  const [price, setPrice] = useState("");

  const { data: allInstrument } = useQuery({
    queryKey: ["get-all-instrument"],
    queryFn: async () => {
      const res = await getAllInstrument();
      return res?.data;
    },
  });

  const serviceGroup = ["Guitar", "Ukulele", "Flute", "Drums", "Bass"];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<string[]>([]);

  const handleAddInstrument = () => {
    if (!newInstrumentName.trim()) return;
    setSelected((prev) => [...prev, newInstrumentName.trim()]);
    setNewInstrumentName("");
    setSelectedFamily("Strings");
    setInstrumentModalOpen(false);
  };

  const options = [
    {
      id: "buy",
      label: "Buy Instruments",
      description:
        "If the business buys instruments from customers (e.g. trade-ins or buying used instruments), select this service.",
    },
    {
      id: "sell",
      label: "Sell Instruments",
      description:
        "If the business sells new or used instruments, select this service.",
    },
    {
      id: "trade",
      label: "Trade Instruments",
      description:
        "If the business allows customers to trade in instruments for credit or other instruments, select this service.",
    },
    {
      id: "rent",
      label: "Rent Instruments",
      description:
        "If the business allows the customers to rent the instruments, select this service.",
    },
  ];

  const toggleOption = (id: OptionKey) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const instrumentGroups = {
    Strings: ["Guitar", "Violin", "Cello", "Harp"],
    Brass: ["Trumpet", "Trombone", "Tuba", "French Horn"],
    Woodwinds: ["Saxophone", "Clarinet", "Flute"],
    Percussions: ["Drums", "Symbol", "Xylophone"],
  };

  const [value, setValue] = useState("");

  type OptionKey = "buy" | "sell" | "trade" | "rent";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOptions, setSelectedOptions] = useState<
    Record<OptionKey, boolean>
  >({
    buy: true,
    sell: true,
    trade: true,
    rent: true,
  });

  return (
    <div>
      <div className="space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-[28px] font-semibold">2. Services Offered</h2>
          <p className="text-[#485150] text-[16px]">
            Now, you can specify the services the business provides for each
            selected instrument family. This section helps the customers
            understand exactly what you offer.
          </p>
          <p className="text-[#485150] text-[16px]">
            In addition to repairs and adjustments, you can also offer services
            related to buying, selling, trading, and teaching instruments.
          </p>
          <p className="text-[#139a8e] text-[16px] lg:max-w-6xl">
            We encourage businesses to provide pricing information for better
            customer visibility and to improve search results. Pricing does not
            need to be exact and can be listed as estimates or ranges.
          </p>
        </div>

        {/* Instrument Services */}
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Instrument Repairs & Services
          </h3>
          <h3 className="text-xl font-semibold mb-2">
            Select / Add Instruments
          </h3>
          <p className="text-[#485150] text-[16px] lg:max-w-6xl">
            Help customers understand the types of instruments the business
            services by selecting the relevant instrument families. These
            categories help us match the services with customers’ needs.
          </p>

          {/* Instrument Groups */}
          <div className="grid grid-cols-2 gap-8 mt-5">
            {allInstrument?.map((instruments: Instruments) => (
              <div key={instruments?._id}>
                <h4 className="font-medium text-gray-900 mb-3">
                  {instruments?.instrumentFamily}
                </h4>
                <div className="space-y-2">
                  {instruments?.instrumentTypes.map((instrument) => (
                    <label
                      key={instrument}
                      className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox w-4 h-4 text-teal-600 rounded accent-[#139a8e]"
                      />
                      {instrument}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add Instrument Button */}
          <button
            type="button"
            className="mt-10 inline-flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-md text-sm hover:bg-teal-50 transition-colors w-[100%] md:w-[580px] h-[48px]"
            onClick={() => setInstrumentModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add an Instrument
          </button>
        </div>

        {/* Service Type & Pricing */}
        <div>
          <h3 className="text-xl font-semibold">Service Type & Pricing</h3>

          {/* category select */}
          <div className="my-5 grid grid-cols-3 lg:grid-cols-5 lg:w-[500px]">
            {serviceGroup.map((service, index) => (
              <button
                key={index}
                className="bg-[#139a8e] py-3 px-5 rounded-lg w-[80px]"
              >
                {service}
              </button>
            ))}
          </div>

          {/* pricing input field */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* field 1 */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <label className="block text-xl font-medium text-gray-700 mb-2">
                  Restringing
                </label>

                <div className="flex items-center space-x-4 mb-3">
                  {["Exact", "Range", "Hourly"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-1 text-sm text-gray-600"
                    >
                      <input
                        type="radio"
                        name="pricingType"
                        value={type.toLowerCase()}
                        checked={pricingType === type.toLowerCase()}
                        onChange={() => setPricingType(type.toLowerCase())}
                        className="accent-teal-500"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="$  Service Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
              />
            </div>

            {/* field 2 */}
            <div className="lg:col-span-1">
              <label className="block text-xl font-medium text-gray-700 mb-2">
                Setup & Adjustments
              </label>

              <input
                type="text"
                placeholder="$  Service Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
              />
            </div>

            {/* field 3 */}
            <div className="lg:col-span-1">
              <div>
                <div className="flex items-center space-x-4 mb-3">
                  {["Exact", "Range", "Hourly"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-1 text-sm text-gray-600"
                    >
                      <input
                        type="radio"
                        name="pricingType"
                        value={type.toLowerCase()}
                        checked={pricingType === type.toLowerCase()}
                        onChange={() => setPricingType(type.toLowerCase())}
                        className="accent-teal-500"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="$  Service Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
              />
            </div>

            {/* field 4 */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <label className="block text-xl font-medium text-gray-700 mb-2">
                  Replating
                </label>

                <div className="flex items-center space-x-4 mb-3">
                  {["Exact", "Range", "Hourly"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-1 text-sm text-gray-600"
                    >
                      <input
                        type="radio"
                        name="pricingType"
                        value={type.toLowerCase()}
                        checked={pricingType === type.toLowerCase()}
                        onChange={() => setPricingType(type.toLowerCase())}
                        className="accent-teal-500"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="$  Service Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
              />
            </div>
          </div>

          {/* Add Instrument Button */}
          <button
            type="button"
            className="mt-10 inline-flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-md text-sm hover:bg-teal-50 transition-colors w-[100%] md:w-[580px] h-[48px]"
            onClick={() => setServiceModal(true)}
          >
            <Plus className="w-4 h-4" />
            Add a Service
          </button>
        </div>

        {/* Buy / Sell / Trade / Rent */}
        <div>
          <h3 className="text-xl font-semibold">Buy / Sell / Trade / Rent</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-5">
            {options.map((option) => (
              <label
                key={option.id}
                className="flex items-start space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  // checked={selectedOptions[option.id]}
                  onChange={() => toggleOption(option.id as OptionKey)}
                  className="mt-1 accent-teal-600 w-4 h-4"
                />
                <div>
                  <div className="text-lg font-medium text-gray-900">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {option.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Music Lessons */}
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Music Lessons</h1>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-1 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="musicLessons"
                  value="yes"
                  checked={value === "yes"}
                  onChange={() => setValue("yes")}
                  className="accent-teal-600"
                />
                <span>Yes</span>
              </label>

              <label className="flex items-center space-x-1 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="musicLessons"
                  value="no"
                  checked={value === "no"}
                  onChange={() => setValue("no")}
                  className="accent-teal-600"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* add instrument for music lessons */}
          {value === "yes" && (
            <div className="mt-5">
              {/* Instrument Services */}
              <div className="mb-5">
                <h3 className="text-xl font-semibold mb-2">
                  Select / Add Instruments
                </h3>
                <p className="text-[#485150] text-[16px] lg:max-w-6xl">
                  Help customers understand the types of instruments the
                  business services by selecting the relevant instrument
                  families. These categories help us match the services with
                  customers’ needs.
                </p>

                {/* Instrument Groups */}
                <div className="grid grid-cols-2 gap-8 mt-5">
                  {Object.entries(instrumentGroups).map(
                    ([group, instruments]) => (
                      <div key={group}>
                        <h4 className="font-medium text-gray-900 mb-3">
                          {group}
                        </h4>
                        <div className="space-y-2">
                          {instruments.map((instrument) => (
                            <label
                              key={instrument}
                              className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="form-checkbox w-4 h-4 text-teal-600 rounded accent-[#139a8e]"
                              />
                              {instrument}
                            </label>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Add Instrument Button */}
                <button
                  type="button"
                  className="mt-10 inline-flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-md text-sm hover:bg-teal-50 transition-colors w-[100%] md:w-[580px] h-[48px]"
                  onClick={() => setInstrumentModalOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Add an Instrument
                </button>
              </div>

              {/* Service Type & Pricing */}
              <div>
                <h3 className="text-xl font-semibold">
                  Service Type & Pricing
                </h3>

                {/* category select */}
                <div className="my-5 grid grid-cols-3 lg:grid-cols-5 lg:w-[500px]">
                  {serviceGroup.map((service, index) => (
                    <button
                      key={index}
                      className="bg-[#139a8e] py-3 px-5 rounded-lg w-[80px]"
                    >
                      {service}
                    </button>
                  ))}
                </div>

                {/* pricing input field */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* field 1 */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xl font-medium text-gray-700 mb-2">
                        Restringing
                      </label>

                      <div className="flex items-center space-x-4 mb-3">
                        {["Exact", "Range", "Hourly"].map((type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-1 text-sm text-gray-600"
                          >
                            <input
                              type="radio"
                              name="pricingType"
                              value={type.toLowerCase()}
                              checked={pricingType === type.toLowerCase()}
                              onChange={() =>
                                setPricingType(type.toLowerCase())
                              }
                              className="accent-teal-500"
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="$  Service Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                    />
                  </div>

                  {/* field 2 */}
                  <div className="lg:col-span-1">
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Setup & Adjustments
                    </label>

                    <input
                      type="text"
                      placeholder="$  Service Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                    />
                  </div>

                  {/* field 3 */}
                  <div className="lg:col-span-1">
                    <div>
                      <div className="flex items-center space-x-4 mb-3">
                        {["Exact", "Range", "Hourly"].map((type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-1 text-sm text-gray-600"
                          >
                            <input
                              type="radio"
                              name="pricingType"
                              value={type.toLowerCase()}
                              checked={pricingType === type.toLowerCase()}
                              onChange={() =>
                                setPricingType(type.toLowerCase())
                              }
                              className="accent-teal-500"
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="$  Service Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                    />
                  </div>

                  {/* field 4 */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xl font-medium text-gray-700 mb-2">
                        Replating
                      </label>

                      <div className="flex items-center space-x-4 mb-3">
                        {["Exact", "Range", "Hourly"].map((type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-1 text-sm text-gray-600"
                          >
                            <input
                              type="radio"
                              name="pricingType"
                              value={type.toLowerCase()}
                              checked={pricingType === type.toLowerCase()}
                              onChange={() =>
                                setPricingType(type.toLowerCase())
                              }
                              className="accent-teal-500"
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="$  Service Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                    />
                  </div>
                </div>

                {/* Add Instrument Button */}
                <button
                  type="button"
                  className="mt-10 inline-flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-md text-sm hover:bg-teal-50 transition-colors w-[100%] md:w-[580px] h-[48px]"
                  onClick={() => setServiceModal(true)}
                >
                  <Plus className="w-4 h-4" />
                  Add a Service
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Instrument Modal */}
      {instrumentModalOpen && (
        <InstrumentModal
          newInstrumentName={newInstrumentName}
          setNewInstrumentName={setNewInstrumentName}
          instrumentGroups={instrumentGroups}
          selectedFamily={selectedFamily}
          setSelectedFamily={setSelectedFamily}
          handleAddInstrument={handleAddInstrument}
          setInstrumentModalOpen={setInstrumentModalOpen}
          instruments={allInstrument}
        />
      )}

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
        />
      )}
    </div>
  );
};

export default Service;
