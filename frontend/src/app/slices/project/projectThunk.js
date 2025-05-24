import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const getUserProjects = createAsyncThunk(
  "project/getUserProjects",
  async (_, thunkApi) => {
    try {
      const res = await api.get("/projects");
      return res.data.projects;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.message || "Failed fetching projects"
      );
    }
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData, thunkApi) => {
    try {
      const res = await api.post("/projects", projectData);
      return res.data.project;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data?.message);
    }
  }
);

export const getProjectById = createAsyncThunk(
  "project/getProjectById",
  async (projectId, thunkApi) => {
    try {
      const res = await api.get(`/projects/${projectId}`);
      console.log(res.data);
      return res.data.project;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response.data.message || "Failed fetching project"
      );
    }
  }
);

export const updateProjectDescription = createAsyncThunk(
  "project/updateDescription",
  async (data, thunkApi) => {
    const { projectId, description } = data;
    try {
      const res = await api.patch(`/projects/${projectId}/update-description`, {
        description,
      });
      return res.data.project;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response.data.message || "Failed updating description"
      );
    }
  }
);
