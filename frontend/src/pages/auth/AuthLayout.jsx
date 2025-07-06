import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

const AuthLayout = () => {
  
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
