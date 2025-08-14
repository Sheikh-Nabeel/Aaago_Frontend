import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/api";
import { cleanToken, validateToken } from "../utils/tokenUtils";
import sessionManager from "../utils/sessionManager";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionManager.getToken();
    if (token) {
      const cleanedToken = cleanToken(token);
      if (validateToken(cleanedToken)) {
        config.headers.Authorization = `Bearer ${cleanedToken}`;
      } else {
        console.warn("Invalid token format, proceeding with request");
        config.headers.Authorization = `Bearer ${cleanedToken}`;
      }
    }
    console.log("API Request - URL:", config.url, "Headers:", config.headers);
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
      response.status,
      response.config.url
    );
    return response;
  },
  (error) => {
    console.log(
      "API Response - Error:",
      error.response?.status,
      error.response?.data?.message,
      error.config?.url
    );
    if (error.response?.status === 401) {
      const isAuthEndpoint =
        error.config?.url?.includes("/login") ||
        error.config?.url?.includes("/signup") ||
        error.config?.url?.includes("/logout") ||
        error.config?.url?.includes("/verify-otp");
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
  signup: (userData) => api.post(API_ENDPOINTS.SIGNUP, userData),
  verifyOTP: (otpData) => api.post(API_ENDPOINTS.VERIFY_OTP, otpData),
  login: (credentials) => api.post(API_ENDPOINTS.LOGIN, credentials),
  getCurrentUser: () => api.get(API_ENDPOINTS.GET_CURRENT_USER),
  logout: () => api.post(API_ENDPOINTS.LOGOUT),
  getReferralTree: (userId) =>
    api.get(
      userId
        ? `${API_ENDPOINTS.REFERRAL_TREE}?userId=${userId}`
        : API_ENDPOINTS.REFERRAL_TREE
    ),
  getUserById: (userId) =>
    api.get(`${API_ENDPOINTS.GET_USER_BY_ID}?userId=${userId}`),
  resendOTP: (userId) => api.post(API_ENDPOINTS.RESEND_OTP, { userId }),
  getReferralLink: () => api.get(API_ENDPOINTS.REFERRAL_LINK),
};

export default api;
