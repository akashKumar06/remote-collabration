import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal";
import authReducer from "./slices/auth/authSlice";
import projectReducer from "./slices/project/projectSlice";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    project: projectReducer,
  },
});
