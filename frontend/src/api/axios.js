import axios from "axios";
// import { store } from "../app/store";
// import { logoutUser } from "../app/slices/auth/authThunks";
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and not retrying already
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.get("/users/refresh-token");
        // Optionally: update tokens if stored anywhere (like localStorage)
        return api(originalRequest); // retry original request
      } catch (refreshError) {
        // dispatch(logoutUser()); // clear Redux state
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
