import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  initialState: false,
  name: "modal",
  reducers: {
    toggle: (state) => !state,
  },
});

export const { toggle } = modalSlice.actions;
export default modalSlice.reducer;
