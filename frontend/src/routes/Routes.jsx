import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../pages/auth/AuthLayout.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import ErrorsLayout from "../pages/errors/ErrorsLayout.jsx";
import NotFoundPage from "../pages/errors/NotFoundPage.jsx";
import { useToken } from "../contexts/AuthContext.jsx";

function IsAuthenticated({ children }) {
  const { isAuthenticated } = useToken();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

function IsNotAuthenticated({ children }) {
  const { isAuthenticated } = useToken();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return children;
}

function RoutesList() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <IsNotAuthenticated>
            <AuthLayout />
          </IsNotAuthenticated>
        }
      >
        <Route index element={<LoginPage />} />

        <Route
          path="/login"
          element={
            <IsNotAuthenticated>
              <Navigate to="/" />
            </IsNotAuthenticated>
          }
        />
        <Route
          path="/register"
          element={
            <IsNotAuthenticated>
              <RegisterPage />
            </IsNotAuthenticated>
          }
        />
      </Route>

      <Route path="/" element={<ErrorsLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesList;
