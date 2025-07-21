import { useContext, useEffect, useState, createContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => ({
    token: Cookies.get("token"),
    token_expires_at: Cookies.get("token_expires_at"),
  }));

  const isValidToken = (token) => {
    if (!token?.token || !token?.token_expires_at) return false;

    const now = new Date();
    const expiration = new Date(token.token_expires_at);
    return now <= expiration;
  };

  const [user, setUser] = useState(() => {
    const userCookie = Cookies.get("user");
    try {
      return userCookie ? JSON.parse(userCookie) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (isValidToken(token)) {
      setIsAuthenticated(true);
    } else {
      Cookies.remove("token");
      Cookies.remove("token_expires_at");
      Cookies.remove("user");
      setIsAuthenticated(false);
    }
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    const expiration = new Date(token.token_expires_at);

    if (token.token && token.token_expires_at) {
      Cookies.set("token", token.token, { expires: expiration });
      Cookies.set("token_expires_at", token.token_expires_at, {
        expires: expiration,
      });
      Cookies.set("user", JSON.stringify(user), { expires: expiration });

      setIsAuthenticated(true);
    } else {
      Cookies.remove("token");
      Cookies.remove("token_expires_at");
      Cookies.remove("user");
      setIsAuthenticated(false);
    }
  }, [token.token, token.token_expires_at, user]);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken({ token: null, token_expires_at: null });
    Cookies.remove("token");
    Cookies.remove("token_expires_at");
    Cookies.remove("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token: token.token,
        token_expiration: token.token_expires_at,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        authChecked,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
