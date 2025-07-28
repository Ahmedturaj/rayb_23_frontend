interface Instruments {
  _id: string;
  instrumentFamily: string;
  instrumentTypes: string[];
}

interface PropsTypes {
  allInstrument: Instruments[];
  selectedInstruments: string[];
  setSelectedInstruments: (instruments: string[]) => void;
  setInstrumentFamily: (family: string) => void; // <-- make sure this is included
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
      setInstrumentFamily(instrumentFamily); // <-- set the instrument family
    }
  };

  return (
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
                  checked={selectedInstruments.includes(instrument)}
                  onChange={() =>
                    toggleInstrument(instrument, instruments.instrumentFamily)
                  }
                  className="form-checkbox w-4 h-4 text-teal-600 rounded accent-[#139a8e]"
                />
                {instrument}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstrumentGroups;
