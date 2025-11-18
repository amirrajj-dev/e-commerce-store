import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SignInDto, SignUpDto } from "../../../utils/dtos";
import { authApi } from "../../../utils/api";
import api from "../../../utils/axios";

export const signup = createAsyncThunk(
  "user/signup",
  async (userData: SignUpDto, { rejectWithValue }) => {
    try {
      const response = await authApi.signup(api, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);

export const signin = createAsyncThunk(
  "user/signin",
  async (credentials: SignInDto, { rejectWithValue }) => {
    try {
      const response = await authApi.signin(api, credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Signin failed"
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getProfile(api);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Authentication check failed"
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.refreshToken(api);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Token refresh failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout(api);
      return;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);