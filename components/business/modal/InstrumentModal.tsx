import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";

interface Instruments {
  _id: string;
  instrumentFamily: string;
  instrumentTypes: string[];
  serviceType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type InstrumentModalProps = {
  newInstrumentName: string;
  setNewInstrumentName: (name: string) => void;
  instrumentGroups: Record<string, unknown>; // Not used, but kept for compatibility
  selectedFamily: string;
  setSelectedFamily: (family: string) => void;
  handleAddInstrument: () => void;
  setInstrumentModalOpen: (open: boolean) => void;
  instruments: Instruments[];
};

const InstrumentModal = ({
  newInstrumentName,
  setNewInstrumentName,
  selectedFamily,
  setSelectedFamily,
  handleAddInstrument,
  setInstrumentModalOpen,
  instruments,
}: InstrumentModalProps) => {
  // Filter and group instrumentTypes by selected family
  const instrumentTypes = useMemo(() => {
    const typesSet = new Set<string>();
    instruments
      .filter((item) => item.instrumentFamily === selectedFamily)
      .forEach((item) => {
        item.instrumentTypes.forEach((type) => typesSet.add(type));
      });
    return Array.from(typesSet);
  }, [instruments, selectedFamily]);

  // Extract unique families for radio buttons
  const uniqueFamilies = useMemo(() => {
    const familySet = new Set<string>();
    instruments.forEach((item) => familySet.add(item.instrumentFamily));
    return Array.from(familySet);
  }, [instruments]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Add Instrument</h2>

        {/* Instrument Name Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instrument Name
          </label>
          <Select
            onValueChange={setNewInstrumentName}
            value={newInstrumentName}
          >
            <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-gray-50 focus:outline-none h-[48px]">
              <SelectValue placeholder="Instrument Name" />
            </SelectTrigger>
            <SelectContent>
              {instrumentTypes.map((instrument) => (
                <SelectItem key={instrument} value={instrument}>
                  {instrument}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Instrument Family Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instrument Family
          </label>
          <div className="space-y-2">
            {uniqueFamilies.map((family) => (
              <label
                key={family}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="instrument-family"
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
