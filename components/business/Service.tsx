import React, { useState } from "react";
import { Plus } from "lucide-react";
import ServiceModal from "./modal/ServiceModal";
import ServiceSectionHeader from "./ServiceSectionHeader";
import AddInstrumentTitle from "./AddInstrumentTitle";
import InstrumentGroups from "./InstrumentGroups";
import BuySellGroup from "./BuySellGroup";
import ControlMusicLessons from "./ControlMusicLessons";
import InstrumentGroupsMusic from "./InstrumentGroupsMusic";

interface Instruments {
  _id: string;
  instrumentFamily: string;
  instrumentTypes: string[];
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
}: PropsTypes) => {
  const [serviceModal, setServiceModal] = useState(false);
  const [newInstrumentName, setNewInstrumentName] = useState("");
  const [pricingType, setPricingType] = useState("exact");
  const [price, setPrice] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<string[]>([]);

  const handleAddInstrument = () => {
    if (!newInstrumentName.trim()) return;
    setSelected((prev) => [...prev, newInstrumentName.trim()]);
    setNewInstrumentName("");
  };

  const [value, setValue] = useState("");

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
                    onClick={() => setSelectedInstrumentsGroup(service)}
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
        <BuySellGroup />

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
                          key={index}
                          className={`border border-gray-200 py-3 px-5 rounded-lg ${
                            selectedInstrumentsGroupMusic === service &&
                            "bg-teal-600 text-white"
                          }`}
                          onClick={() =>
                            setSelectedInstrumentsGroupMusic(service)
                          }
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
