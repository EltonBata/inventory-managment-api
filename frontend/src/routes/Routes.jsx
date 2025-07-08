import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../pages/auth/AuthLayout.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import ErrorsLayout from "../pages/errors/ErrorsLayout.jsx";
import NotFoundPage from "../pages/errors/NotFoundPage.jsx";
import { useToken } from "../contexts/AuthContext.jsx";

function AuthenticatedMiddleware({ children }) {
  const { isAuthenticated } = useToken();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

function NotAuthenticatedMiddleware({ children }) {
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
          <NotAuthenticatedMiddleware>
            <AuthLayout />
          </NotAuthenticatedMiddleware>
        }
      >
        <Route index element={<LoginPage />} />

        <Route
          path="/login"
          element={
            <NotAuthenticatedMiddleware>
              <Navigate to="/" />
            </NotAuthenticatedMiddleware>
          }
        />
        <Route
          path="/register"
          element={
            <NotAuthenticatedMiddleware>
              <RegisterPage />
            </NotAuthenticatedMiddleware>
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
