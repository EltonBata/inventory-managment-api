import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [token, setToken] = useState({
    token: Cookies.get("token"),
    token_expires_at: Cookies.get("token_expires_at"),
  });

  const [user, setUser] = useState(() => {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (
      !token.token ||
      token.token === undefined ||
      !token.token_expires_at ||
      token.token_expires_at === undefined
    ) {
      setIsAuthenticated(false);
    } else {
      const now = new Date();
      const expiration_token = new Date(token.token_expires_at);

      const is_expired = now > expiration_token;

      if (is_expired) {
        Cookies.remove("token");
        Cookies.remove("token_expires_at");
        Cookies.remove("user");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }

    setAuthChecked(true);
  }, []);

  useEffect(() => {
    if (
      token.token &&
      token.token !== undefined &&
      token.token_expires_at &&
      token.token_expires_at != undefined
    ) {
      const expiration = new Date(token.token_expires_at);

      Cookies.set("token", token.token, { expires: expiration });
      Cookies.set("token_expires_at", token.token_expires_at);
      Cookies.set("user", JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      Cookies.remove("token");
      Cookies.remove("token_expires_at");
      Cookies.remove("user");
      setIsAuthenticated(false);
    }
  }, [token.token, token.token_expires_at]);

  return (
    <AuthContext.Provider
      value={{
        token: token.token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        authChecked,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
