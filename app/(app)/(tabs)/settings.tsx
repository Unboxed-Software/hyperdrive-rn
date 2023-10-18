import { Button, ButtonText, View } from '@gluestack-ui/themed';

import { useSession } from '../../../ctx/auth';

export default function Settings() {
  const { signOut } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={() => {
          signOut();
        }}
      >
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </View>
  );
}
