import { StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';

export default function TabTwoScreen() {
  // TODO: move the logic into a separated hook
  // const getTransactions = async () => {
  //   const token = await AsyncStorage.getItem('@token');
  //   try {
  //     const response = await axios('http://localhost:3000/api/me/transactions', {
  //       headers: {
  //         'x-access-token': token,
  //       },
  //     });
  //
  //     console.log('trans', response.data);
  //   } catch (error: any) {
  //     // Add your own error handler here
  //     console.log('err', error.message);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
