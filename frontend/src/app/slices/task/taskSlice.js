import { createSlice } from "@reduxjs/toolkit";
import { createTask, getProjectTasks } from "./taskThunk";

const initialState = {
  projectTasks: [],
  userTasks: [],
  loading: false,
  error: null,
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.projectTasks = action.payload;
      })
      .addCase(getProjectTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // CREATE_TASK
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.projectTasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
