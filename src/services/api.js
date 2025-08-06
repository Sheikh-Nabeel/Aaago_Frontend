import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { cleanToken, validateToken } from '../utils/tokenUtils';
import sessionManager from '../utils/sessionManager';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from session manager
    const token = sessionManager.getToken();
    
    console.log('API Request - Token found:', !!token);
    console.log('API Request - Token length:', token?.length || 0);
    console.log('API Request - URL:', config.url);
    
    // Clean and validate token
    if (token) {
      const cleanedToken = cleanToken(token);
      const isValid = validateToken(cleanedToken);
      console.log('API Request - Token is valid:', isValid);
      
      if (isValid) {
        // Send token in Bearer format as server expects
        config.headers.Authorization = `Bearer ${cleanedToken}`;
        
        console.log('API Request - Authorization header set');
        console.log('API Request - Full headers:', config.headers);
        
        // Special debugging for referral tree endpoint
        if (config.url === API_ENDPOINTS.REFERRAL_TREE) {
          console.log('=== REFERRAL TREE API CALL ===');
          console.log('URL:', config.url);
          console.log('Method:', config.method);
          console.log('Authorization Header:', config.headers.Authorization);
          console.log('Token being sent:', cleanedToken);
          console.log('Full request config:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            baseURL: config.baseURL
          });
          console.log('==============================');
        }
      } else {
        console.warn('API Request - Invalid token format, but proceeding with request');
        // Still try to send the request, let the server decide
        config.headers.Authorization = `Bearer ${cleanedToken}`;
      }
    } else {
      console.log('API Request - No token found, request will be sent without Authorization header');
    }
    
    return config;
  },
  (error) => {
    console.error('API Request - Interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response - Success:', response.status, response.config.url);
    
    // Special debugging for referral tree response
    if (response.config.url === API_ENDPOINTS.REFERRAL_TREE) {
      console.log('=== REFERRAL TREE RESPONSE ===');
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      console.log('Response headers:', response.headers);
      console.log('=============================');
    }
    
    return response;
  },
  (error) => {
    console.log('API Response - Error:', error.response?.status, error.response?.data?.message, error.config?.url);
    
    // Special debugging for referral tree errors
    if (error.config?.url === API_ENDPOINTS.REFERRAL_TREE) {
      console.log('=== REFERRAL TREE ERROR ===');
      console.log('Status:', error.response?.status);
      console.log('Error message:', error.response?.data?.message);
      console.log('Full error:', error.response?.data);
      console.log('Request headers sent:', error.config?.headers);
      console.log('Response headers:', error.response?.headers);
      console.log('==========================');
    }
    
    // Handle 401 errors - clear session only for non-auth endpoints
    if (error.response?.status === 401) {
      const isAuthEndpoint = error.config?.url?.includes('/login') || 
                           error.config?.url?.includes('/signup') || 
                           error.config?.url?.includes('/logout') ||
                           error.config?.url?.includes('/verify-otp');
      
      if (!isAuthEndpoint) {
        console.log('API Response - 401 Unauthorized on non-auth endpoint - Clearing session');
        console.log('API Response - Error details:', {
          status: error.response?.status,
          message: error.response?.data?.message,
          endpoint: error.config?.url,
          headersSent: error.config?.headers
        });
        
        sessionManager.clearSession();
        
        // Dispatch a custom event to notify Redux that session was cleared
        // This will be handled by the App component
        window.dispatchEvent(new CustomEvent('sessionCleared', {
          detail: { reason: '401_unauthorized', endpoint: error.config?.url }
        }));
      } else {
        console.log('API Response - 401 Unauthorized on auth endpoint - Not clearing session (expected)');
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  signup: (userData) => api.post(API_ENDPOINTS.SIGNUP, userData),
  verifyOTP: (otpData) => api.post(API_ENDPOINTS.VERIFY_OTP, otpData),
  login: (credentials) => api.post(API_ENDPOINTS.LOGIN, credentials),
  getCurrentUser: () => api.get(API_ENDPOINTS.GET_CURRENT_USER),
  logout: () => api.post(API_ENDPOINTS.LOGOUT),
  getReferralTree: () => {
    console.log('Calling getReferralTree API...');
    console.log('Current session token:', sessionManager.getToken());
    return api.get(API_ENDPOINTS.REFERRAL_TREE);
  },
  getUserById: (userId) => {
    console.log('Calling getUserById API...', userId);
    console.log('Current session token:', sessionManager.getToken());
    return api.get(`${API_ENDPOINTS.GET_USER_BY_ID}?userId=${userId}`);
  },
  resendOTP: (userId) => {
    console.log('Calling resendOTP API...', userId);
    return api.post(API_ENDPOINTS.RESEND_OTP, { userId });
  },
};

export default api; 