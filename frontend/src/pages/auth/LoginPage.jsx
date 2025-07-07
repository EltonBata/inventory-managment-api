import { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "./components/Card.jsx";

function LoginPage() {
  const [isBtnDisabled, disableBtn] = useState(false);

  let btn_classes = "";

  if (isBtnDisabled) {
    btn_classes = "skeleton btn-disabled";
  }

  return (
    <Card>
      <form method="" action="" className="pb-5">
        <h2 className="text-xl text-gray-600 text-center">Login</h2>

        <fieldset className="fieldset my-1.5">
          <legend className="fieldset-legend text-sm font-normal">
            Email:
          </legend>

          <label className="input validator w-full bg-slate-200">
            <FaEnvelope className="text-gray-400" />
            <input type="email" placeholder="mail@site.com" required />
          </label>
          <div className="validator-hint hidden">
            Enter a valid email address
          </div>
        </fieldset>

        <fieldset className="fieldset my-1.5">
          <legend className="fieldset-legend text-sm font-normal">
            Password:
          </legend>

          <label className="input validator w-full bg-slate-200">
            <FaKey className="text-gray-400" />
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including a number, a lowercase letter, and an uppercase letter"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
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
          onClick={() => disableBtn((prevState) => !prevState)}
          className={`btn bg-slate-600 hover:bg-slate-700 text-white w-full my-2 text-sm font-medium rounded-lg border-0 ${btn_classes}`}
        >
          Login
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
