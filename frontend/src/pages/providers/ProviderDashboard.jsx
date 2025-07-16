import { useAuth } from "../../contexts/AuthContext";

export default function ProviderDashboard() {
  const { user } = useAuth();

  return <h1>{user.username}</h1>;
}
;
