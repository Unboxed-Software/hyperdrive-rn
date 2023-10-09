import { useStorageState } from '@hooks/useStorageState';
import axios from 'axios';
import { TokenResponse } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { ReactNode, useEffect, useMemo } from 'react';

import { UserType } from '@/types/user.types';

WebBrowser.maybeCompleteAuthSession();

const { EXPO_PUBLIC_IOS_GOOGLE_CLIENT_ID, EXPO_PUBLIC_ANDROID_GOOGLE_CLIENT_ID } = process.env;

if (!EXPO_PUBLIC_IOS_GOOGLE_CLIENT_ID) {
  throw new Error('please provide Google Client ID for IOS Oauth');
}

if (!EXPO_PUBLIC_ANDROID_GOOGLE_CLIENT_ID) {
  throw new Error('please provide Google Client ID for Android Oauth');
}

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  user?: UserType;
  token?: string;
  isLoading: boolean;
}>({
  signIn: () => {},
  signOut: () => {},
  isLoading: true,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: { children: ReactNode }) {
  const [_request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '520104427709-jp0dp1ph0pmf5j0vvpv0fcat8koqi7rg.apps.googleusercontent.com',
  });

  const [[isLoading, session], setSession] = useStorageState('session');

  const { user, token } = useMemo(() => {
    if (session) {
      return JSON.parse(session);
    }
    return { user: undefined, token: undefined };
  }, [session]);

  useEffect(() => {
    if (!isLoading && !session && response?.type === 'success' && response.authentication) {
      fetchSession(response.authentication);
    }
  }, [response, session, isLoading]);

  const fetchSession = async (data: TokenResponse) => {
    try {
      const res = await axios('http://localhost:3000/api/mobile-auth/google', {
        method: 'POST',
        data,
      });

      setSession(JSON.stringify(res.data));
    } catch (error: unknown) {
      // Add your own error handler here
      console.log('err', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          promptAsync();
        },
        signOut: () => {
          setSession(null);
        },
        user,
        token,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
