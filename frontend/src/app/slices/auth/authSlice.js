import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./authThunks";

const initialState = {
  user: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  fieldErrors: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.fieldErrors = {};
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.fieldErrors = {};
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.fieldErrors = {};
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || null;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })
      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.fieldErrors = {};
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || null;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })
      // FETCH_CURRENT_USER
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      })
      // LOGOUT_USER
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { clearErrors, logout } = authSlice.actions;
export default authSlice.reducer;
