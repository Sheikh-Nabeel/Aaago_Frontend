import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  resetPassword,
  selectLoading,
  selectError,
  clearError,
  setLoading,
} from "../../store/userSlice";
import { showValidationError, showError } from "../../utils/toast";
import { useTheme } from "../../ThemeContext";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { theme } = useTheme();

  // Get userId and email from location.state or localStorage (for use in form submission)
  const { userId: stateUserId, email: stateEmail } = location.state || {};
  const userId = stateUserId || localStorage.getItem("signupUserId");
  const email = stateEmail || localStorage.getItem("signupEmail");

  // Log for debugging
  console.log("ResetPassword - location.state:", { stateUserId, stateEmail });
  console.log("ResetPassword - localStorage:", { userId, email });

  // Store userId and email in localStorage if they exist in location.state
  if (stateUserId && stateEmail) {
    localStorage.setItem("signupUserId", stateUserId);
    localStorage.setItem("signupEmail", stateEmail);
  }

  const [formData, setFormData] = useState({
    resetOtp: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.resetOtp.trim()) {
      errors.resetOtp = "OTP is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearError());

    if (!validateForm()) {
      showValidationError(validationErrors);
      dispatch(setLoading(false));
      return;
    }

    // Check if userId is available before submitting
    if (!userId) {
      showError("Cannot reset password: User ID is missing.", {
        toastId: "reset-password-error",
      });
      dispatch(setLoading(false));
      return;
    }

    try {
      console.log(
        "ResetPassword - Starting password reset for userId:",
        userId
      );
      const resetData = {
        userId,
        resetOtp: formData.resetOtp,
        password: formData.password,
      };
      const result = await dispatch(resetPassword(resetData)).unwrap();
      console.log("ResetPassword - Password reset successful, result:", result);
      localStorage.removeItem("signupUserId");
      localStorage.removeItem("signupEmail");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("ResetPassword failed:", err);
      dispatch(setLoading(false));
      showError(err.message || "Failed to reset password.", {
        toastId: "reset-password-error",
      });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-gray-900"
          : "bg-gradient-to-b from-green-200 to-green-300"
      }`}
    >
      <div
        className={`rounded-2xl shadow-md w-[90%] max-w-md p-6 md:p-8 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-700 text-white"
            : "bg-[#E4E4E4] text-gray-900"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>

        {error && (
          <div
            className={`bg-red-500 bg-opacity-20 p-3 rounded-lg mb-4 text-center ${
              theme === "dark" ? "text-red-300" : "text-red-500"
            }`}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className={`block text-sm font-semibold mb-1 ${
                theme === "dark" ? "text-gray-200" : "text-[#0A4624]"
              }`}
            >
              OTP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="resetOtp"
              value={formData.resetOtp}
              onChange={handleInputChange}
              className={`w-full border rounded px-4 py-1 outline-none transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Enter the OTP sent to your email"
              disabled={loading}
            />
            {validationErrors.resetOtp && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.resetOtp}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              className={`block text-sm font-semibold mb-1 ${
                theme === "dark" ? "text-gray-200" : "text-[#0A4624]"
              }`}
            >
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full border rounded px-4 py-1 outline-none pr-10 transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Enter your new password"
              disabled={loading}
            />
            <div
              className={`absolute right-3 top-9 cursor-pointer ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.password}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              className={`block text-sm font-semibold mb-1 ${
                theme === "dark" ? "text-gray-200" : "text-[#0A4624]"
              }`}
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full border rounded px-4 py-1 outline-none pr-10 transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Confirm your new password"
              disabled={loading}
            />
            <div
              className={`absolute right-3 top-9 cursor-pointer ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {validationErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-2 rounded text-white font-medium transition-all duration-300 shadow-sm hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
