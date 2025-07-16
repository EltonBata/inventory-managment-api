import { useAuth } from "../../contexts/AuthContext";

function CustomerDashboard() {
  const { user } = useAuth();

  return <h1>{user.username}</h1>;
}

export default CustomerDashboard;
