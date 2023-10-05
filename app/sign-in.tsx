import { router } from 'expo-router';
import { useEffect } from 'react';

import { Text, View } from '../components/Themed';
import { useSession } from '../ctx/auth';

export default function SignIn() {
  const { signIn, token } = useSession();

  useEffect(() => {
    if (token) {
      router.replace('/');
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          signIn();
        }}
      >
        Sign In
      </Text>
    </View>
  );
}
