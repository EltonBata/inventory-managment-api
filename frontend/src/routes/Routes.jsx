import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../pages/auth/AuthLayout.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import ErrorsLayout from "../pages/errors/ErrorsLayout.jsx";
import NotFoundPage from "../pages/errors/NotFoundPage.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import Layout from "../pages/layouts/Layout.jsx";
import CustomerDashboard from "../pages/customers/CustomerDashboard.jsx";
import Logout from "../pages/auth/Logout.jsx";

function PrivateRoutes({ children }) {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) {
    return "Loading";
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicRoutes({ children }) {
  const { isAuthenticated, authChecked, user } = useAuth();

  if (!authChecked) {
    return "Loading";
  }
  if (isAuthenticated) {
    const roleNames = user.roles.map((r) => r.role_name);

    if (roleNames.includes("customer")) {
      return <Navigate to="/customers/dashboard" />;
    }

    if (roleNames.includes("provider")) {
      return <Navigate to="/providers/dashboard" />;
    }
  }

  return children;
}

function RoutesList() {
  return (
    <Routes>
      {/* auth routes */}
      <Route
        path="/"
        element={
          <PublicRoutes>
            <AuthLayout />
          </PublicRoutes>
        }
      >
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* logout */}
      <Route
        path="logout"
        element={
          <PrivateRoutes>
            <Logout />
          </PrivateRoutes>
        }
      />

      {/* customers routes */}
      <Route
        path="customers"
        element={
          <PrivateRoutes>
            <Layout />
          </PrivateRoutes>
        }
      >
        <Route path="dashboard" element={<CustomerDashboard />} />
      </Route>

      <Route path="/" element={<ErrorsLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesList;
