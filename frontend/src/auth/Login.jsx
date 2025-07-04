import Card from "./components/Card.jsx";
import { useState } from "react";
import { FaKey, FaUser } from "react-icons/fa";

const Login = () => {
  const [isBtnDisabled, disableBtn] = useState(false);

  let btn_classes = "";

  if (isBtnDisabled) {
    btn_classes = "skeleton btn-disabled";
  }

  return (
    <Card>
      <div className="pb-5">
        <h2 className="text-xl text-gray-600 text-center">Login</h2>

        <fieldset className="fieldset my-1.5">
          <legend className="fieldset-legend text-sm font-normal">
            Email:
          </legend>

          <label className="input validator w-full bg-slate-200">
            <FaUser className="text-gray-400" />
            <input type="email" placeholder="mail@site.com" required />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
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
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
        </fieldset>

        <button
          onClick={() => disableBtn((prevState) => !prevState)}
          className={`btn bg-slate-600 hover:bg-slate-700 text-white w-full my-5 text-sm font-medium rounded-lg border-0 ${btn_classes}`}
        >
          Login
        </button>
      </div>
    </Card>
  );
};

export default Login;
