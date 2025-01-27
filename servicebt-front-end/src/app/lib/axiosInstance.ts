// src/lib/axiosInstance.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://service-bhutan-api.onrender.com/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
