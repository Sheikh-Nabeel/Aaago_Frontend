
// export const API_BASE_URL = "http://aaogobackend.xyz:3001/api"; // for API calls
// export const SERVER_BASE_URL = "http://aaogobackend.xyz:3001/";
export const API_BASE_URL = "http://localhost:3001/api"; // for API calls
export const SERVER_BASE_URL = "http://localhost:3001/"; // for static files (images)

export const API_ENDPOINTS = {
  SIGNUP: "/user/signup",
  LOGIN: "/user/login",
  VERIFY_OTP: "/user/verify-otp",
  GET_CURRENT_USER: "/drivers/get-current-user",
  LOGOUT: "/user/logout",
  FORGOT_PASSWORD: "/user/forgot-password",
  RESET_PASSWORD: "/user/reset-password",
  REFERRAL_TREE: "/user/referral-tree",
  GET_USER_BY_ID: "/user/referral-tree",
  RESEND_OTP: "/user/resend-otp",
  REFERRAL_LINK: "/user/referral-link",
  GET_USER_BY_USERNAME: "/user/by-username",
  SEND_EMAIL_OTP: "/email-verification/send-otp"
};

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};
