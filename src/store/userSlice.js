import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showSuccess, showError, showLoading, dismissToast } from '../utils/toast';
import { authAPI } from '../services/api';
import sessionManager from '../utils/sessionManager';

// Initial state using session manager
const initialState = {
  user: sessionManager.getUser(),
  token: sessionManager.getToken(),
  isAuthenticated: sessionManager.isAuthenticated(),
  loading: false,
  error: null,
  signupEmail: sessionManager.getSignupEmail(),
  referralTree: null,
  referralTreeLoading: false,
  referralTreeError: null,
  referralTreeAttempted: false, // Flag to prevent infinite loops
};

// Debug initial state
console.log('=== REDUX INITIAL STATE ===');
console.log('Session info:', sessionManager.getSessionInfo());
console.log('Initial state:', {
  user: !!initialState.user,
  token: !!initialState.token,
  isAuthenticated: initialState.isAuthenticated,
  signupEmail: !!initialState.signupEmail
});
console.log('==========================');

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    const loadingToast = showLoading('Logging in...');
    try {
      const response = await authAPI.login(credentials);
      dismissToast(loadingToast);
      
      // Create session with received data
      const sessionCreated = sessionManager.createSession(
        response.data.token,
        response.data.user
      );
      
      if (!sessionCreated) {
        throw new Error('Failed to create user session');
      }
      
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      showError(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const signupUser = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue }) => {
    const loadingToast = showLoading('Creating account...');
    try {
      const response = await authAPI.signup(userData);
      dismissToast(loadingToast);
      
      // Save email to session manager
      sessionManager.setSignupEmail(userData.email);
      
      // Store userId in localStorage for resend OTP functionality
      if (response.data.userId) {
        localStorage.setItem('signupUserId', response.data.userId);
      }
      
      showSuccess(response.data.message || 'OTP sent. Please verify to complete registration.');
      
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
      showError(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'user/verifyOTP',
  async (otpData, { rejectWithValue }) => {
    const loadingToast = showLoading('Verifying OTP...');
    try {
      const response = await authAPI.verifyOTP(otpData);
      dismissToast(loadingToast);
      
      // Create session with received data
      const sessionCreated = sessionManager.createSession(
        response.data.token,
        response.data.user
      );
      
      if (!sessionCreated) {
        throw new Error('Failed to create user session');
      }
      
      // Clear signup email after successful verification
      sessionManager.removeSignupEmail();
      
      // Clear userId from localStorage after successful verification
      localStorage.removeItem('signupUserId');
      
      showSuccess(response.data.message || 'Registration completed successfully!');
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorMessage = error.response?.data?.message || error.message || 'OTP verification failed';
      showError(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const loadingToast = showLoading('Logging out...');
    try {
      // Clear session completely
      sessionManager.clearSession();
      
      dismissToast(loadingToast);
      showSuccess('Logged out successfully');
      
      return { message: 'Logged out successfully' };
    } catch (error) {
      dismissToast(loadingToast);
      const errorMessage = error.message || 'Logout failed';
      showError(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const checkCurrentUser = createAsyncThunk(
  'user/checkCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCurrentUser();
      
      // Refresh session with updated data
      const sessionRefreshed = sessionManager.refreshSession(
        response.data.token,
        response.data.user
      );
      
      if (!sessionRefreshed) {
        console.warn('Failed to refresh session with current user data');
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to get user data';
      
      // Only clear session on 401 errors
      if (error.response?.status === 401) {
        console.log('401 error - clearing session');
        sessionManager.clearSession();
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const resendOTP = createAsyncThunk(
  'user/resendOTP',
  async (userId, { rejectWithValue }) => {
    const loadingToast = showLoading('Resending OTP...');
    try {
      const response = await authAPI.resendOTP(userId);
      dismissToast(loadingToast);
      showSuccess(response.data.message || 'OTP resent successfully!');
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to resend OTP';
      showError(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchReferralTree = createAsyncThunk(
  'user/fetchReferralTree',
  async (_, { rejectWithValue, getState }) => {
    // Check if we've already attempted to fetch and failed
    const state = getState();
    if (state.user.referralTreeAttempted && state.user.referralTreeError) {
      console.log('Referral tree fetch already attempted and failed, skipping');
      return rejectWithValue('Referral tree fetch already attempted');
    }

    // Check if we have a valid session before making the API call
    const sessionToken = sessionManager.getToken();
    const sessionUser = sessionManager.getUser();
    const sessionIsAuth = sessionManager.isAuthenticated();
    
    if (!sessionToken || !sessionUser || !sessionIsAuth) {
      console.log('No valid session for referral tree fetch');
      return rejectWithValue('No valid session');
    }

    const loadingToast = showLoading('Loading referral tree...');
    
    try {
      // First try with the normal API call
      console.log('Attempting referral tree fetch with normal API call');
      const response = await authAPI.getReferralTree();
      dismissToast(loadingToast);
      return response.data;
    } catch (error) {
      console.log('Normal API call failed, trying with fetch directly');
      
      // If the normal API call fails, try with fetch directly
      try {
        const cleanedToken = cleanToken(sessionToken);
        const fetchResponse = await fetch('https://api.aaogobackend.xyz/api/user/referral-tree', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${cleanedToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          dismissToast(loadingToast);
          console.log('Fetch call succeeded');
          return data;
        } else {
          const errorData = await fetchResponse.json();
          console.log('Fetch call failed:', fetchResponse.status, errorData);
          dismissToast(loadingToast);
          return rejectWithValue(errorData.message || 'Failed to load referral tree');
        }
      } catch (fetchError) {
        console.log('Fetch call also failed:', fetchError);
        dismissToast(loadingToast);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load referral tree';
        showError(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  }
);

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionManager.setUser(action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      sessionManager.setToken(action.payload);
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
      showSuccess('Logged out successfully');
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
    // Sync with session manager
    syncWithSession: (state) => {
      state.user = sessionManager.getUser();
      state.token = sessionManager.getToken();
      state.isAuthenticated = sessionManager.isAuthenticated();
      state.signupEmail = sessionManager.getSignupEmail();
    },
    // Reset referral tree attempt flag
    resetReferralTreeAttempt: (state) => {
      state.referralTreeAttempted = false;
      state.referralTreeError = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        
        console.log('Login successful - Session created');
        console.log('Session info:', sessionManager.getSessionInfo());
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signupData = action.payload;
        // Don't update signupEmail here as it's already set in the thunk
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Verify OTP
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.signupEmail = null;
        state.error = null;
        
        console.log('OTP verification successful - Session created');
        console.log('Session info:', sessionManager.getSessionInfo());
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
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
        
        console.log('Logout successful - Session cleared');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Even if logout API fails, clear local state
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.signupEmail = null;
        state.referralTree = null;
        state.referralTreeError = null;
        state.referralTreeAttempted = false;
        
        sessionManager.clearSession();
        console.log('Logout failed but session cleared');
      });

    // Check current user
    builder
      .addCase(checkCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        
        console.log('Current user check successful - Session refreshed');
        console.log('Session info:', sessionManager.getSessionInfo());
      })
      .addCase(checkCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
        // Only clear session on 401 errors
        if (action.payload?.includes('401') || action.payload?.includes('Unauthorized')) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.referralTree = null;
          state.referralTreeError = null;
          state.referralTreeAttempted = false;
          
          sessionManager.clearSession();
          console.log('401 error - Session cleared');
        } else {
          console.log('Current user check failed - but keeping session:', action.payload);
        }
      });

    // Fetch referral tree
    builder
      .addCase(fetchReferralTree.pending, (state) => {
        state.referralTreeLoading = true;
        state.referralTreeError = null;
        state.referralTreeAttempted = true;
      })
      .addCase(fetchReferralTree.fulfilled, (state, action) => {
        state.referralTreeLoading = false;
        state.referralTree = action.payload.referralTree;
        state.referralTreeError = null;
        console.log('Referral tree fetched successfully');
      })
      .addCase(fetchReferralTree.rejected, (state, action) => {
        state.referralTreeLoading = false;
        state.referralTreeError = action.payload;
        state.referralTreeAttempted = true;
        console.log('Referral tree fetch failed:', action.payload);
      });

    // Resend OTP
    builder
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log('OTP resent successfully');
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { 
  setUser, 
  setToken, 
  logout, 
  clearError, 
  setLoading, 
  clearSignupEmail, 
  clearReferralTree,
  syncWithSession,
  resetReferralTreeAttempt
} = userSlice.actions;

// Export selectors
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const selectSignupData = (state) => state.user.signupData;
export const selectSignupEmail = (state) => state.user.signupEmail;
export const selectReferralTree = (state) => state.user.referralTree;
export const selectReferralTreeLoading = (state) => state.user.referralTreeLoading;
export const selectReferralTreeError = (state) => state.user.referralTreeError;
export const selectReferralTreeAttempted = (state) => state.user.referralTreeAttempted;

// Export reducer
export default userSlice.reducer; 