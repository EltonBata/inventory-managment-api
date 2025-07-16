import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function ErrorsLayout() {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center bg-linear-to-r from-slate-200 to-slate-500 p-3">
      <Outlet />
      <Footer />
    </div>
  );
}

export default ErrorsLayout;
