// src/components/Signup.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "./Images/logo.png";
import {
  signupUser,
  selectLoading,
  selectError,
  clearError,
} from "../../store/userSlice";
import { useTheme } from "../../ThemeContext";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants/api";
import sessionManager from "../../utils/sessionManager"; // Assuming sessionManager is imported here

const countryCodes = [
  { code: "+1", label: "US (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+92", label: "Pakistan (+92)" },
  { code: "+91", label: "India (+91)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+86", label: "China (+86)" },
];

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+92",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    sponsorBy: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sponsorFullName, setSponsorFullName] = useState("");
  const [sponsorError, setSponsorError] = useState("");

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setFormData((prev) => ({ ...prev, sponsorBy: ref }));
    }
  }, [searchParams]);

  // Debounced fetch for sponsor name
  useEffect(() => {
    const fetchSponsorName = async () => {
      if (formData.sponsorBy.trim()) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}${API_ENDPOINTS.GET_USER_BY_USERNAME}?username=${formData.sponsorBy}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const user = response.data.user;
          if (user && user.firstName && user.lastName) {
            setSponsorFullName(`${user.firstName} ${user.lastName}`);
            setSponsorError("");
          } else {
            setSponsorFullName("");
            setSponsorError("Sponsor not found");
          }
        } catch (error) {
          console.error("Error fetching sponsor name:", error);
          setSponsorFullName("");
          setSponsorError(
            error.response?.status === 404
              ? "Invalid sponsor username"
              : "Error fetching sponsor details"
          );
        }
      } else {
        setSponsorFullName("");
        setSponsorError("");
      }
    };

    const timeoutId = setTimeout(fetchSponsorName, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.sponsorBy]);

  useEffect(() => {
    // Handle server-side errors
    if (error) {
      const newErrors = {};
      if (typeof error === "string") {
        newErrors.form = error;
      } else if (error.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          newErrors[field] = message;
        });
      } else if (error.message) {
        newErrors.form = error.message;
      }
      setErrors(newErrors);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "", form: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]{3,30}$/.test(formData.username)) {
      newErrors.username =
        "Username must be 3-30 characters and contain only letters, numbers, or underscores";
      isValid = false;
    }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter and one number";
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(clearError());

    if (!validateForm()) {
      return;
    }

    try {
      const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;
      const submissionData = {
        ...formData,
        phoneNumber: fullPhoneNumber,
      };

      const result = await dispatch(signupUser(submissionData)).unwrap();
      console.log("Signup successful:", result);
      // Explicitly store email in localStorage as a fallback
      sessionManager.setSignupEmail(formData.email);
      console.log("Signup - Email stored:", formData.email);
      navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      console.error("Signup failed:", err);
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
            Create Your Account
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
            {/* Username */}
            <div>
              {errors.username && (
                <p
                  className={`text-sm mb-1 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {errors.username}
                </p>
              )}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username *"
                disabled={loading}
                className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none transition-colors duration-300 ${
                  theme === "dark"
                    ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                        errors.username ? "border-red-500" : ""
                      }`
                    : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                        errors.username ? "border-red-600" : ""
                      }`
                }`}
              />
            </div>

            {/* Name */}
            <div className="flex gap-3">
              <div className="w-1/2">
                {errors.firstName && (
                  <p
                    className={`text-sm mb-1 ${
                      theme === "dark" ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {errors.firstName}
                  </p>
                )}
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name *"
                  disabled={loading}
                  className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none transition-colors duration-300 ${
                    theme === "dark"
                      ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                          errors.firstName ? "border-red-500" : ""
                        }`
                      : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                          errors.firstName ? "border-red-600" : ""
                        }`
                  }`}
                />
              </div>
              <div className="w-1/2">
                {errors.lastName && (
                  <p
                    className={`text-sm mb-1 ${
                      theme === "dark" ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {errors.lastName}
                  </p>
                )}
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  disabled={loading}
                  className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none transition-colors duration-300 ${
                    theme === "dark"
                      ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                          errors.lastName ? "border-red-500" : ""
                        }`
                      : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                          errors.lastName ? "border-red-600" : ""
                        }`
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              {errors.email && (
                <p
                  className={`text-sm mb-1 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {errors.email}
                </p>
              )}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email *"
                disabled={loading}
                className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none transition-colors duration-300 ${
                  theme === "dark"
                    ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                        errors.email ? "border-red-500" : ""
                      }`
                    : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                        errors.email ? "border-red-600" : ""
                      }`
                }`}
              />
            </div>

            {/* Phone with country code */}
            <div className="flex gap-2">
              <div className="w-1/3">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={`w-full rounded-lg px-2 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none text-sm sm:text-base transition-colors duration-300 ${
                    theme === "dark"
                      ? `bg-gray-600 border-gray-500 text-white ${
                          errors.phoneNumber ? "border-red-500" : ""
                        }`
                      : `bg-white border-gray-300 text-gray-900 ${
                          errors.phoneNumber ? "border-red-600" : ""
                        }`
                  }`}
                >
                  <option value="" disabled>
                    Select Code *
                  </option>
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-2/3">
                {errors.phoneNumber && (
                  <p
                    className={`text-sm mb-1 ${
                      theme === "dark" ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {errors.phoneNumber}
                  </p>
                )}
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number *"
                  disabled={loading}
                  className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none transition-colors duration-300 ${
                    theme === "dark"
                      ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                          errors.phoneNumber ? "border-red-500" : ""
                        }`
                      : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                          errors.phoneNumber ? "border-red-600" : ""
                        }`
                  }`}
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              {errors.gender && (
                <p
                  className={`text-sm mb-1 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {errors.gender}
                </p>
              )}
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={loading}
                className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none transition-colors duration-300 ${
                  theme === "dark"
                    ? `bg-gray-600 border-gray-500 text-white ${
                        errors.gender ? "border-red-500" : ""
                      }`
                    : `bg-white border-gray-300 text-gray-900 ${
                        errors.gender ? "border-red-600" : ""
                      }`
                }`}
              >
                <option value="">Select Gender *</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Sponsor */}
            <div>
              {sponsorError && (
                <p
                  className={`text-sm mb-1 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {sponsorError}
                </p>
              )}
              <input
                type="text"
                name="sponsorBy"
                value={formData.sponsorBy}
                onChange={handleInputChange}
                placeholder="Sponsor Code (Optional)"
                disabled={loading}
                className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none transition-colors duration-300 ${
                  theme === "dark"
                    ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                        sponsorError ? "border-red-500" : ""
                      }`
                    : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                        sponsorError ? "border-red-600" : ""
                      }`
                }`}
              />
              {sponsorFullName && (
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Sponsor: {sponsorFullName}
                </p>
              )}
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
                  placeholder="Password *"
                  disabled={loading}
                  className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none pr-10 transition-colors duration-300 ${
                    theme === "dark"
                      ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                          errors.password ? "border-red-500" : ""
                        }`
                      : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                          errors.password ? "border-red-600" : ""
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

            {/* Confirm Password */}
            <div>
              {errors.confirmPassword && (
                <p
                  className={`text-sm mb-1 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {errors.confirmPassword}
                </p>
              )}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password *"
                  disabled={loading}
                  className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none pr-10 transition-colors duration-300 ${
                    theme === "dark"
                      ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`
                      : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                          errors.confirmPassword ? "border-red-600" : ""
                        }`
                  }`}
                />
                <div
                  className={`absolute right-3 top-3 cursor-pointer ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
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
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - LOGO + TEXT */}
        <div
          className={`w-full md:w-1/2 flex flex-col justify-center items-center p-8 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gradient-to-b from-gray-900 to-gray-700"
              : "bg-gradient-to-b from-green-900 to-green-700"
          } text-yellow-400`}
        >
          <img
            src={logo}
            alt="AAO GO Logo"
            className="w-28 sm:w-36 md:w-44 mb-4"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            Welcome to AAO GO
          </h2>
          <p className="mt-2 text-sm sm:text-base text-center text-yellow-200">
            Sign up and start your journey with us.
          </p>
          <p className="text-center max-w-xs mb-6 z-10 text-sm text-yellow-400">
            Already have an account? Sign in to continue!
          </p>
          <Link
            to="/login"
            className={`border px-6 py-2 rounded-full transition text-sm ${
              theme === "dark"
                ? "border-yellow-400 hover:bg-yellow-400 hover:text-gray-900"
                : "border-yellow-400 hover:bg-yellow-400 hover:text-green-900"
            }`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
