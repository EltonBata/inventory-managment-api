import { useState } from "react";
import useForm from "../../hooks/useForm.js";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Card from "./components/Card.jsx";
import { authenticate } from "../../services/auth.js";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext.jsx";

function LoginPage() {
  const [isBtnDisabled, disableBtn] = useState(false);

  const { values, handleChange, resetForm, errors, setErrors } = useForm({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  let btn_classes = "";

  if (isBtnDisabled) btn_classes = "skeleton btn-disabled";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    disableBtn(true);

    const toastId = toast.loading("Please wait...");

    const credentials = { email: values.email, password: values.password };

    try {
      const res = await authenticate(credentials);

      login(res.user, {
        token: res.token,
        token_expires_at: res.token_expires_at,
      });

      toast.update(toastId, {
        render: res.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
      });

      const roleNames = res.user.roles.map((r) => r.role_name);

      if (roleNames.includes("customer")) {
        navigate("/customers/dashboard");
      }

      if (roleNames.includes("provider")) {
        navigate("/providers/dashboard");
      }
    } catch (error) {
      toast.update(toastId, {
        render: error?.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
      });

      if (error.errors) {
        setErrors({
          email: error.errors.email ?? "",
          password: error.errors.password ?? "",
        });
      }
    } finally {
      disableBtn(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="pb-5">
        <h2 className="text-xl text-gray-600 text-center">Login</h2>

        <fieldset className="fieldset my-1.5">
          <legend className="fieldset-legend text-sm font-normal">
            Email:
          </legend>

          <label className="input validator w-full bg-slate-200">
            <FaEnvelope className="text-gray-400" />
            <input
              type="email"
              name="email"
              className={`${errors.email ? "border-error" : ""}`}
              placeholder="mail@site.com"
              required
              defaultValue={values.email}
              onChange={handleChange}
            />
          </label>
          <p className="validator-hint hidden">Enter a valid email address</p>

          <p className={`text-error ${errors.email ? "" : "hidden"}`}>
            {errors.email}
          </p>
        </fieldset>

        <fieldset className="fieldset my-1.5">
          <legend className="fieldset-legend text-sm font-normal">
            Password:
          </legend>

          <label className="input validator w-full bg-slate-200">
            <FaKey className="text-gray-400" />
            <input
              type="password"
              name="password"
              className={`${errors.password ? "border-error" : ""}`}
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including a number, a lowercase letter, and an uppercase letter"
              defaultValue={values.password}
              onChange={handleChange}
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
          <p className={`text-error ${errors.password ? "" : "hidden"}`}>
            {errors.password}
          </p>
          <div className="text-right mt-1">
            <Link
              to="/forgot-password"
              className="text-blue-900 hover:underline text-xs"
            >
              Forgot your password?
            </Link>
          </div>
        </fieldset>

        <button
          className={`btn bg-slate-600 hover:bg-slate-700 text-white w-full my-2 text-sm font-medium rounded-lg border-0 ${btn_classes}`}
        >
          {isBtnDisabled ? "Loading..." : "Login"}
        </button>

        <div className="text-center text-sm text-gray-700 mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-900 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </Card>
  );
}

export default LoginPage;
