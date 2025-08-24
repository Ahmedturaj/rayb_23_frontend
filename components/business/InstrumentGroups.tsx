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

interface PropsTypes {
  allInstrument: Instruments[];
  selectedInstruments: string[];
  setSelectedInstruments: (instruments: string[]) => void;
  setInstrumentFamily: (family: string) => void;
}

const InstrumentGroups = ({
  allInstrument,
  selectedInstruments,
  setSelectedInstruments,
  setInstrumentFamily,
}: PropsTypes) => {
  const toggleInstrument = (instrument: string, instrumentFamily: string) => {
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(
        selectedInstruments.filter((item: string) => item !== instrument)
      );
    } else {
      setSelectedInstruments([...selectedInstruments, instrument]);
      setInstrumentFamily(instrumentFamily);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8 mt-5">
      {allInstrument?.map((instruments: Instruments) => (
        <div key={instruments._id}>
          <h4 className="font-medium text-gray-900 mb-3">
            {instruments.instrumentFamily}
          </h4>
          <div className="space-y-2">
            {instruments.instrumentTypes.map((instrument) => (
              <label
                key={instrument._id}
                className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedInstruments.includes(instrument.type)}
                  onChange={() =>
                    toggleInstrument(instrument.type, instruments.instrumentFamily)
                  }
                  className="form-checkbox w-4 h-4 text-teal-600 rounded accent-[#139a8e]"
                />
                {instrument.type}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstrumentGroups;
