import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';

import { useSession } from '../../ctx/auth';

export default function AppLayout() {
  const { token, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="transactions" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="me" options={{ presentation: 'modal', headerTitle: 'User Profile' }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
