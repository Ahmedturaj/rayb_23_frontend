import { create } from "zustand";

interface ISearchStore {
  location: string;
  setLocation: (value: string) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  location: "San Francisco, CA",
  setLocation: (value: string) => set({ location: value }),
}));
