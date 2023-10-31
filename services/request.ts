import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type RequestOptions = Omit<AxiosRequestConfig, 'url'>;

const DEFAULT_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
export const BASE_URL_STORAGE_KEY = 'baseUrl';

export const BASE_URL_OPTIONS = {
  production: 'Production',
  testing: 'Testing',
  local: 'Local',
} as const;

const getBaseUrl = async () => {
  let baseUrl: string | undefined | null = DEFAULT_BASE_URL;
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        baseUrl = localStorage.getItem(BASE_URL_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    baseUrl = await SecureStore.getItemAsync(BASE_URL_STORAGE_KEY);
  }

  if (baseUrl === BASE_URL_OPTIONS.local) return 'http://localhost:3000/api';

  if (baseUrl === BASE_URL_OPTIONS.testing) {
    return 'https://testing-hyperdrive.vercel.app/api';
  }

  if (baseUrl === BASE_URL_OPTIONS.production) {
    return 'https://hyperdrive-project.vercel.app/api';
  }

  if (baseUrl?.startsWith('http')) return baseUrl;

  return DEFAULT_BASE_URL;
};

const getToken = async () => {
  let sessionString: string | null = null;

  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        sessionString = localStorage.getItem('session');
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    sessionString = await SecureStore.getItemAsync('session');
  }
  if (sessionString) {
    const session = JSON.parse(sessionString) as { token: string };
    return session.token;
  }
};

export const request = async <T>(path: string, options?: RequestOptions) => {
  const token = await getToken();
  const baseURL = await getBaseUrl();

  try {
    const res = await axios.request<T>({
      ...options,
      headers: {
        ...options?.headers,
        'x-access-token': token,
      },
      url: `${baseURL}/${path}`,
    });
    return res.data;
  } catch (e: unknown) {
    // we can add 3rd party loggers here
    console.error(e);
    const error = e as AxiosError;
    throw new Error(error.message);
  }
};
