import Cookies from 'js-cookie';

// Session storage keys
const SESSION_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
  SIGNUP_EMAIL: 'signup_email',
  SESSION_ID: 'session_id',
};

// Cookie options
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
};

class SessionManager {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeSession();
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Initialize session
  initializeSession() {
    const existingSessionId = this.getSessionId();
    if (!existingSessionId) {
      this.setSessionId(this.sessionId);
    } else {
      this.sessionId = existingSessionId;
    }
  }

  // Session ID management
  getSessionId() {
    return localStorage.getItem(SESSION_KEYS.SESSION_ID);
  }

  setSessionId(sessionId) {
    localStorage.setItem(SESSION_KEYS.SESSION_ID, sessionId);
  }

  // Token management
  getToken() {
    // Try cookies first, then localStorage
    const cookieToken = Cookies.get(SESSION_KEYS.TOKEN);
    const localToken = localStorage.getItem(SESSION_KEYS.TOKEN);
    
    console.log('SessionManager - Cookie token:', cookieToken ? 'exists' : 'none');
    console.log('SessionManager - LocalStorage token:', localToken ? 'exists' : 'none');
    
    return cookieToken || localToken;
  }

  setToken(token) {
    if (!token) {
      console.warn('SessionManager - Attempting to set empty token');
      return false;
    }

    try {
      // Store in both cookies and localStorage for redundancy
      Cookies.set(SESSION_KEYS.TOKEN, token, COOKIE_OPTIONS);
      localStorage.setItem(SESSION_KEYS.TOKEN, token);
      
      console.log('SessionManager - Token stored successfully');
      console.log('SessionManager - Token in cookies:', !!Cookies.get(SESSION_KEYS.TOKEN));
      console.log('SessionManager - Token in localStorage:', !!localStorage.getItem(SESSION_KEYS.TOKEN));
      
      return true;
    } catch (error) {
      console.error('SessionManager - Error storing token:', error);
      return false;
    }
  }

  removeToken() {
    try {
      Cookies.remove(SESSION_KEYS.TOKEN);
      localStorage.removeItem(SESSION_KEYS.TOKEN);
      console.log('SessionManager - Token removed successfully');
      return true;
    } catch (error) {
      console.error('SessionManager - Error removing token:', error);
      return false;
    }
  }

  // User data management
  getUser() {
    try {
      const userData = localStorage.getItem(SESSION_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('SessionManager - Error parsing user data:', error);
      return null;
    }
  }

  setUser(user) {
    if (!user) {
      console.warn('SessionManager - Attempting to set empty user data');
      return false;
    }

    try {
      localStorage.setItem(SESSION_KEYS.USER, JSON.stringify(user));
      console.log('SessionManager - User data stored successfully');
      return true;
    } catch (error) {
      console.error('SessionManager - Error storing user data:', error);
      return false;
    }
  }

  removeUser() {
    try {
      localStorage.removeItem(SESSION_KEYS.USER);
      console.log('SessionManager - User data removed successfully');
      return true;
    } catch (error) {
      console.error('SessionManager - Error removing user data:', error);
      return false;
    }
  }

  // Signup email management
  getSignupEmail() {
    return localStorage.getItem(SESSION_KEYS.SIGNUP_EMAIL);
  }

  setSignupEmail(email) {
    if (email) {
      localStorage.setItem(SESSION_KEYS.SIGNUP_EMAIL, email);
      console.log('SessionManager - Signup email stored:', email);
    }
  }

  removeSignupEmail() {
    localStorage.removeItem(SESSION_KEYS.SIGNUP_EMAIL);
    console.log('SessionManager - Signup email removed');
  }

  // Session validation
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    
    const isAuth = !!(token && user);
    console.log('SessionManager - Authentication check:', {
      hasToken: !!token,
      hasUser: !!user,
      isAuthenticated: isAuth
    });
    
    return isAuth;
  }

  // Complete session management
  createSession(token, user) {
    console.log('SessionManager - Creating new session');
    
    const tokenStored = this.setToken(token);
    const userStored = this.setUser(user);
    
    if (tokenStored && userStored) {
      console.log('SessionManager - Session created successfully');
      return true;
    } else {
      console.error('SessionManager - Failed to create session');
      return false;
    }
  }

  clearSession() {
    console.log('SessionManager - Clearing session');
    
    this.removeToken();
    this.removeUser();
    this.removeSignupEmail();
    
    console.log('SessionManager - Session cleared successfully');
  }

  // Session refresh
  refreshSession(token, user) {
    console.log('SessionManager - Refreshing session');
    
    if (token && user) {
      return this.createSession(token, user);
    } else {
      console.warn('SessionManager - Cannot refresh session with empty data');
      return false;
    }
  }

  // Get session info for debugging
  getSessionInfo() {
    return {
      sessionId: this.getSessionId(),
      hasToken: !!this.getToken(),
      hasUser: !!this.getUser(),
      isAuthenticated: this.isAuthenticated(),
      signupEmail: this.getSignupEmail(),
      tokenLength: this.getToken()?.length || 0,
    };
  }

  // Validate token format (basic check)
  validateTokenFormat(token) {
    if (!token) return false;
    
    // Basic JWT format validation (3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Check if all parts have content
    return parts.every(part => part && part.length > 0);
  }
}

// Create singleton instance
const sessionManager = new SessionManager();

export default sessionManager; 