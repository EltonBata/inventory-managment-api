import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../pages/auth/AuthLayout.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginPage />}></Route>
        <Route path="/login" element={<Navigate to="/" />}></Route>
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default RoutesList;
