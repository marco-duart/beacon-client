import axios from 'axios';
import { authStorage } from '../lib/auth-storage';
import { env } from './env';

export const UNAUTHORIZED_EVENT = 'beacon:unauthorized';

export const apiClient = axios.create({
  baseURL: env.apiUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      authStorage.clearSession();
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }
    return Promise.reject(error);
  },
);
