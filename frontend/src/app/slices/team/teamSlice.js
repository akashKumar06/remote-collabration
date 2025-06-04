import { createSlice } from "@reduxjs/toolkit";
import { createTeam } from "./teamThunk";

const initialState = {
  teams: [],
  currentTeam: null,
  error: null,
  isCreating: false,
};
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.isCreating = false;
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
