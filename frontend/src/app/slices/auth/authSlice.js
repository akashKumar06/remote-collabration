import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser, loginUser, registerUser } from "./authThunks";

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
  },
  extraReducers: (builder) => {
    builder
      // REGISTER USER
      .addCase(registerUser.pending, (state, _) => {
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
      .addCase(loginUser.pending, (state, _) => {
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
      .addCase(fetchCurrentUser.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
      });
  },
});

export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;
