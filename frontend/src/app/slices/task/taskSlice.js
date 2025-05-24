import { createSlice } from "@reduxjs/toolkit";
import { createTask, getProjectTasks, getUserTasks } from "./taskThunk";

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
      // GET_USER_TASKS
      .addCase(getUserTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.userTasks = action.payload;
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // PROJECT_TASKS
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
