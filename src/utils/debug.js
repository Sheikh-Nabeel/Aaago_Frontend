import Cookies from 'js-cookie';
import { cleanToken, validateToken } from './tokenUtils';
import sessionManager from './sessionManager';

export const debugTokenStatus = () => {
  const cookieToken = Cookies.get('auth_token');
  const localToken = localStorage.getItem('auth_token');
  const sessionToken = sessionManager.getToken();
  
  console.log('=== TOKEN DEBUG INFO ===');
  console.log('Cookie token:', cookieToken ? 'exists' : 'none');
  console.log('LocalStorage token:', localToken ? 'exists' : 'none');
  console.log('SessionManager token:', sessionToken ? 'exists' : 'none');
  
  if (sessionToken) {
    const cleaned = cleanToken(sessionToken);
    const isValid = validateToken(cleaned);
    console.log('Token length:', sessionToken.length);
    console.log('Token starts with:', sessionToken.substring(0, 20) + '...');
    console.log('Cleaned token:', cleaned);
    console.log('Token is valid:', isValid);
    
    // Try to decode JWT parts
    try {
      const parts = cleaned.split('.');
      console.log('JWT parts:', parts.length);
      if (parts.length === 3) {
        const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        console.log('JWT Header:', header);
        console.log('JWT Payload:', payload);
        console.log('Token expires at:', new Date(payload.exp * 1000));
        console.log('Token issued at:', new Date(payload.iat * 1000));
        console.log('Token is expired:', Date.now() > payload.exp * 1000);
      }
    } catch (error) {
      console.log('Error decoding JWT:', error.message);
    }
  }
  console.log('========================');
};

export const testLogoutRequest = () => {
  const token = sessionManager.getToken();
  console.log('=== LOGOUT REQUEST TEST ===');
  console.log('Token to send:', token);
  console.log('Authorization header:', `Bearer ${token}`);
  console.log('===========================');
};

export const testCurrentUserEndpoint = async () => {
  const token = sessionManager.getToken();
  console.log('=== CURRENT USER ENDPOINT TEST ===');
  
  try {
    const response = await fetch('http://159.198.74.112:3001/api/drivers/get-current-user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('Response data:', data);
    
    return { status: response.status, data };
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error.message };
  }
};

export const testReferralTreeEndpoint = async () => {
  const token = sessionManager.getToken();
  console.log('=== REFERRAL TREE ENDPOINT TEST ===');
  
  try {
    const cleanedToken = cleanToken(token);
    const response = await fetch('http://159.198.74.112:3001/api/user/referral-tree', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cleanedToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('Response data:', data);
    
    return { status: response.status, data };
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error.message };
  }
};

export const manualLogout = () => {
  console.log('=== MANUAL LOGOUT ===');
  sessionManager.clearSession();
  console.log('Session cleared');
  window.location.reload();
};

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  window.debugTokenStatus = debugTokenStatus;
  window.testLogoutRequest = testLogoutRequest;
  window.testCurrentUserEndpoint = testCurrentUserEndpoint;
  window.testReferralTreeEndpoint = testReferralTreeEndpoint;
  window.manualLogout = manualLogout;
} 