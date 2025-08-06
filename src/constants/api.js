// API Base URL
export const API_BASE_URL = 'http://159.198.74.112:3001/api'; // Your local API server

// API Endpoints
export const API_ENDPOINTS = {
  SIGNUP: '/user/signup',
  VERIFY_OTP: '/user/verify-otp',
  LOGIN: '/user/login',
  GET_CURRENT_USER: '/drivers/get-current-user',
  LOGOUT: '/user/logout',
  REFERRAL_TREE: '/user/referral-tree',
  GET_USER_BY_ID: '/user/referral-tree',
  RESEND_OTP: '/user/resend-otp',
};

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
}; 