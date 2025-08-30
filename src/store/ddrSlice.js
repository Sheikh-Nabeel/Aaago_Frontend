// src/store/ddrSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showLoading, dismissToast, showError } from "../utils/toast";
import api from "../services/api";
import { API_ENDPOINTS } from "../constants/api";

// Initial state
const initialState = {
  leaderboard: [],
  leaderboardLoading: false,
  leaderboardError: null,
};

// Async thunk to fetch DDR leaderboard
export const fetchDdrLeaderboard = createAsyncThunk(
  "ddr/fetchLeaderboard",
  async (_, { rejectWithValue }) => {
    const loadingToast = showLoading("Loading DDR leaderboard...");
    try {
      const response = await api.get(API_ENDPOINTS.DDR_LEADERBOARD);
      dismissToast(loadingToast);
      return response.data;
    } catch (error) {
      dismissToast(loadingToast);
      const errorData = error.response?.data || {
        message: error.message || "Failed to load DDR leaderboard",
      };
      showError(errorData.message || "Failed to load DDR leaderboard");
      return rejectWithValue(errorData.message || "Failed to load DDR leaderboard");
    }
  }
);

// DDR slice
const ddrSlice = createSlice({
  name: "ddr",
  initialState,
  reducers: {
    clearLeaderboard: (state) => {
      state.leaderboard = [];
      state.leaderboardError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDdrLeaderboard.pending, (state) => {
        state.leaderboardLoading = true;
        state.leaderboardError = null;
        console.log("fetchDdrLeaderboard - Pending");
      })
      .addCase(fetchDdrLeaderboard.fulfilled, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboard = action.payload.data.leaderboard;
        state.leaderboardError = null;
        console.log("fetchDdrLeaderboard - Fulfilled", action.payload);
      })
      .addCase(fetchDdrLeaderboard.rejected, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardError = action.payload;
        console.log("fetchDdrLeaderboard - Rejected:", action.payload);
      });
  },
});

// Export actions and selectors
export const { clearLeaderboard } = ddrSlice.actions;

export const selectDdrLeaderboard = (state) => state.ddr.leaderboard;
export const selectDdrLeaderboardLoading = (state) => state.ddr.leaderboardLoading;
export const selectDdrLeaderboardError = (state) => state.ddr.leaderboardError;

export default ddrSlice.reducer;