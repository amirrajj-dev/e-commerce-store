import { createAsyncThunk } from "@reduxjs/toolkit";
import { analyticsApi } from "../../../utils/api";
import api from "../../../utils/axios";

export const getAnalytics = createAsyncThunk(
  "analytics/getAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.getAnalytics(api);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch analytics"
      );
    }
  }
);