import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import logo from "./Images/logo.png";
import {
  loginUser,
  selectLoading,
  selectError,
  clearError,
} from "../../store/userSlice";
import { useTheme } from "../../ThemeContext";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { theme } = useTheme();

  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "", form: "" }));
  };

  const detectIdentifierType = (identifier) => {
    if (/\S+@\S+\.\S+/.test(identifier)) {
      return { email: identifier, phoneNumber: "", username: "" };
    }
    if (/^\+?\d{10,15}$/.test(identifier.replace(/\s/g, ""))) {
      return { email: "", phoneNumber: identifier, username: "" };
    }
    return { email: "", phoneNumber: "", username: identifier };
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email, phone number, or username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    // Handle server-side errors
    if (error) {
      setErrors({ form: typeof error === "string" ? error : error.message || "An error occurred" });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    dispatch(clearError());

    if (!validateForm()) {
      return;
    }

    const loginData = {
      ...detectIdentifierType(formData.identifier),
      password: formData.password,
    };

    try {
      const result = await dispatch(loginUser(loginData)).unwrap();
      console.log("Login successful:", result);
      navigate("/profile");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-gray-900"
          : "bg-gray-100"
      }`}
    >
      <div
        className={`shadow-lg rounded-2xl flex flex-col md:flex-row w-full max-w-6xl my-8 sm:my-12 overflow-hidden transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* LEFT FORM */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10">
          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-4 text-center ${
              theme === "dark" ? "text-yellow-400" : "text-[#013220]"
            }`}
          >
            Sign in to Your Account
          </h2>

          {errors.form && (
            <p
              className={`text-sm mb-4 text-center ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              }`}
            >
              {errors.form}
            </p>
          )}

          <div className="flex space-x-3 mb-5">
            {[FaFacebookF, FaGoogle, FaLinkedinIn].map((Icon, idx) => (
              <button
                key={idx}
                className={`border rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
                  theme === "dark"
                    ? "border-gray-500 hover:bg-gray-600"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
                disabled={loading}
              >
                <Icon
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                />
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            {/* Identifier */}
            <div>
              {errors.identifier && (
                <p
                  className={`text-sm mb-1 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {errors.identifier}
                </p>
              )}
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
                placeholder="Email, Phone, or Username"
                disabled={loading}
                className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none transition-colors duration-300 ${
                  theme === "dark"
                    ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                        errors.identifier ? "!border-red-500" : ""
                      }`
                    : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                        errors.identifier ? "!border-red-600" : ""
                      }`
                }`}
              />
            </div>

            {/* Password */}
            <div>
              {errors.password && (
                <p
                  className={`text-sm mb-1 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {errors.password}
                </p>
              )}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  disabled={loading}
                  className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none pr-10 transition-colors duration-300 ${
                    theme === "dark"
                      ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                          errors.password ? "!border-red-500" : ""
                        }`
                      : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                          errors.password ? "!border-red-600" : ""
                        }`
                  }`}
                />
                <div
                  className={`absolute right-3 top-3 cursor-pointer ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div
              className={`flex justify-between items-center text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className={`w-4 h-4 ${
                    theme === "dark" ? "text-yellow-400" : "text-[#013220]"
                  }`}
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className={`hover:underline ${
                  theme === "dark" ? "text-teal-400" : "text-teal-600"
                }`}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 font-semibold rounded-full transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                theme === "dark"
                  ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                  : "bg-yellow-500 text-[#013220] hover:bg-yellow-400"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - LOGO + TEXT */}
        <div
          className={`w-full md:w-1/2 flex flex-col justify-center items-center p-8 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gradient-to-b from-gray-900 to-gray-700 text-yellow-400"
              : "bg-gradient-to-b from-green-900 to-green-700 text-yellow-400"
          }`}
        >
          <div className="flex flex-col items-center mb-6">
            {/* Logo */}
            <img
              src={logo}
              alt="Aao Go Logo"
              className="w-20 h-20 object-contain mb-2"
            />

            {/* Welcome Text */}
            <h2 className="text-xl font-semibold text-yellow-400">
              Welcome to Aao Go
            </h2>
          </div>

          <p className="mt-2 text-sm sm:text-base text-center text-yellow-400">
            Sign in and continue your journey with us.
          </p>
          <p className="text-center max-w-xs mb-6 z-10 text-sm text-yellow-400">
            Don’t have an account? Sign up now!
          </p>
          <Link
            to="/signup"
            className={`border px-6 py-2 rounded-full transition text-sm ${
              theme === "dark"
                ? "border-yellow-400 hover:bg-yellow-400 hover:text-gray-900"
                : "border-yellow-400 hover:bg-yellow-400 hover:text-green-900"
            }`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;