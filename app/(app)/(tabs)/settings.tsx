import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  Center,
  Divider,
  Heading,
  Pressable,
  Spinner,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import useCurrentUserLoader from '@services/user/useCurrentUserLoader';
import { Link } from 'expo-router';

import { useSession } from '../../../ctx/auth';

import SolanaExplorer from '@/components/userSettings/SolanaExplorer';

export default function Settings() {
  const { signOut, user: sessionUser } = useSession();

  const { user, isLoading, onEditSolanaExplorer } = useCurrentUserLoader();

  return (
    <VStack alignItems="center" space="md" mt="$3">
      <Avatar bgColor="$amber600" size="2xl" borderRadius="$full">
        <AvatarFallbackText>{sessionUser?.name}</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: sessionUser?.image,
          }}
        />
      </Avatar>
      <Center>
        <Heading size="xl" color="$textLight0" mb="$0">
          {sessionUser?.name}
        </Heading>
        <Text size="sm" color="$textLight200">
          {sessionUser?.email}
        </Text>
      </Center>
      <Center>
        <Button
          onPress={() => {
            signOut();
          }}
        >
          <ButtonText>Sign Out</ButtonText>
        </Button>
      </Center>

      <Link href="/aliases" asChild>
        <Pressable
          bg="$secondary800"
          width="100%"
          borderRadius="$lg"
          padding="$3"
          flexDirection="row"
          alignItems="center"
        >
          <View>
            <Text color="$textLight100" bold fontSize="$sm" paddingStart="$2" isTruncated>
              Mange Aliases
            </Text>
          </View>
        </Pressable>
      </Link>

      <Divider bg="$textDark500" w="90%" />

      {isLoading && !user ? (
        <Spinner />
      ) : (
        <SolanaExplorer value={user!.preferredSolanaExplorer} onChange={onEditSolanaExplorer} />
      )}
    </VStack>
  );
}
