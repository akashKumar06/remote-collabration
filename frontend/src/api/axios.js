import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URI}/api/v1`,
  withCredentials: true,
});

// let isRefreshing = false;

// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     // If 401 and this is not already a retry
//     if (err.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           // Attempt to refresh the token
//           await api.post("/users/refresh-token");
//           isRefreshing = false;

//           // Retry the original request after refresh
//           return api(originalRequest);
//         } catch (refreshErr) {
//           isRefreshing = false;

//           // Refresh failed: logout user
//           window.location.href = "/login"; // or redirect properly
//           return Promise.reject(refreshErr);
//         }
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default api;
