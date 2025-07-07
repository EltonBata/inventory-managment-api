import { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "./components/Card.jsx";
import { authenticate } from "../../services/auth.js";
import { toast } from "react-toastify";

function LoginPage() {
  const [isBtnDisabled, disableBtn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState({ email: "", password: "" });

  let btn_classes = "";

  if (isBtnDisabled) btn_classes = "skeleton btn-disabled";

  const handleSubmit = async (e) => {
    e.preventDefault();

    disableBtn(true);

    const toastId = toast.loading("Please wait...");

    const creadentials = { email, password };

    try {
      const res = await authenticate(creadentials);

      toast.update(toastId, {
        render: "Logged in successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error?.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
      });

      if (error.errors) {
        setInputError({
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
              className={`${inputError.email ? "border-error" : ""}`}
              placeholder="mail@site.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setInputError((prev) => ({ ...prev, email: "" }));
              }}
            />
          </label>
          <p className="validator-hint hidden">Enter a valid email address</p>

          <p className={`text-error ${inputError.email ? "" : "hidden"}`}>
            {inputError.email}
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
              className={`${inputError.password ? "border-error" : ""}`}
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including a number, a lowercase letter, and an uppercase letter"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setInputError((prev) => ({ ...prev, password: "" }));
              }}
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
          <p className={`text-error ${inputError.password ? "" : "hidden"}`}>
            {inputError.password}
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
