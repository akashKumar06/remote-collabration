import { createSlice } from "@reduxjs/toolkit";
import {
  createProject,
  getProjectById,
  getUserProjects,
  updateProjectDescription,
} from "./projectThunk";

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  tasks: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getCurrentProject: (state, action) => {
      const project = state.projects.find(
        (project) => project._id === action.payload
      );
      state.currentProject = project;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET_USER_PROJECTS
      .addCase(getUserProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getUserProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE_PROJECT
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET_PROJECT_BY_ID
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE_PROJECT_DESCRIPTION
      .addCase(updateProjectDescription.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id
        );
        state.projects[index] = action.payload;
        state.currentProject = action.payload;
      })
      .addCase(updateProjectDescription.rejected, (state, action) => {
        state.error = action.payload;
      });
    // ASSIGN_TASK_TO_MEMBER
    // .addCase()
    // .addCase()
    // .addCase();
  },
});

export const { getCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
