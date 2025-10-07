import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISearchStore {
  location: string;
  setLocation: (value: string) => void;
}

export const useSearchStore = create<ISearchStore>()(
  persist(
    (set) => ({
      location: "San Francisco, CA",
      setLocation: (value: string) => set({ location: value }),
    }),
    {
      name: "search-location",
    }
  )
);
