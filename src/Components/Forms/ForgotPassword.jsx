import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  selectLoading,
  selectError,
  clearError,
} from "../../store/userSlice";
import { showValidationError, showError } from "../../utils/toast";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    email: "",
  });

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

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    if (!validateForm()) {
      showValidationError(validationErrors);
      return;
    }
    try {
      console.log(
        "ForgotPassword - Starting password reset for email:",
        formData.email
      );
      const result = await dispatch(
        forgotPassword({ email: formData.email })
      ).unwrap();
      console.log("ForgotPassword - OTP sent, result:", result);
      if (!result.userId) {
        console.error(
          "ForgotPassword - No userId in response, received:",
          result
        );
        showError("Failed to initiate password reset. Please try again.");
        return;
      }
      console.log("ForgotPassword - Navigating to reset-password with state:", {
        userId: result.userId,
        email: formData.email,
        token: result.token,
      });
      navigate("/reset-password", {
        state: { userId: result.userId, email: formData.email },
      });
    } catch (err) {
      console.error("ForgotPassword failed:", err);
      showError(err || "Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center rounded-xl bg-gradient-to-b from-green-200 to-green-300 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-[#E4E4E4] dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-700 w-[90%] max-w-md p-6 md:p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Forgot Password
        </h2>

        {error && (
          <div className="bg-red-500 bg-opacity-20 text-red-500 dark:text-red-400 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#0A4624] dark:text-gray-200 mb-1">
              Email <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-1 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-400"
              placeholder="Enter your email"
            />
            {validationErrors.email && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
