import { Text, View } from '@components/Themed';
import { Spinner } from '@gluestack-ui/themed';
import { useVirtualAddressesLoader } from '@services/virtualAddress/useVirtualAddressses';
import { StyleSheet } from 'react-native';

import VirtualAddressCard from '@/components/virtualAddress/VirtualAddressCard';

export default function TabTwoScreen() {
  const { virtualAddressList, isLoading, onDelete, onToggleIsActive } = useVirtualAddressesLoader();

  if (isLoading) return <Spinner size="large" />;

  return (
    <View style={styles.container}>
      {virtualAddressList.map((v) => (
        <VirtualAddressCard
          key={v.id}
          title={v.title}
          description={v.description}
          addressText={v.address}
          isActive={v.isActive}
          onDelete={() => onDelete(v.id)}
          onToggleActive={() => onToggleIsActive({ vAddressId: v.id, currentIsActive: v.isActive })}
        />
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
