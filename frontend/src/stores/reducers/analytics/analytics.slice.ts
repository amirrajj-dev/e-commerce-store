import { createSlice } from "@reduxjs/toolkit";
import type { AnalyticsI } from "../../../types/interfaces/analytics.interface";
import { getAnalytics } from "./analytics.thunks";

interface AnalyticsState {
  data: AnalyticsI | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: string | null;
}

const initialState: AnalyticsState = {
  data: null,
  isLoading: false,
  error: null,
  lastFetched: null,
};

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    clearAnalyticsError: (state) => {
      state.error = null;
    },
    clearAnalyticsData: (state) => {
      state.data = null;
      state.lastFetched = null;
    },
    setLastFetched: (state, action) => {
      state.lastFetched = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Analytics
      .addCase(getAnalytics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload as AnalyticsI;
        state.lastFetched = new Date().toISOString();
        state.error = null;
      })
      .addCase(getAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAnalyticsError, clearAnalyticsData, setLastFetched } = analyticsSlice.actions;
export default analyticsSlice.reducer;