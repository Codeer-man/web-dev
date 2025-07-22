import React, { createContext } from "react";

const Data = createContext<string>("");

const Transfer = ({ children }: { children: React.ReactNode }) => {
  const name = "man";

  return <Data.Provider value={name}>{children}</Data.Provider>;
};

export { Data, Transfer };

