import { useContext, createContext, useContext } from "react";

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  return <Authcontext.provider values={{}}>{children}</Authcontext.provider>;
};

export const userAuth = () => {
  const authContextValue = useContext(Authcontext);

  if (!authContextValue) {
    throw new console.error("UseAuth used outside of the Privider");
  }
  return authContextValue;
};
