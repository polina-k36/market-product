import axios, { type AxiosRequestConfig } from 'axios';

import { env } from '@/config/env';
import { useAuthStore } from '@/stores/auth/auth.store';
import { authApi } from '@/features/auth/api/auth.api';

type AxiosRequestAuth = AxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<void> | null = null;

function refreshAccessToken(): Promise<void> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const data = await authApi.refresh(); //circular dependency создание независимого запроса тогда не нужны будут проверки

      useAuthStore.setState({
        accessToken: data.accessToken,
        user: data.user,
        status: 'authenticated',
      });
    } catch (error) {
      useAuthStore.setState({
        accessToken: null,
        user: null,
        status: 'unauthenticated',
      });

      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.setAuthorization(`Bearer ${accessToken}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest: AxiosRequestAuth = error.config;

    if (error.response?.status !== 401) return Promise.reject(error);
    if (originalRequest.url === '/auth/refresh') return Promise.reject(error);
    if (originalRequest._retry) return Promise.reject(error);

    originalRequest._retry = true;

    await refreshAccessToken();
    return api(originalRequest);
  },
);
