// src/store/mlmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  showSuccess,
  showError,
  showLoading,
  dismissToast,
} from "../utils/toast";
import { authAPI } from "../services/api";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/api";
import sessionManager from "../utils/sessionManager";
import api from "../services/api";

// Initial state
const initialState = {
  mlmDashboard: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchMlmDashboard = createAsyncThunk(
  "mlm/fetchDashboard",
  async (_, { rejectWithValue, getState }) => {
    const loadingToast = showLoading("Loading MLM dashboard...");
    try {
      const user = sessionManager.getUser();
      console.log('User from session:', user);
      
      if (!user || !user._id) {
        dismissToast(loadingToast);
        return rejectWithValue("User not authenticated");
      }
      
      console.log('Making API call to:', `${API_ENDPOINTS.MLM_USER_DASHBOARD}/${user._id}`);
      const response = await api.get(`${API_ENDPOINTS.MLM_USER_DASHBOARD}/${user._id}`);
      dismissToast(loadingToast);
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorData = error.response?.data || {
        message: error.message || "Failed to load MLM dashboard",
      };
      showError(errorData.message || "Failed to load MLM dashboard");
      return rejectWithValue(errorData.message || "Failed to load MLM dashboard");
    }
  }
);

// MLM slice
const mlmSlice = createSlice({
  name: "mlm",
  initialState,
  reducers: {
    clearMlmDashboard: (state) => {
      state.mlmDashboard = null;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMlmDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("fetchMlmDashboard - Pending");
      })
      .addCase(fetchMlmDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.mlmDashboard = action.payload.data;
        state.error = null;
        console.log("fetchMlmDashboard - Fulfilled", action.payload);
      })
      .addCase(fetchMlmDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("fetchMlmDashboard - Rejected:", action.payload);
      });
  },
});

// Export actions and selectors
export const { clearMlmDashboard, setLoading } = mlmSlice.actions;

export const selectMlmDashboard = (state) => state.mlm.mlmDashboard;
export const selectMlmLoading = (state) => state.mlm.loading;
export const selectMlmError = (state) => state.mlm.error;

export default mlmSlice.reducer;