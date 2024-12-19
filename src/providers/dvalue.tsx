"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Dvalue = string;

interface DvalueContextType {
  Dvalue: Dvalue;
  setDvalue: (Dvalue: Dvalue) => void;
}

const DvalueContext = createContext<DvalueContextType | undefined>(undefined);

export const DvalueProvider = ({ children }: { children: ReactNode }) => {
  const [Dvalue, setDvalue] = useState<Dvalue>("");

  return (
    <DvalueContext.Provider value={{ Dvalue, setDvalue }}>
      {children}
    </DvalueContext.Provider>
  );
};

export const useDvalue = () => {
  const context = useContext(DvalueContext);
  if (!context) {
    throw new Error("useDvalue must be used within a DvalueProvider");
  }
  return context;
};
