import axios from "axios";
import { logout } from "../app/slices/auth/authSlice";
import { store } from "../app/store";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URI}/api/v1`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("💥💥💥 Interceptor error 💥💥💥");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/users/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        // Refresh the access token via cookie (httpOnly)
        await api.post("/users/refresh-token");

        // Retry the original request (cookies will be sent automatically)
        return api(originalRequest);
      } catch (refreshError) {
        // Optionally logout on failure
        // await api.post("/users/logout");
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
