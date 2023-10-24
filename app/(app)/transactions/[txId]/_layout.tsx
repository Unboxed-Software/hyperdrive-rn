import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="labelsPicker" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}
