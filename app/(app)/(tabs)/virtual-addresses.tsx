import { Heading, Spinner } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { useVirtualAddressesLoader } from '../../../services/virtualAddress/useVirtualAddressses';

export default function TabTwoScreen() {
  const { virtualAddressList, isLoading, error, onCreate, onDelete, onToggleIsActive } = useVirtualAddressesLoader();

  if (isLoading) return <Spinner size="large" />;

  return (
    <View style={styles.container}>
      {virtualAddressList.map((v) => (
        <View style={{ margin: 10 }} key={v.id}>
          <Text style={styles.title}>{v.title}</Text>
          <Text>{v.address}</Text>
        </View>
      ))}
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
});
