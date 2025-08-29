import Cookies from "js-cookie";

// Session storage keys
const SESSION_KEYS = {
  TOKEN: "auth_token",
  USER: "auth_user",
  SIGNUP_EMAIL: "signup_email",
  SESSION_ID: "session_id",
};

// Cookie options
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

class SessionManager {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeSession();
  }

  // Generate unique session ID
  generateSessionId() {
    const sessionId =
      "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    console.log("SessionManager - Generated sessionId:", sessionId);
    return sessionId;
  }

  // Initialize session
  initializeSession() {
    const existingSessionId = this.getSessionId();
    if (!existingSessionId) {
      this.setSessionId(this.sessionId);
    } else {
      this.sessionId = existingSessionId;
      console.log("SessionManager - Using existing sessionId:", this.sessionId);
    }
  }

  // Session ID management
  getSessionId() {
    const sessionId = localStorage.getItem(SESSION_KEYS.SESSION_ID);
    console.log("SessionManager - getSessionId:", sessionId);
    return sessionId;
  }

  setSessionId(sessionId) {
    localStorage.setItem(SESSION_KEYS.SESSION_ID, sessionId);
    console.log("SessionManager - setSessionId:", sessionId);
  }

  // Token management
  getToken() {
    const cookieToken = Cookies.get(SESSION_KEYS.TOKEN);
    const localToken = localStorage.getItem(SESSION_KEYS.TOKEN);

    console.log(
      "SessionManager - getToken - Cookie token:",
      cookieToken ? "exists" : "none"
    );
    console.log(
      "SessionManager - getToken - LocalStorage token:",
      localToken ? "exists" : "none"
    );

    return cookieToken || localToken;
  }

  setToken(token) {
    if (!token) {
      console.warn("SessionManager - setToken - Empty token provided");
      return false;
    }

    try {
      Cookies.set(SESSION_KEYS.TOKEN, token, COOKIE_OPTIONS);
      localStorage.setItem(SESSION_KEYS.TOKEN, token);

      console.log("SessionManager - setToken - Token stored successfully");
      console.log(
        "SessionManager - setToken - Token in cookies:",
        !!Cookies.get(SESSION_KEYS.TOKEN)
      );
      console.log(
        "SessionManager - setToken - Token in localStorage:",
        !!localStorage.getItem(SESSION_KEYS.TOKEN)
      );

      return true;
    } catch (error) {
      console.error("SessionManager - setToken - Error:", error);
      return false;
    }
  }

  removeToken() {
    try {
      Cookies.remove(SESSION_KEYS.TOKEN);
      localStorage.removeItem(SESSION_KEYS.TOKEN);
      console.log("SessionManager - removeToken - Token removed successfully");
      return true;
    } catch (error) {
      console.error("SessionManager - removeToken - Error:", error);
      return false;
    }
  }

  // User data management
  getUser() {
    try {
      const userData = localStorage.getItem(SESSION_KEYS.USER);
      const parsedUser = userData ? JSON.parse(userData) : null;
      console.log("SessionManager - getUser - Retrieved user:", parsedUser);
      return parsedUser;
    } catch (error) {
      console.error(
        "SessionManager - getUser - Error parsing user data:",
        error
      );
      return null;
    }
  }

  setUser(user) {
    if (!user) {
      console.warn("SessionManager - setUser - Empty user data provided");
      return false;
    }

    try {
      localStorage.setItem(SESSION_KEYS.USER, JSON.stringify(user));
      console.log("SessionManager - setUser - Stored user:", user);
      return true;
    } catch (error) {
      console.error(
        "SessionManager - setUser - Error storing user data:",
        error
      );
      return false;
    }
  }

  removeUser() {
    try {
      localStorage.removeItem(SESSION_KEYS.USER);
      console.log(
        "SessionManager - removeUser - User data removed successfully"
      );
      return true;
    } catch (error) {
      console.error("SessionManager - removeUser - Error:", error);
      return false;
    }
  }

  // Signup email management
  getSignupEmail() {
    const email = localStorage.getItem(SESSION_KEYS.SIGNUP_EMAIL);
    console.log("SessionManager - getSignupEmail:", email);
    return email;
  }

  setSignupEmail(email) {
    if (email) {
      localStorage.setItem(SESSION_KEYS.SIGNUP_EMAIL, email);
      console.log("SessionManager - setSignupEmail:", email);
    }
  }

  removeSignupEmail() {
    localStorage.removeItem(SESSION_KEYS.SIGNUP_EMAIL);
    console.log("SessionManager - removeSignupEmail - Signup email removed");
  }

  // Session validation
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();

    const isAuth = !!(token && user);
    console.log("SessionManager - isAuthenticated:", {
      hasToken: !!token,
      hasUser: !!user,
      isAuthenticated: isAuth,
    });

    return isAuth;
  }

  // Complete session management
  createSession(token, user) {
    console.log("SessionManager - createSession - Token:", token);
    console.log("SessionManager - createSession - User:", user);

    const tokenStored = this.setToken(token);
    const userStored = this.setUser(user);

    if (tokenStored && userStored) {
      console.log(
        "SessionManager - createSession - Session created successfully"
      );
      return true;
    } else {
      console.error("SessionManager - createSession - Failed");
      return false;
    }
  }

  clearSession() {
    console.log("SessionManager - clearSession");

    this.removeToken();
    this.removeUser();
    this.removeSignupEmail();

    console.log("SessionManager - clearSession - Session cleared successfully");
  }

  // Session refresh
  refreshSession(token, user) {
    console.log("SessionManager - refreshSession - Token:", token);
    console.log("SessionManager - refreshSession - User:", user);

    if (token && user) {
      return this.createSession(token, user);
    } else {
      console.warn("SessionManager - refreshSession - Empty data provided");
      return false;
    }
  }

  // Get session info for debugging
  getSessionInfo() {
    const info = {
      sessionId: this.getSessionId(),
      hasToken: !!this.getToken(),
      hasUser: !!this.getUser(),
      isAuthenticated: this.isAuthenticated(),
      signupEmail: this.getSignupEmail(),
      tokenLength: this.getToken()?.length || 0,
    };
    console.log("SessionManager - getSessionInfo:", info);
    return info;
  }

  // Validate token format (basic check)
  validateTokenFormat(token) {
    if (!token) {
      console.warn("SessionManager - validateTokenFormat - No token provided");
      return false;
    }

    const parts = token.split(".");
    const isValid =
      parts.length === 3 && parts.every((part) => part && part.length > 0);
    console.log("SessionManager - validateTokenFormat - Token valid:", isValid);
    return isValid;
  }
}

// Create singleton instance
const sessionManager = new SessionManager();

export default sessionManager;
