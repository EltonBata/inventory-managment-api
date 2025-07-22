import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function RequirePermission({ allowedRoles = [], children }) {
  const { user } = useAuth();

  const userRoles = user.roles.map((r) => r.role_name);

  const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasPermission) {
    return <Navigate to="/forbidden-page" replace />;
  }

  return children;
}
