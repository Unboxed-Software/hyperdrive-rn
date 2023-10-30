import { useStorageState } from '@hooks/useStorageState';
import { request } from '@services/request';
import { TokenResponse } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { useNotifications } from './NotificationProvider';

import { UserType } from '@/types/user.types';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = React.createContext<{
  signIn: () => Promise<void>;
  signOut: () => void;
  user?: UserType;
  token?: string;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(),
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
  // eslint-disable-next-line no-unused-vars
  const [_request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_GOOGLE_CLIENT_ID,
  });

  const [[isStorageLoading, session], setSession] = useStorageState('session');
  const [shouldFetchSession, setShouldFetchSession] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { setEmail, setLoggedInUser } = useNotifications();

  const { user, token } = useMemo(() => {
    if (session) {
      const parsed = JSON.parse(session);
      if (parsed.user as UserType) {
        setEmail(parsed.user.email);
        setLoggedInUser(parsed.user.id.toString());
      }

      return parsed;
    } else {
      // When a session is removed it usually triggers another call to
      // `fetchSession` but we want to skip that
      setShouldFetchSession(false);
      return { user: undefined, token: undefined };
    }
  }, [session, setEmail, setLoggedInUser]);

  useEffect(() => {
    // When a session is removed it usually triggers another call to
    // `fetchSession` but we want to skip that only one time
    if (!shouldFetchSession) {
      setShouldFetchSession(true);
      return;
    }

    if (!isLoading && !session && response?.type === 'success' && response.authentication) {
      fetchSession(response.authentication).then(() => {
        setShouldFetchSession(false);
      });
    }
  }, [response, session, isStorageLoading]);

  const fetchSession = async (data: TokenResponse) => {
    setIsLoading(true);
    try {
      const res = await request('mobile-auth/google', {
        method: 'POST',
        data,
      });

      setSession(JSON.stringify(res));
    } catch (error: unknown) {
      // Add your own error handler here
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          await promptAsync();
        },
        signOut: () => {
          setLoggedInUser(null);
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
