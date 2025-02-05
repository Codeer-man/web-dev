import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storetokenInLs = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  let isloggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isloggedIn, storetokenInLs, LogoutUser }}>
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
