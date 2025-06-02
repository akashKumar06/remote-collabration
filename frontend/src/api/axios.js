import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URI}/api/v1`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("💥💥💥error💥💥💥");
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.post("/users/refresh-token");
        console.log(res);
        return api(originalRequest);
      } catch (refreshError) {
        await api.post("/logout");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
