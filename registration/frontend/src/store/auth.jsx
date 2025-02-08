import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const storetokenInLs = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  // tackling the logout function
  const LogoutUser = () => {
    setToken("");
    setUser("");
    return localStorage.removeItem("token");
  };

  let isloggedIn = !!token;

  // JWT authencation - to get currently logged  user data

  const UserAuthencatoin = async () => {
    try {
      const respomse = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (respomse.ok) {
        const data = await respomse.json();
        setUser(data.userdata);
        console.log(data);
      }
    } catch (error) {
      console.error("something wrong", error);
    }
  };

  useEffect(() => {
    if (token) {
      UserAuthencatoin();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isloggedIn, storetokenInLs, LogoutUser, user }}
    >
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
