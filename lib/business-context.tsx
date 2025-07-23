"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface BusinessContextProps {
  selectedBusinessId: string | undefined;
  setSelectedBusinessId: (id: string | undefined) => void;
}

const BusinessContext = createContext<BusinessContextProps | undefined>(undefined);

interface BusinessContextProviderProps {
  children: ReactNode;
}

export function BusinessContextProvider({ children }: BusinessContextProviderProps): JSX.Element {
  const [selectedBusinessId, setBusinessId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedId = localStorage.getItem("selectedBusinessId");
    if (storedId) {
      setBusinessId(storedId);
    }
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
    <BusinessContext.Provider value={{ selectedBusinessId, setSelectedBusinessId }}>
      {children}
    </BusinessContext.Provider>
  );
}

export const useBusinessContext = (): BusinessContextProps => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusinessContext must be used within a BusinessContextProvider");
  }
  return context;
};