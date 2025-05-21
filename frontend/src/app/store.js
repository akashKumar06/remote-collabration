import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal";
import authReducer from "./slices/auth/authSlice";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
  },
});
