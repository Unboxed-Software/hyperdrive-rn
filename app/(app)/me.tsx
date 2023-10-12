import { Text, View } from '@components/Themed';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { Image, StyleSheet } from 'react-native';

import { useSession } from '../../ctx/auth';

export default function SignOut() {
  const { user, signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user && (
        <View style={styles.card}>
          {user.image && <Image source={{ uri: user.image }} style={styles.image} />}
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Name: {user.name}</Text>
          <Button
            onPress={() => {
              signOut();
            }}
          >
            <ButtonText>Sign Out</ButtonText>
          </Button>
        </View>
      )}
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
