
// HTTPS version commented out as server doesn't support HTTPS yet
// export const API_BASE_URL = "https://aaogobackend.xyz/api";
// export const SERVER_BASE_URL = "https://aaogobackend.xyz/";

// Using HTTP version as it's currently supported
export const API_BASE_URL = "https://aaogobackend.xyz/api"; // for API calls
export const SERVER_BASE_URL = "https://aaogobackend.xyz/"; // for static files (images)

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
  SEND_EMAIL_OTP: "/email-verification/send-otp",
  MLM_USER_DASHBOARD: "/mlm/user-dashboard",
  DDR_LEADERBOARD: "/mlm/ddr/leaderboard",
  CRR_RANK_TRACKING: "/mlm/crr/rank-tracking",
  CRR_LEADERBOARD: "/mlm/crr/leaderboard",
  BBR_PAST_WINS: "/mlm/bbr/past-wins",
  HLR_PROGRESS: "/mlm/hlr/progress",
  HLR_LEADERBOARD: "/mlm/hlr/leaderboard",

  // Regional Ambassador endpoints
  REGIONAL_PROGRESS: "/mlm/regional/progress",
  REGIONAL_LEADERBOARD: "/mlm/regional/leaderboard",
  REGIONAL_GLOBAL_AMBASSADORS: "/mlm/regional/global-ambassadors",
  REGIONAL_COUNTRY_UPDATE: "/mlm/regional/country-update-request"
};

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};
