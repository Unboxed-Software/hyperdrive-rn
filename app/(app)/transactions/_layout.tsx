import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="[txId]" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}
