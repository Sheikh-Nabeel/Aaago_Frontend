import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS, API_CONFIG } from "../constants/api";
import { cleanToken, validateToken } from "../utils/tokenUtils";
import sessionManager from "../utils/sessionManager";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: API_CONFIG.TIMEOUT,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionManager.getToken();
    console.log(
      "API Request - URL:",
      config.url,
      "Method:",
      config.method,
      "Data:",
      JSON.stringify(config.data, null, 2),
      "Headers:",
      config.headers
    );
    if (token) {
      const cleanedToken = cleanToken(token);
      if (validateToken(cleanedToken)) {
        config.headers.Authorization = `Bearer ${cleanedToken}`;
      } else {
        console.warn("Invalid token format, proceeding with request");
        config.headers.Authorization = `Bearer ${cleanedToken}`;
      }
    }
    return config;
  },
  (error) => {
    console.error("API Request - Interceptor error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(
      "API Response - Success:",
      "Status:",
      response.status,
      "URL:",
      response.config.url,
      "Data:",
      JSON.stringify(response.data, null, 2),
      "Headers:",
      response.headers
    );
    return response;
  },
  (error) => {
    console.error(
      "API Response - Error:",
      "Status:",
      error.response?.status,
      "Message:",
      error.response?.data?.message,
      "URL:",
      error.config?.url,
      "Error Data:",
      JSON.stringify(error.response?.data, null, 2),
      "Headers:",
      error.response?.headers
    );
    if (error.code === "ECONNABORTED") {
      console.log("API Request - Timeout error");
      return Promise.reject({
        message: "Request timed out. Please try again.",
      });
    }
    if (error.response?.status === 401) {
      const isAuthEndpoint =
        error.config?.url?.includes("/login") ||
        error.config?.url?.includes("/signup") ||
        error.config?.url?.includes("/logout") ||
        error.config?.url?.includes("/verify-otp") ||
        error.config?.url?.includes("/forgot-password") ||
        error.config?.url?.includes("/reset-password");
      if (!isAuthEndpoint) {
        console.log("API Response - 401 Unauthorized, clearing session");
        sessionManager.clearSession();
        window.dispatchEvent(
          new CustomEvent("sessionCleared", {
            detail: { reason: "401_unauthorized", endpoint: error.config?.url },
          })
        );
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (userData) => {
    console.log("authAPI.signup - Sending request with data:", JSON.stringify(userData, null, 2));
    return api.post(API_ENDPOINTS.SIGNUP, userData);
  },
  verifyOTP: (otpData) => {
    console.log("authAPI.verifyOTP - Sending request with data:", JSON.stringify(otpData, null, 2));
    return api.post(API_ENDPOINTS.VERIFY_OTP, otpData).then((response) => {
      console.log("authAPI.verifyOTP - Response received:", JSON.stringify(response.data, null, 2));
      return response;
    });
  },
  login: (credentials) => {
    console.log("authAPI.login - Sending request with data:", JSON.stringify(credentials, null, 2));
    return api.post(API_ENDPOINTS.LOGIN, credentials);
  },
  getCurrentUser: () => {
    console.log("authAPI.getCurrentUser - Sending request");
    return api.get(API_ENDPOINTS.GET_CURRENT_USER);
  },
  logout: () => {
    console.log("authAPI.logout - Sending request");
    return api.post(API_ENDPOINTS.LOGOUT);
  },
  forgotPassword: (emailData) => {
    console.log("authAPI.forgotPassword - Sending request with data:", JSON.stringify(emailData, null, 2));
    return api.post(API_ENDPOINTS.FORGOT_PASSWORD, emailData);
  },
  resetPassword: (resetData) => {
    console.log("authAPI.resetPassword - Sending request with data:", JSON.stringify(resetData, null, 2));
    return api.post(API_ENDPOINTS.RESET_PASSWORD, resetData);
  },
  getReferralTree: (userId) => {
    console.log("authAPI.getReferralTree - Sending request with userId:", userId);
    return api.get(
      userId
        ? `${API_ENDPOINTS.REFERRAL_TREE}?userId=${userId}`
        : API_ENDPOINTS.REFERRAL_TREE
    );
  },
  getUserById: (userId) => {
    console.log("authAPI.getUserById - Sending request with userId:", userId);
    return api.get(`${API_ENDPOINTS.GET_USER_BY_ID}?userId=${userId}`);
  },
  resendOTP: (emailData) => {
    console.log("authAPI.resendOTP - Sending request with data:", JSON.stringify(emailData, null, 2));
    return api.post(API_ENDPOINTS.RESEND_OTP, emailData);
  },
  getReferralLink: () => {
    console.log("authAPI.getReferralLink - Sending request");
    return api.get(API_ENDPOINTS.REFERRAL_LINK);
  },
  getUserByUsername: (username) => {
    console.log("authAPI.getUserByUsername - Sending request with username:", username);
    return api.get(`${API_ENDPOINTS.GET_USER_BY_USERNAME}?username=${username}`);
  },
};

export default api;