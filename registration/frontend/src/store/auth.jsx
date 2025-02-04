import { createContext, useContext } from "react";

export const AuthContext = createContext();

const storetokenInLs = (serverToken) => {
  return localStorage.setItem("token", serverToken);
};

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ storetokenInLs }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authcontextvalue = useContext(AuthContext);

  if (!authcontextvalue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authcontextvalue;
};
