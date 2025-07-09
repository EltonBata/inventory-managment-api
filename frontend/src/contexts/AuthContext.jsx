import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [token, setToken] = useState({
    token: localStorage.getItem("token"),
    token_expires_at: localStorage.getItem("token_expires_at"),
  });

  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (token.token == "null" || token.token_expires_at == "null") {
      setIsAuthenticated(false);
    } else {
      const now = new Date();
      const expiration_token = new Date(token.token_expires_at);

      const is_expired = now > expiration_token;

      if (is_expired) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expires_at");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (token.token != "null" && token.token_expires_at != "null") {
      localStorage.setItem("token", token.token);
      localStorage.setItem("token_expires_at", token.token_expires_at);
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("token_expires_at");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, [token.token, token.token_expires_at]);

  return (
    <AuthContext.Provider
      value={{
        token: token.token,
        setToken,
        isAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useToken() {
  return useContext(AuthContext);
}
