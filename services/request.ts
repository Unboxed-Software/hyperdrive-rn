import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type RequestOptions = Omit<AxiosRequestConfig, 'url'>;

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

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

  try {
    const res = await axios.request<T>({
      ...options,
      headers: {
        ...options?.headers,
        'x-access-token': token,
      },
      url: `${BASE_URL}/${path}`,
    });
    return res.data;
  } catch (e: unknown) {
    // we can add 3rd party loggers here
    console.error(e);
    const error = e as AxiosError;
    throw new Error(error.message);
  }
};
