import { useState } from "react";
import {
  FaAddressBook,
  FaAddressCard,
  FaEnvelope,
  FaKey,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Card from "./components/Card.jsx";
import useForm from "../../hooks/useForm.js";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { register } from "../../services/auth.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Loader from "../components/Loader.jsx";

function RegisterPage() {
  const [isBtnDisabled, disableBtn] = useState(false);

  const { values, handleChange, resetForm, errors, setErrors } = useForm({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    roles: [],
    customer_name: "",
    customer_address: "",
    provider_name: "",
    provider_address: "",
  });

  const { login } = useAuth();

  let btn_classes = "";

  if (isBtnDisabled) {
    btn_classes = "skeleton btn-disabled";
  }

  const navigate = useNavigate();

  //if roles change
  useEffect(() => {
    const roles = values.roles;

    const roles_fields = document.querySelectorAll(".role_fields");

    roles_fields.forEach(function (element) {
      if (!element.classList.contains("hidden"))
        element.querySelectorAll("input").forEach(function (input) {
          input.disabled = true;
        });
      element.classList.add("hidden");
    });

    roles.forEach(function (name) {
      const role = document.querySelector(`#${name}_fields`);

      role.classList.remove("hidden");

      role.querySelectorAll("input").forEach(function (input) {
        input.disabled = false;
      });
    });
  }, [JSON.stringify(values.roles)]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    disableBtn(true);

    const toastId = toast.loading("loading...");

    try {
      const res = await register(values);

      res.user.user_verified = res.user_verified;

      login(res.user, {
        token: res.token,
        token_expires_at: res.token_expires_at,
      });

      toast.update(toastId, {
        render: res.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeButton: true,
      });

      const roleNames = res.user.roles.map((r) => r.role_name);

      if (roleNames.includes("customer")) {
        navigate("/customers/dashboard", { replace: true });
      }

      if (roleNames.includes("provider")) {
        navigate("/providers/dashboard", { replace: true });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeButton: true,
      });

      if (error.errors) {
        setErrors({
          username: error.errors.username ?? "",
          email: error.errors.email ?? "",
          password: error.errors.password ?? "",
          roles: error.errors.roles ?? "",
          customer_name: error.errors.customer_name ?? "",
          customer_address: error.errors.customer_address ?? "",
          provider_name: error.errors.provider_name ?? "",
          provider_address: error.errors.provider_address ?? "",
        });
      }
    } finally {
      disableBtn(false);
    }
  };

  return (
    <>
      {isBtnDisabled && <Loader loading={true} />}

      <Card wd="w-full md:w-4/5 lg:w-3/5">
        <form onSubmit={handleSubmit} className="pb-5">
          <h2 className="text-xl text-gray-600 text-center mb-4">Register</h2>

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
                    name="username"
                    className={`${errors.username ? "border-error" : ""}`}
                    placeholder="username"
                    onChange={handleChange}
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
                <p className={`text-error ${errors.username ? "" : "hidden"} `}>
                  {errors.username}
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
                  <input
                    type="email"
                    name="email"
                    className={`${errors.email ? "border-error" : ""}`}
                    placeholder="mail@site.com"
                    required
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
                <p className={`text-error ${errors.email ? "" : "hidden"} `}>
                  {errors.email}
                </p>
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
                    name="password"
                    className={`${errors.password ? "border-error" : ""}`}
                    onChange={handleChange}
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
                <p className={`text-error ${errors.password ? "" : "hidden"} `}>
                  {errors.password}
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
                    name="password_confirmation"
                    onChange={handleChange}
                    required
                    placeholder="Confirm password"
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  />
                </label>
              </fieldset>
            </div>

            <hr className="col-span-2 text-gray-400 my-2" />

            <div className="col-span-2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-normal">
                  Roles:
                </legend>

                <div className="rounded-box w-fit bg-slate-200 p-3 flex items-center gap-x-3">
                  <label className="label text-sm">
                    <input
                      type="checkbox"
                      name="roles"
                      value="provider"
                      onChange={handleChange}
                      className="checkbox checkbox-sm"
                    />
                    Provider
                  </label>

                  <label className="label text-sm">
                    <input
                      type="checkbox"
                      name="roles"
                      value="customer"
                      onChange={handleChange}
                      className="checkbox checkbox-sm"
                    />
                    Customer
                  </label>
                </div>

                <p className={`text-error ${errors.roles ? "" : "hidden"} `}>
                  {errors.roles}
                </p>
              </fieldset>
            </div>

            <div className="col-span-2">
              <fieldset
                className="fieldset border-base-100 rounded-box w-full border px-4 pb-4 role_fields"
                id="provider_fields"
              >
                <legend className="fieldset-legend">Provider</legend>

                <div className="grid grid-cols-2 gap-1.5">
                  <fieldset className="fieldset col-span-2 sm:col-span-1">
                    <legend className="fieldset-legend text-sm font-normal">
                      Name:
                    </legend>

                    <label className="input validator w-full bg-slate-200">
                      <FaAddressBook className="text-gray-400" />
                      <input
                        type="text"
                        className={`${
                          errors.cprovider_name ? "border-error" : ""
                        }`}
                        onChange={handleChange}
                        placeholder="provider name"
                        name="provider_name"
                        required
                      />
                    </label>
                    <p
                      className={`text-error ${
                        errors.provider_name ? "" : "hidden"
                      } `}
                    >
                      {errors.provider_name}
                    </p>
                  </fieldset>

                  <fieldset className="fieldset col-span-2 sm:col-span-1">
                    <legend className="fieldset-legend text-sm font-normal">
                      Address:
                    </legend>

                    <label className="input validator w-full bg-slate-200">
                      <FaAddressCard className="text-gray-400" />
                      <input
                        type="text"
                        className={`${
                          errors.provider_address ? "border-error" : ""
                        }`}
                        onChange={handleChange}
                        placeholder="provider address"
                        required
                        name="provider_address"
                      />
                    </label>

                    <p
                      className={`text-error ${
                        errors.provider_address ? "" : "hidden"
                      } `}
                    >
                      {errors.provider_address}
                    </p>
                  </fieldset>
                </div>
              </fieldset>
            </div>

            <div className="col-span-2">
              <fieldset
                className="fieldset border-base-100 rounded-box w-full border px-4 pb-4 role_fields"
                id="customer_fields"
              >
                <legend className="fieldset-legend">Customer</legend>

                <div className="grid grid-cols-2 gap-1.5">
                  <fieldset className="fieldset col-span-2 sm:col-span-1">
                    <legend className="fieldset-legend text-sm font-normal">
                      Name:
                    </legend>

                    <label className="input validator w-full bg-slate-200">
                      <FaAddressBook className="text-gray-400" />
                      <input
                        type="text"
                        className={`${
                          errors.customer_name ? "border-error" : ""
                        }`}
                        onChange={handleChange}
                        placeholder="customer name"
                        name="customer_name"
                        required
                      />
                    </label>
                    <p
                      className={`text-error ${
                        errors.customer_name ? "" : "hidden"
                      } `}
                    >
                      {errors.customer_name}
                    </p>
                  </fieldset>

                  <fieldset className="fieldset col-span-2 sm:col-span-1">
                    <legend className="fieldset-legend text-sm font-normal">
                      Address:
                    </legend>

                    <label className="input validator w-full bg-slate-200">
                      <FaAddressCard className="text-gray-400" />
                      <input
                        type="text"
                        className={`${
                          errors.customer_address ? "border-error" : ""
                        }`}
                        onChange={handleChange}
                        placeholder="customer address"
                        required
                        name="customer_address"
                      />
                    </label>

                    <p
                      className={`text-error ${
                        errors.customer_address ? "" : "hidden"
                      } `}
                    >
                      {errors.customer_address}
                    </p>
                  </fieldset>
                </div>
              </fieldset>
            </div>
          </div>

          <button
            className={`btn bg-slate-600 hover:bg-slate-700 text-white w-full mb-2 mt-5 text-sm font-medium rounded-lg border-0 ${btn_classes}`}
          >
            {isBtnDisabled ? "Loading..." : "Register"}
          </button>

          <div className="text-center text-sm text-gray-700 mt-2">
            Already have an account?{" "}
            <Link to="/" className="text-blue-900 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </Card>
    </>
  );
}

export default RegisterPage;
