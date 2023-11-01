import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Heading, HStack, Pressable, Spinner, VStack } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSession } from '../ctx/auth';

import ChangeBaseUrlModal from '@/components/easterEgg/ChangeBaseUrlModal';
import { useStorageState } from '@/hooks/useStorageState';
import { BASE_URL_STORAGE_KEY } from '@/services/request';

export default function SignIn() {
  const { signIn, token } = useSession();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const [[_, activeItem], setValue] = useStorageState(BASE_URL_STORAGE_KEY);

  useEffect(() => {
    if (token) {
      router.replace('/');
    }
  });

  useEffect(() => {
    const id = setInterval(() => setCounter(0), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (counter > 4) {
      setCounter(0);

      setIsOpen(true);
    }
  }, [counter]);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn();
    setLoading(false);
  };

  const handleEasterEggPress = async () => {
    setCounter((prev) => prev + 1);
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
              <Pressable
                style={{ opacity: 0 }}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                accessible={false}
                aria-hidden
                onPress={handleEasterEggPress}
                w="$10"
                h="$10"
              />
            </VStack>
          )}
        </VStack>

        {isOpen && (
          <ChangeBaseUrlModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSelect={(item) => {
              setValue(item);
              setIsOpen(false);
            }}
            activeItem={activeItem || 'default'}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
