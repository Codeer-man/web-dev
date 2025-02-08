import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [Services, setGetServices] = useState({});

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
        console.log(data.userdata);
      }
    } catch (error) {
      console.error("something wrong", error);
    }
  };

  // fetch servics data from db
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/services/find", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGetServices(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.error("Frontend error", error);
    }
  };

  useEffect(() => {
    if (token) {
      UserAuthencatoin();
    }
  }, [token]);

  useEffect(() => {
    getServices();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isloggedIn, storetokenInLs, LogoutUser, user, Services }}
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
