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
  minPriceRange: string;
  setMinPriceRange: (value: string) => void;
  maxPriceRange: string;
  setMaxPriceRange: (value: string) => void;
  offers: boolean;
  setOffers: (value: boolean) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  sort: string;
  setSort: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}

const initialState: Pick<
  IFilterStore,
  | "familyTag"
  | "instrumentTag"
  | "serviceTag"
  | "minPriceRange"
  | "offers"
  | "maxPriceRange"
  | "open"
  | "sort"
  | "search"
> = {
  familyTag: [],
  instrumentTag: [],
  serviceTag: [],
  minPriceRange: "",
  offers: false,
  maxPriceRange: "",
  open: false,
  sort: "",
  search: "",
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

  setMinPriceRange: (value) => {
    set({ minPriceRange: value });
  },
  setMaxPriceRange: (value) => {
    set({ maxPriceRange: value });
  },
  setOffers: (value) => {
    set({ offers: value });
  },
  setOpen: (value) => {
    set({ open: value });
  },

  setSort: (value) => {
    set({
      sort: value,
    });
  },

  setSearch: (value) => {
    set({
      search: value,
    });
  },
}));
