import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import { useSession } from '../ctx/auth';
import { Heading, Spinner, VStack, View } from '@gluestack-ui/themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  const { signIn, token } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      router.replace('/');
    }
  });

  const handleSignIn = async () => {
    setLoading(true);
    await signIn();
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#001F1E' }}>
      <SafeAreaView>
        <VStack alignItems="center" padding="$8">
          <Heading size="5xl" textAlign="center" paddingTop="$32" color="$textLight0">
            Clio
          </Heading>
          <Heading size="md" textAlign="center" color="$textLight100" paddingBottom="$24">
            Manage Solana transactions on the go
          </Heading>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <VStack alignItems="center" space="4xl">
              <FontAwesome.Button name="google" onPress={() => handleSignIn()}>
                Sign in with Google
              </FontAwesome.Button>
            </VStack>
          )}
        </VStack>
      </SafeAreaView>
    </View>
  );
}
