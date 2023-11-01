import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  Center,
  Heading,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import { useSession } from '../../../ctx/auth';

export default function Settings() {
  const { signOut, user } = useSession();

  return (
    <VStack alignItems="center" space="md" mt="$3">
      <Avatar bgColor="$amber600" size="2xl" borderRadius="$full">
        <AvatarFallbackText>{user?.name}</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: user?.image,
          }}
        />
      </Avatar>
      <Center>
        <Heading size="xl" color="$textLight0" mb="$0">
          {user?.name}
        </Heading>
        <Text size="sm" color="$textLight200">
          {user?.email}
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
    </VStack>
  );
}
