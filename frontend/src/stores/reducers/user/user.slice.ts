import { createSlice } from "@reduxjs/toolkit";
import type { UserI } from "../../../types/interfaces/user.interface";
import {
  signup,
  signin,
  checkAuth,
  refreshToken,
  logoutUser,
} from "./user.thunks";
import { Persistence } from "../../../utils/persistence";

interface UserState {
  user: UserI | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: Persistence.get("user") || null,
  isLoading: false,
  isAuthenticated: !!Persistence.get("user"),
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload as UserI;
        state.isAuthenticated = true;
        Persistence.set('user', action.payload);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Signin
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload as UserI;
        state.isAuthenticated = true;
        Persistence.set('user', action.payload);
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload as UserI;
        state.isAuthenticated = true;
        Persistence.set('user', action.payload);
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        Persistence.remove('user')
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
