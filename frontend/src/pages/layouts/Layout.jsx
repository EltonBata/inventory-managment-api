import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useState } from "react";
import { useEffect } from "react";
import VerificationMessage from "../components/VerificationMessage";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { refreshToken, verifyEmail } from "../../services/auth";
import Sidebar from "../components/Sidebar";

function Layout() {
  const { user, setUser, token, token_expiration, setToken } = useAuth();

  const [loaded, setLoaded] = useState(false);

  const { id, hash } = useParams();

  const [searchParams] = useSearchParams();

  const expires = searchParams.get("expires");
  const signature = searchParams.get("signature");

  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);

    const emailVerification = async () => {
      if (id && hash) {
        const toastId = toast.loading("Please wait...");

        const trueHash = `${hash}?expires=${expires}&signature=${signature}`;

        try {
          const res = await verifyEmail({
            id: id,
            hash: trueHash,
            token: token,
          });

          setUser((prev) => ({ ...prev, user_verified: true }));

          refreshToken(token_expiration, setToken);

          toast.update(toastId, {
            render: res.message,
            type: "success",
            isLoading: false,
            autoClose: 3000,
            hideProgressBar: false,
            closeButton: true,
          });
        } catch (error) {
          toast.update(toastId, {
            render: error?.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
            hideProgressBar: false,
            closeButton: true,
          });
        } finally {
          navigate("/", { replace: true });
        }
      }
    };

    emailVerification();
  }, []);

  return (
    <>
      {!loaded && <Loader loading={true} />}
      {!user.user_verified && <VerificationMessage />}
      <div className="h-screen">
        <div className="h-fit">
          <Header />
        </div>

        <div className="grid grid-cols-6 h-full">
          <div className="hidden sm:block col-span-1 relative">
            <Sidebar />
          </div>

          <div className="col-span-full sm:col-span-5 p-4 overflow-y-auto">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
