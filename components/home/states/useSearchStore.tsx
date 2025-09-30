import { create } from "zustand";

interface ISearchStore {
  location: string;
  setLocation: (value: string) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  location: "",
  setLocation: (value: string) => set({ location: value }),
}));
