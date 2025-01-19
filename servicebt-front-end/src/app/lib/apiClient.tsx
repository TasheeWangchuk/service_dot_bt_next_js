// src/app/lib/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true  // Important for cookie handling
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // No need to manually set Authorization header as cookies are automatically sent
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/`, {
          method: 'POST',
          credentials: 'include',
        });

        return apiClient(originalRequest);
      } catch (refreshError) {
        window.location.href = '/auth/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;