/**
 * @file apiClient.tsx
 * @description This file contains the configuration and setup for the Axios API client used in the servicebt-front-end application.
 * It also includes request and response interceptors for handling authentication tokens and refreshing tokens when necessary.
 */

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://service-bhutan-api-o2oc.onrender.com',
  withCredentials: true
});

// Request interceptor
apiClient.interceptors.request.use(

  (config) => {
    const tokens = localStorage.getItem('tokens');
    
    if (tokens) {
      try {
        const { access } = JSON.parse(tokens);
        if (access) {
          config.headers.Authorization = `Bearer ${access}`;
        }
      } catch (error) {
        console.error('Failed to parse tokens:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await fetch(`https://service-bhutan-api-o2oc.onrender.com/api/v1/auth/refresh/`, {

          method: 'POST',
          credentials: 'include',
        });

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh Token Error:', refreshError);
        window.location.href = '/Auth/SignIn';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const initiatePasswordReset = async (email: string) => {
  try {
    const response = await apiClient.post('/api/auth/password-reset/', { email });
    return response.data;
  } catch (error) {
    console.error('Password reset initiation failed:', error);
    throw error;
  }
};

export const confirmPasswordReset = async (token: string, newPassword: string) => {
  try {
    const response = await apiClient.post('/api/auth/password-reset/confirm/', {
      token,
      password: newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Password reset confirmation failed:', error);
    throw error;
  }
};

export default apiClient;
