import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../pages/auth/AuthLayout.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import ErrorsLayout from "../pages/errors/ErrorsLayout.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import Layout from "../pages/layouts/Layout.jsx";
import CustomerDashboard from "../pages/customers/CustomerDashboard.jsx";
import Logout from "../pages/auth/Logout.jsx";
import Loader from "../pages/components/Loader.jsx";
import ProviderDashboard from "../pages/providers/ProviderDashboard.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ProductsPage from "../pages/admin/ProductsPage.jsx";
import Forbidden from "../pages/errors/Forbidden.jsx";
import RequirePermission from "../contexts/RequirePermission.jsx";
import NotFoundPage from "../pages/errors/NotFoundPage.jsx";

function PrivateRoutes({ children }) {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) {
    return <Loader loading={true} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicRoutes({ children }) {
  const { isAuthenticated, authChecked, user } = useAuth();

  if (!authChecked) {
    return <Loader loading={true} />;
  }

  if (isAuthenticated) {
    const roleNames = user.roles.map((r) => r.role_name);

    if (roleNames.includes("customer")) {
      return <Navigate to="/customers/dashboard" />;
    }

    if (roleNames.includes("provider")) {
      return <Navigate to="/providers/dashboard" />;
    }

    if (roleNames.includes("admin")) {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  return children;
}

function RoutesList() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        element={
          <PublicRoutes>
            <AuthLayout />
          </PublicRoutes>
        }
      >
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Private Routes */}
      <Route
        element={
          <PrivateRoutes>
            <Layout />
          </PrivateRoutes>
        }
      >
        <Route path="logout" element={<Logout />} />

        {/* Customers */}

        <Route
          path="customers/dashboard"
          element={
            <RequirePermission allowedRoles={["customer"]}>
              <CustomerDashboard />
            </RequirePermission>
          }
        />

        {/* Providers */}
        <Route
          path="providers/dashboard"
          element={
            <RequirePermission allowedRoles={["provider"]}>
              <ProviderDashboard />
            </RequirePermission>
          }
        />

        {/* Admin */}
        <Route
          path="admin/dashboard"
          element={
            <RequirePermission allowedRoles={["admin"]}>
              <AdminDashboard />
            </RequirePermission>
          }
        />

        <Route
          path="admin/products"
          element={
            <RequirePermission allowedRoles={["admin"]}>
              <ProductsPage />
            </RequirePermission>
          }
        />

        {/* Verify email */}
        <Route path="auth/verify/:id/:hash" element={null} />
      </Route>

      {/* Error Routes */}
      <Route
        element={
          <PrivateRoutes>
            <ErrorsLayout />
          </PrivateRoutes>
        }
      >
        <Route path="*" element={<NotFoundPage />} />
        <Route path="forbidden-page" element={<Forbidden />} />
      </Route>
    </Routes>
  );
}

export default RoutesList;
