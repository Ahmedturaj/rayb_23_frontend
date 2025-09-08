import { create } from "zustand";

interface TagType {
  label: string;
}

interface IFilterStore {
  familyTag: TagType[];
  setFamilyTag: (value: string) => void;
  removeFamilyTag: (value: string) => void;
  instrumentTag: TagType[];
  setInstrumentTag: (value: string) => void;
  removeInstrumentTag: (value: string) => void;
  serviceTag: TagType[];
  setServiceTag: (value: string) => void;
  removeServiceTag: (value: string) => void;
}

const initialState: Pick<
  IFilterStore,
  "familyTag" | "instrumentTag" | "serviceTag"
> = {
  familyTag: [],
  instrumentTag: [],
  serviceTag: [],
};

export const useFilterStore = create<IFilterStore>((set) => ({
  ...initialState,
  setFamilyTag: (value) =>
    set(() => ({
      familyTag: [{ label: value }],
    })),
  removeFamilyTag: (value) =>
    set((state) => ({
      familyTag: state.instrumentTag.filter((t) => t.label !== value),
    })),
  setInstrumentTag: (value) =>
    set(() => ({
      instrumentTag: [{ label: value }],
    })),
  removeInstrumentTag: (value) =>
    set((state) => ({
      instrumentTag: state.instrumentTag.filter((t) => t.label !== value),
    })),
  setServiceTag: (value) =>
    set(() => ({
      serviceTag: [{ label: value }],
    })),
  removeServiceTag: (value) =>
    set((state) => ({
      serviceTag: state.serviceTag.filter((t) => t.label !== value),
    })),
}));
