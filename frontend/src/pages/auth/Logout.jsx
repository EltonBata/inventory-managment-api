import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../services/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
function Logout() {
  const { logout, token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const logoutReq = async () => {
        const toastId = toast.loading("Please wait...");

        const res = await logoutRequest({ token: token });

        logout();

        toast.update(toastId, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeButton: true,
        });
      };

      logoutReq();
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
  }, []);

  return <Loader loading={true} />;
}

export default Logout;
