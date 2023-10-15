import { Button, ButtonText, VStack, Text, View, SectionList } from '@gluestack-ui/themed';
import { Image, StyleSheet } from 'react-native';

import { useSession } from '../../../ctx/auth';
import { useMemo } from 'react';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
