import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function useUpdateToken() {
  const { token_expiration, setToken } = useAuth();

  useEffect(() => {
    if (!token_expiration) return;

    const tokenExpiration = new Date(token_expiration);

    const refreshed = new Date(tokenExpiration.getTime() + 30 * 60000); // +30 minutos

    setToken((prev) => ({
      ...prev,
      token_expires_at: refreshed.toISOString(),
    }));
  }, []);
}

export default useUpdateToken;
