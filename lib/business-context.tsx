"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getMyBusinesses } from "./api";


interface BusinessContextProps {
  selectedBusinessId: string | undefined;
  setSelectedBusinessId: (id: string | undefined) => void;
}

const BusinessContext = createContext<BusinessContextProps | undefined>(
  undefined
);

interface BusinessContextProviderProps {
  children: ReactNode;
}

// --------- Provider ---------
export function BusinessContextProvider({
  children,
}: BusinessContextProviderProps): JSX.Element {
  const [selectedBusinessId, setBusinessId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const initialize = async () => {
      const storedId = localStorage.getItem("selectedBusinessId");
      if (storedId) {
        setBusinessId(storedId);
      } else {
        try {
          const businesses = await getMyBusinesses();
          if (businesses.length > 0) {
            const firstId = businesses[0]._id;
            localStorage.setItem("selectedBusinessId", firstId);
            setBusinessId(firstId);
          }
        } catch (error) {
          console.error("Error initializing businesses:", error);
        }
      }
    };

    initialize();
  }, []);

  const setSelectedBusinessId = (id: string | undefined) => {
    if (id) {
      localStorage.setItem("selectedBusinessId", id);
    } else {
      localStorage.removeItem("selectedBusinessId");
    }
    setBusinessId(id);
  };

  return (
    <BusinessContext.Provider
      value={{ selectedBusinessId, setSelectedBusinessId }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

// --------- Hook ---------
export const useBusinessContext = (): BusinessContextProps => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error(
      "useBusinessContext must be used within a BusinessContextProvider"
    );
  }
  return context;
};