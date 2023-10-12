import React from 'react';
import { ReactNode, useEffect } from 'react';
import { LogLevel, OneSignal } from 'react-native-onesignal';

const NotificationContext = React.createContext<{
  promptForNotificationAccessIfNeeded: () => Promise<void>;
  setEmail: (email: string) => void;
  setUserId: (id: string) => void;
}>({
  promptForNotificationAccessIfNeeded: () => Promise.resolve(),
  setEmail: (email: string) => {},
  setUserId: (id: string) => {},
});

// This hook can be used to access the user info.
export function useNotifications() {
  return React.useContext(NotificationContext);
}

export function NotificationProvider(props: { children: ReactNode }) {
  useEffect(() => {
    initializeOneSignal();
  }, []);

  const initializeOneSignal = () => {
    console.log('\nInitializing OneSignal\n');
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // OneSignal Initialization
    OneSignal.initialize('65d8f7ae-8eb7-4ed1-ac06-4683f3bc44eb');

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
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
