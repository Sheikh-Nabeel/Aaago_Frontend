// src/store/crrSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showLoading, dismissToast, showError } from "../utils/toast";
import api from "../services/api";
import { API_ENDPOINTS } from "../constants/api";
import sessionManager from "../utils/sessionManager";

// Initial state
const initialState = {
  rankTracking: null,
  rankTrackingLoading: false,
  rankTrackingError: null,
  leaderboard: null,
  leaderboardLoading: false,
  leaderboardError: null,
};

// Async thunk to fetch CRR rank tracking
export const fetchCrrRankTracking = createAsyncThunk(
  "crr/fetchRankTracking",
  async (_, { rejectWithValue }) => {
    const loadingToast = showLoading("Loading CRR rank tracking...");
    try {
      const user = sessionManager.getUser();
      
      if (!user || !user._id) {
        dismissToast(loadingToast);
        return rejectWithValue("User not authenticated");
      }
      
      const response = await api.get(`/mlm/crr/rank-tracking/${user._id}`);
      dismissToast(loadingToast);
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorData = error.response?.data || {
        message: error.message || "Failed to load CRR rank tracking",
      };
      showError(errorData.message || "Failed to load CRR rank tracking");
      return rejectWithValue(errorData.message || "Failed to load CRR rank tracking");
    }
  }
);

// Async thunk to fetch CRR leaderboard
export const fetchCrrLeaderboard = createAsyncThunk(
  "crr/fetchLeaderboard",
  async (_, { rejectWithValue }) => {
    const loadingToast = showLoading("Loading CRR leaderboard...");
    try {
      const response = await api.get(API_ENDPOINTS.CRR_LEADERBOARD);
      dismissToast(loadingToast);
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorData = error.response?.data || {
        message: error.message || "Failed to load CRR leaderboard",
      };
      showError(errorData.message || "Failed to load CRR leaderboard");
      return rejectWithValue(errorData.message || "Failed to load CRR leaderboard");
    }
  }
);

// CRR slice
const crrSlice = createSlice({
  name: "crr",
  initialState,
  reducers: {
    clearRankTracking: (state) => {
      state.rankTracking = null;
      state.rankTrackingError = null;
    },
    clearLeaderboard: (state) => {
      state.leaderboard = null;
      state.leaderboardError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Rank tracking reducers
      .addCase(fetchCrrRankTracking.pending, (state) => {
        state.rankTrackingLoading = true;
        state.rankTrackingError = null;
        console.log("fetchCrrRankTracking - Pending");
      })
      .addCase(fetchCrrRankTracking.fulfilled, (state, action) => {
        state.rankTrackingLoading = false;
        state.rankTracking = action.payload.data;
        state.rankTrackingError = null;
        console.log("fetchCrrRankTracking - Fulfilled", action.payload);
      })
      .addCase(fetchCrrRankTracking.rejected, (state, action) => {
        state.rankTrackingLoading = false;
        state.rankTrackingError = action.payload;
        console.log("fetchCrrRankTracking - Rejected:", action.payload);
      })
      
      // Leaderboard reducers
      .addCase(fetchCrrLeaderboard.pending, (state) => {
        state.leaderboardLoading = true;
        state.leaderboardError = null;
        console.log("fetchCrrLeaderboard - Pending");
      })
      .addCase(fetchCrrLeaderboard.fulfilled, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboard = action.payload.data.leaderboard;
        state.leaderboardError = null;
        console.log("fetchCrrLeaderboard - Fulfilled", action.payload);
      })
      .addCase(fetchCrrLeaderboard.rejected, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardError = action.payload;
        console.log("fetchCrrLeaderboard - Rejected:", action.payload);
      });
  },
});

// Export actions and selectors
export const { clearRankTracking, clearLeaderboard } = crrSlice.actions;

export const selectCrrRankTracking = (state) => state.crr.rankTracking;
export const selectCrrRankTrackingLoading = (state) => state.crr.rankTrackingLoading;
export const selectCrrRankTrackingError = (state) => state.crr.rankTrackingError;

export const selectCrrLeaderboard = (state) => state.crr.leaderboard;
export const selectCrrLeaderboardLoading = (state) => state.crr.leaderboardLoading;
export const selectCrrLeaderboardError = (state) => state.crr.leaderboardError;

export default crrSlice.reducer;