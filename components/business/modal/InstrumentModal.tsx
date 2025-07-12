type InstrumentModalProps = {
  newInstrumentName: string;
  setNewInstrumentName: (name: string) => void;
  instrumentGroups: Record<string, unknown>;
  selectedFamily: string;
  setSelectedFamily: (family: string) => void;
  handleAddInstrument: () => void;
  setInstrumentModalOpen: (open: boolean) => void;
};

const InstrumentModal = ({
  newInstrumentName,
  setNewInstrumentName,
  instrumentGroups,
  selectedFamily,
  setSelectedFamily,
  handleAddInstrument,
  setInstrumentModalOpen,
}: InstrumentModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Add Instrument</h2>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instrument Name
          </label>
          <input
            type="text"
            placeholder="Type instrument name"
            value={newInstrumentName}
            onChange={(e) => setNewInstrumentName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-gray-50 focus:outline-none h-[48px]"
          />
        </div>

        {/* Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instrument Family
          </label>
          <div className="space-y-2">
            {Object.keys(instrumentGroups).map((family) => (
              <label
                key={family}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={family}
                  checked={selectedFamily === family}
                  onChange={() => setSelectedFamily(family)}
                  className="form-radio text-teal-600"
                />
                <span className="text-gray-800">{family}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAddInstrument}
            className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
          >
            Add Instrument
          </button>
          <button
            onClick={() => setInstrumentModalOpen(false)}
            className="flex-1 border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstrumentModal;
