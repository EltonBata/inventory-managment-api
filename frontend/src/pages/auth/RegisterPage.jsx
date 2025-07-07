import { useState } from "react";
import { FaEnvelope, FaKey, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "./components/Card.jsx";

function RegisterPage() {
  const [isBtnDisabled, disableBtn] = useState(false);

  let btn_classes = "";

  if (isBtnDisabled) {
    btn_classes = "skeleton btn-disabled";
  }

  return (
    <Card wd="w-full md:w-4/5 lg:w-3/5">
      <form method="" action="" className="pb-5">
        <h2 className="text-xl text-gray-600 text-center">Register</h2>

        <div className="grid grid-cols-2 gap-1.5">
          <div className="col-span-2 md:col-span-1">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-normal">
                Username:
              </legend>

              <label className="input validator w-full bg-slate-200">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  placeholder="username"
                  required
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  title="Only letters, numbers or dash"
                />
              </label>
              <p className="validator-hint hidden">
                Must be 3 to 30 characters
                <br />
                containing only letters, numbers or dash
              </p>
            </fieldset>
          </div>

          <div className="col-span-2 md:col-span-1">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-normal">
                Email:
              </legend>

              <label className="input validator w-full bg-slate-200">
                <FaEnvelope className="text-gray-400" />
                <input type="email" placeholder="mail@site.com" required />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </fieldset>
          </div>

          <div className="col-span-2 md:col-span-1">
            <fieldset className="fieldset">
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
          </div>

          <div className="col-span-2 md:col-span-1">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-normal">
                Password Confirmation:
              </legend>

              <label className="input validator w-full bg-slate-200">
                <FaKey className="text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="Confirm password"
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
          </div>
        </div>

        <button
          onClick={() => disableBtn((prevState) => !prevState)}
          className={`btn bg-slate-600 hover:bg-slate-700 text-white w-full mb-2 mt-5 text-sm font-medium rounded-lg border-0 ${btn_classes}`}
        >
          Register
        </button>

        <div className="text-center text-sm text-gray-700 mt-2">
          Already have an account?{" "}
          <Link to="/" className="text-blue-900 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </Card>
  );
}

export default RegisterPage;
