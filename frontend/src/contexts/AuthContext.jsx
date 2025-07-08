import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, isAuthenticated: !!token, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useToken() {
  return useContext(AuthContext);
}
