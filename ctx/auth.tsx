import { useStorageState } from '@hooks/useStorageState';
import { request } from '@services/request';
import { TokenResponse } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { ReactNode, useEffect, useMemo } from 'react';

import { UserType } from '@/types/user.types';

WebBrowser.maybeCompleteAuthSession();

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
      const res = await request('mobile-auth/google', {
        method: 'POST',
        data,
      });

      setSession(JSON.stringify(res));
    } catch (error: unknown) {
      // Add your own error handler here
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
