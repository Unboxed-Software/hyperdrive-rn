import { useRouter } from 'expo-router';
import React, { ReactNode, useEffect } from 'react';
import { LogLevel, OneSignal } from 'react-native-onesignal';

const NotificationContext = React.createContext<{
  promptForNotificationAccessIfNeeded: () => Promise<void>;
  setEmail: (_email: string) => void;
  setUserId: (_id: string) => void;
}>({
  promptForNotificationAccessIfNeeded: () => Promise.resolve(),
  setEmail: (_email: string) => {},
  setUserId: (_id: string) => {},
});

export function useNotifications() {
  return React.useContext(NotificationContext);
}

export function NotificationProvider(props: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    initializeOneSignal();
  }, []);

  const initializeOneSignal = () => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize('65d8f7ae-8eb7-4ed1-ac06-4683f3bc44eb');

    OneSignal.Notifications.addEventListener('click', (event) => {
      if (event?.notification?.additionalData) {
        const { txId } = event.notification.additionalData as { txId: string };
        if (txId) router.push(`/transactions/${txId}`);
      }
    });
  };

  const promptForNotificationAccessIfNeeded = async () => {
    if (!OneSignal.Notifications.hasPermission()) {
      OneSignal.InAppMessages.addTrigger('requestPermission', 'true');
    }
  };

  const setEmail = (email: string) => {
    OneSignal.User.addEmail(email);
  };

  const setUserId = (id: string) => {
    OneSignal.login(id);
  };

  return (
    <NotificationContext.Provider
      value={{
        promptForNotificationAccessIfNeeded,
        setEmail,
        setUserId,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
}
