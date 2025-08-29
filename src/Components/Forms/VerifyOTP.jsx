import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import {
  verifyOTP,
  resendOTP,
  selectLoading,
  selectError,
  clearError,
  selectSignupEmail,
  clearSignupEmail,
} from "../../store/userSlice";
import { showValidationError, showSuccess } from "../../utils/toast";
import { useTheme } from "../../ThemeContext";
import sessionManager from "../../utils/sessionManager";

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const signupEmail = useSelector(selectSignupEmail);
  const { theme } = useTheme();

  const [otp, setOtp] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const emailFromStorage = sessionManager.getSignupEmail();
    const emailFromUrl = searchParams.get("email");
    const email = emailFromStorage || signupEmail || emailFromUrl;

    if (!email) {
      showValidationError("No email found. Please sign up again.");
      setTimeout(() => navigate("/signup"), 2000);
      return;
    }

    if (email && !emailFromStorage) {
      sessionManager.setSignupEmail(email);
    }

    setCanResend(false);

    const viewport = document.querySelector("meta[name=viewport]");
    const originalViewport = viewport ? viewport.getAttribute("content") : null;
    if (viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
    }

    return () => {
      if (viewport && originalViewport) {
        viewport.setAttribute("content", originalViewport);
      }
    };
  }, [navigate, signupEmail, searchParams]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    if (validationErrors.otp) {
      setValidationErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!otp.trim()) {
      errors.otp = "OTP is required";
    } else if (otp.length !== 6) {
      errors.otp = "OTP must be 6 digits";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (!validateForm()) {
      showValidationError(validationErrors.otp);
      return;
    }

    try {
      const email = sessionManager.getSignupEmail() || signupEmail || searchParams.get("email");
      if (!email) {
        showValidationError("No email found. Please sign up again.");
        setTimeout(() => navigate("/signup"), 2000);
        return;
      }

      const otpData = { email: email.trim().toLowerCase(), otp };
      const result = await dispatch(verifyOTP(otpData)).unwrap();

      sessionManager.createSession(result.token, result.user);
      sessionManager.removeSignupEmail();
      dispatch(clearSignupEmail());
      showSuccess("Registration completed successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("OTP verification failed:", error);
      showValidationError(error.message || "OTP verification failed");
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || resendTimer > 0) return;

    try {
      setResendLoading(true);
      setCanResend(false);

      const email = sessionManager.getSignupEmail() || signupEmail || searchParams.get("email");
      if (!email) {
        showValidationError("No email found. Please sign up again.");
        setTimeout(() => navigate("/signup"), 2000);
        return;
      }

      await dispatch(resendOTP({ email: email.trim().toLowerCase() })).unwrap();
      showSuccess("OTP resent successfully!");
      setResendTimer(60);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      showValidationError(error.message || "Failed to resend OTP");
      setCanResend(true);
    } finally {
      setResendLoading(false);
    }
  };

  const handleBackToSignup = () => {
    sessionManager.removeSignupEmail();
    dispatch(clearSignupEmail());
    setResendTimer(0);
    setCanResend(true);
    navigate("/signup");
  };

  const emailToShow = sessionManager.getSignupEmail() || signupEmail || searchParams.get("email");

  if (!emailToShow) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gray-900"
            : "bg-gradient-to-b from-green-200 to-green-300"
        } transition-colors duration-300 relative z-10`}
      >
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-600"
          } rounded-2xl shadow-lg p-6 text-center`}
        >
          <p>Redirecting to signup...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-6 ${
        theme === "dark"
          ? "bg-gray-900"
          : "bg-gradient-to-b from-green-200 to-green-300"
      } relative z-10 transition-colors duration-300`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-2xl shadow-lg w-full max-w-sm mx-auto p-6 sm:p-8 relative z-20 transform transition-all duration-300`}
      >
        <div className="text-center mb-6">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 ${
              theme === "dark" ? "bg-blue-900" : "bg-blue-100"
            }`}
          >
            <FaEnvelope
              className={
                theme === "dark"
                  ? "text-blue-400 text-xl sm:text-2xl"
                  : "text-blue-600 text-xl sm:text-2xl"
              }
            />
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-2 ${
              theme === "dark" ? "text-yellow-400" : "text-gray-800"
            }`}
          >
            Verify OTP
          </h2>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            } mb-1`}
          >
            We've sent a verification code to
          </p>
          <p
            className={`font-semibold text-sm break-all px-2 ${
              theme === "dark" ? "text-yellow-500" : "text-blue-600"
            }`}
          >
            {emailToShow}
          </p>
        </div>

        {error && (
          <p
            className={`text-sm mb-3 text-center ${
              theme === "dark" ? "text-red-400" : "text-red-500"
            }`}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleBackToSignup}
          className={`flex items-center gap-2 text-sm mb-4 p-2 -ml-2 rounded-lg transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            theme === "dark"
              ? "text-yellow-500 hover:text-yellow-400 hover:bg-gray-700"
              : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          }`}
        >
          <FaArrowLeft />
          Back to Signup
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-[#0A4624]"
              }`}
            >
              Enter OTP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className={`w-full border rounded-lg px-4 py-4 text-center text-xl sm:text-2xl font-mono tracking-widest outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 touch-manipulation ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="000000"
              maxLength="6"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              autoFocus
            />
            {validationErrors.otp && (
              <p
                className={`text-xs mt-1 ${
                  theme === "dark" ? "text-red-400" : "text-red-500"
                }`}
              >
                {validationErrors.otp}
              </p>
            )}
            <p
              className={`text-xs mt-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg font-semibold text-base sm:text-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors ${
              theme === "dark"
                ? "bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center pt-2">
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Didn't receive the code?
            </p>
            {resendTimer > 0 ? (
              <div
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Resend available in{" "}
                <span
                  className={
                    theme === "dark"
                      ? "text-yellow-500 font-semibold"
                      : "text-blue-600 font-semibold"
                  }
                >
                  {resendTimer}s
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendLoading || !canResend}
                className={`text-sm font-semibold mt-1 p-2 rounded-lg transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  theme === "dark"
                    ? "text-yellow-500 hover:text-yellow-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>
        </form>

        <div
          className={`text-center mt-6 pt-4 border-t ${
            theme === "dark" ? "border-gray-600" : "border-gray-200"
          }`}
        >
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className={`font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
                theme === "dark"
                  ? "text-yellow-500 hover:text-yellow-400"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;