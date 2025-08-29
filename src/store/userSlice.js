// src/store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  showSuccess,
  showError,
  showLoading,
  dismissToast,
} from "../utils/toast";
import { authAPI } from "../services/api";
import { API_BASE_URL } from "../constants/api";
import sessionManager from "../utils/sessionManager";

// Initial state
const initialState = {
  user: null,
  token: sessionManager.getToken(),
  isAuthenticated: sessionManager.isAuthenticated(),
  loading: false,
  error: null,
  signupEmail: sessionManager.getSignupEmail(),
  referralTree: null,
  referralTreeLoading: false,
  referralTreeError: null,
  referralTreeAttempted: false,
};

// Debug initial state
console.log("=== REDUX INITIAL STATE ===");
console.log("Session info:", sessionManager.getSessionInfo());
console.log("Initial state user:", initialState.user);
console.log("Initial state token:", initialState.token);
console.log("Initial state isAuthenticated:", initialState.isAuthenticated);
console.log("==========================");

// Async thunks
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    console.log("loginUser - Attempting login with credentials:", credentials);
    const loadingToast = showLoading("Logging in...");
    try {
      const response = await authAPI.login(credentials);
      dismissToast(loadingToast);

      const { user, token } = response.data;
      const sessionCreated = sessionManager.createSession(token, user);

      if (!sessionCreated) {
        throw new Error("Failed to create user session");
      }

      console.log("loginUser - Success, user:", user);
      showSuccess("Login successful!");
      return { user, token };
    } catch (error) {
      dismissToast(loadingToast);
      const errorData = error.response?.data || {
        message: error.message || "Login failed",
      };
      console.log("loginUser - Error:", errorData);
      showError(errorData.message || "Login failed");
      return rejectWithValue(errorData.message || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    const loadingToast = showLoading("Creating account...");
    try {
      const response = await authAPI.signup(userData);
      dismissToast(loadingToast);

      // Store email in sessionManager and verify
      sessionManager.setSignupEmail(userData.email);
      console.log("signupUser - Email stored in session:", userData.email);
      console.log(
        "signupUser - Verify email in localStorage:",
        localStorage.getItem("signup_email")
      );

      if (response.data.userId) {
        localStorage.setItem("signupUserId", response.data.userId);
      }

      showSuccess(
        response.data.message ||
          "OTP sent. Please verify to complete registration."
      );

      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorData = error.response?.data || {
        message: error.message || "Signup failed",
      };
      console.log("signupUser - Error:", errorData);
      return rejectWithValue(errorData);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async (otpData, { dispatch, rejectWithValue }) => {
    const loadingToast = showLoading("Verifying OTP...");
    try {
      const response = await authAPI.verifyOTP(otpData);
      dismissToast(loadingToast);

      sessionManager.removeSignupEmail();

      console.log("verifyOTP - Response data:", response.data);
      showSuccess(
        response.data.message || "Registration completed successfully!"
      );
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorData = error.response?.data || {
        message: error.message || "OTP verification failed",
      };
      showError(errorData.message || "OTP verification failed");
      return rejectWithValue(errorData.message || "OTP verification failed");
    }
  }
);


export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (emailData, { rejectWithValue }) => {
    const loadingToast = showLoading("Sending password reset OTP...");
    try {
      const response = await authAPI.forgotPassword(emailData);
      dismissToast(loadingToast);

      sessionManager.setSignupEmail(emailData.email);
      if (response.data.userId) {
        localStorage.setItem("signupUserId", response.data.userId);
      }

      showSuccess(response.data.message || "Reset OTP sent to email.");
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorData = error.response?.data || {
        message: error.message || "Failed to send reset OTP",
      };
      showError(errorData.message || "Failed to send reset OTP");
      return rejectWithValue(errorData.message || "Failed to send reset OTP");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (resetData, { rejectWithValue }) => {
    const loadingToast = showLoading("Resetting password...");
    try {
      const response = await authAPI.resetPassword(resetData);
      dismissToast(loadingToast);

      sessionManager.removeSignupEmail();
      localStorage.removeItem("signupUserId");

      showSuccess(response.data.message || "Password reset successful.");
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorData = error.response?.data || {
        message: error.message || "Password reset failed",
      };
      showError(errorData.message || "Password reset failed");
      return rejectWithValue(errorData.message || "Password reset failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    const loadingToast = showLoading("Logging out...");
    try {
      sessionManager.clearSession();
      dismissToast(loadingToast);
      showSuccess("Logged out successfully");
      return { message: "Logged out successfully" };
    } catch (error) {
      dismissToast(loadingToast);
      const errorMessage = error.message || "Logout failed";
      showError(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const checkCurrentUser = createAsyncThunk(
  "user/checkCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCurrentUser();
      console.log("checkCurrentUser - Raw response:", response.data);
      const { user, token } = response.data;
      if (!user || !token) {
        throw new Error("Invalid response: user or token missing");
      }
      const sessionCreated = sessionManager.createSession(token, user);
      if (!sessionCreated) {
        throw new Error("Failed to create session");
      }
      console.log("checkCurrentUser - User data:", user);
      console.log("checkCurrentUser - Token:", token);
      return { user, token };
    } catch (error) {
      console.error("checkCurrentUser - Error:", error);
      const errorData = error.response?.data || {
        message: error.message || "Failed to get user data",
      };
      if (error.response?.status === 401) {
        console.log("checkCurrentUser - 401 Unauthorized, clearing session");
        sessionManager.clearSession();
      }
      return rejectWithValue(errorData.message || "Failed to get user data");
    }
  }
);

export const resendOTP = createAsyncThunk(
  "user/resendOTP",
  async (email, { rejectWithValue }) => {
    const loadingToast = showLoading("Resending OTP...");
    try {
      const response = await authAPI.resendOTP({ email });
      dismissToast(loadingToast);
      showSuccess(response.data.message || "OTP resent successfully!");
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorData = error.response?.data || {
        message: error.message || "Failed to resend OTP",
      };
      showError(errorData.message || "Failed to resend OTP");
      return rejectWithValue(errorData.message || "Failed to resend OTP");
    }
  }
);

export const fetchReferralTree = createAsyncThunk(
  "user/fetchReferralTree",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    if (state.user.referralTreeAttempted && state.user.referralTreeError) {
      console.log("fetchReferralTree - Already attempted and failed, skipping");
      return rejectWithValue("Referral tree fetch already attempted");
    }

    const sessionToken = sessionManager.getToken();
    const sessionUser = sessionManager.getUser();
    const sessionIsAuth = sessionManager.isAuthenticated();

    if (!sessionToken || !sessionUser || !sessionIsAuth) {
      console.log("fetchReferralTree - No valid session");
      return rejectWithValue("No valid session");
    }

    const loadingToast = showLoading("Loading referral tree...");

    try {
      const response = await authAPI.getReferralTree();
      dismissToast(loadingToast);
      console.log("fetchReferralTree - Success:", response.data);
      return response.data;
    } catch (error) {
      console.log("fetchReferralTree - API call failed, trying fetch directly");
      try {
        const cleanedToken = sessionManager.getToken().replace(/['"]/g, "");
        const fetchResponse = await fetch(
          `${API_BASE_URL}/user/referral-tree`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cleanedToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          dismissToast(loadingToast);
          console.log("fetchReferralTree - Fetch call succeeded:", data);
          return data;
        } else {
          const errorData = await fetchResponse.json();
          console.log(
            "fetchReferralTree - Fetch call failed:",
            fetchResponse.status,
            errorData
          );
          dismissToast(loadingToast);
          showError(errorData.message || "Failed to load referral tree");
          return rejectWithValue(
            errorData.message || "Failed to load referral tree"
          );
        }
      } catch (fetchError) {
        console.log("fetchReferralTree - Fetch call also failed:", fetchError);
        dismissToast(loadingToast);
        showError(fetchError.message || "Failed to load referral tree");
        return rejectWithValue(
          fetchError.message || "Failed to load referral tree"
        );
      }
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionManager.setUser(action.payload);
      console.log("setUser - Updated user:", action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      sessionManager.setToken(action.payload);
      console.log("setToken - Updated token:", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.signupEmail = null;
      state.referralTree = null;
      state.referralTreeError = null;
      state.referralTreeAttempted = false;
      sessionManager.clearSession();
      console.log("logout - Session cleared");
      showSuccess("Logged out successfully");
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearSignupEmail: (state) => {
      state.signupEmail = null;
      sessionManager.removeSignupEmail();
    },
    clearReferralTree: (state) => {
      state.referralTree = null;
      state.referralTreeError = null;
      state.referralTreeAttempted = false;
    },
    syncWithSession: (state) => {
      const sessionUser = sessionManager.getUser();
      const sessionToken = sessionManager.getToken();
      state.user = sessionUser;
      state.token = sessionToken;
      state.isAuthenticated = sessionManager.isAuthenticated();
      state.signupEmail = sessionManager.getSignupEmail();
      console.log("syncWithSession - Synced state:", {
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        signupEmail: state.signupEmail,
      });
    },
    resetReferralTreeAttempt: (state) => {
      state.referralTreeAttempted = false;
      state.referralTreeError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("loginUser - Pending");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        console.log("loginUser - Fulfilled, user:", action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("loginUser - Rejected:", action.payload);
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("signupUser - Pending");
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signupData = action.payload;
        state.signupEmail = sessionManager.getSignupEmail();
        state.error = null;
        console.log("signupUser - Fulfilled, signupEmail:", state.signupEmail);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("signupUser - Rejected:", action.payload);
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("verifyOTP - Pending");
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.signupEmail = null;
        state.error = null;
        console.log("verifyOTP - Fulfilled, user:", action.payload.user);
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("verifyOTP - Rejected:", action.payload);
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("forgotPassword - Pending");
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.signupEmail = sessionManager.getSignupEmail();
        state.error = null;
        console.log(
          "forgotPassword - Fulfilled, signupEmail:",
          state.signupEmail
        );
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("forgotPassword - Rejected:", action.payload);
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("resetPassword - Pending");
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.signupEmail = null;
        state.error = null;
        console.log("resetPassword - Fulfilled");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("resetPassword - Rejected:", action.payload);
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("logoutUser - Pending");
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.signupEmail = null;
        state.referralTree = null;
        state.referralTreeError = null;
        state.referralTreeAttempted = false;
        console.log("logoutUser - Fulfilled");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.signupEmail = null;
        state.referralTree = null;
        state.referralTreeError = null;
        state.referralTreeAttempted = false;
        sessionManager.clearSession();
        console.log("logoutUser - Rejected:", action.payload);
      })
      .addCase(checkCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("checkCurrentUser - Pending");
      })
      .addCase(checkCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        console.log("checkCurrentUser - Fulfilled, user:", action.payload.user);
      })
      .addCase(checkCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (
          action.payload?.includes("401") ||
          action.payload?.includes("Unauthorized")
        ) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.referralTree = null;
          state.referralTreeError = null;
          state.referralTreeAttempted = false;
          sessionManager.clearSession();
          console.log(
            "checkCurrentUser - Rejected: 401 Unauthorized, session cleared"
          );
        } else {
          console.log(
            "checkCurrentUser - Rejected, keeping session:",
            action.payload
          );
        }
      })
      .addCase(fetchReferralTree.pending, (state) => {
        state.referralTreeLoading = true;
        state.referralTreeError = null;
        state.referralTreeAttempted = true;
        console.log("fetchReferralTree - Pending");
      })
      .addCase(fetchReferralTree.fulfilled, (state, action) => {
        state.referralTreeLoading = false;
        state.referralTree = action.payload.referralTree;
        state.referralTreeError = null;
        console.log("fetchReferralTree - Fulfilled");
      })
      .addCase(fetchReferralTree.rejected, (state, action) => {
        state.referralTreeLoading = false;
        state.referralTreeError = action.payload;
        state.referralTreeAttempted = true;
        console.log("fetchReferralTree - Rejected:", action.payload);
      })
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("resendOTP - Pending");
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("resendOTP - Fulfilled");
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("resendOTP - Rejected:", action.payload);
      });
  },
});

// Export actions and selectors
export const {
  setUser,
  setToken,
  logout,
  clearError,
  setLoading,
  clearSignupEmail,
  clearReferralTree,
  syncWithSession,
  resetReferralTreeAttempt,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const selectSignupData = (state) => state.user.signupData;
export const selectSignupEmail = (state) => state.user.signupEmail;
export const selectReferralTree = (state) => state.user.referralTree;
export const selectReferralTreeLoading = (state) =>
  state.user.referralTreeLoading;
export const selectReferralTreeError = (state) => state.user.referralTreeError;
export const selectReferralTreeAttempted = (state) =>
  state.user.referralTreeAttempted;

export default userSlice.reducer;