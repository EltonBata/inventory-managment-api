import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function AuthLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default AuthLayout;
