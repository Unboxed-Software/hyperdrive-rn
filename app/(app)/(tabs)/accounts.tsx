import { Divider, FlatList, Heading, HStack, Spinner, View, VStack } from '@gluestack-ui/themed';

import CreateVirtualAddressButton from '@/components/virtualAddress/CreateVirtualAddressButton';
import VirtualAddressCard from '@/components/virtualAddress/VirtualAddressCard';
import { useVirtualAddressesLoader } from '@/services/virtualAddress/useVirtualAddresses';

export default function Accounts() {
  const { virtualAddressList, isLoading, onDelete, onToggleIsActive, onCreate, onEdit } = useVirtualAddressesLoader();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <FlatList
          width="100%"
          data={virtualAddressList}
          renderItem={({ item }: any) => (
            <VStack paddingLeft="$4">
              <VirtualAddressCard
                key={item.id}
                title={item.title}
                description={item.description}
                addressText={item.address}
                isActive={item.isActive}
                onDelete={() => onDelete(item.id)}
                onToggleActive={() =>
                  onToggleIsActive({
                    vAddressId: item.id,
                    currentIsActive: item.isActive,
                  })
                }
                onEdit={({ fields }) => onEdit({ id: item.id, fields })}
              />
              <Divider bgColor="$trueGray700" />
            </VStack>
          )}
          ListEmptyComponent={
            <Heading
              paddingHorizontal="$4"
              textAlignVertical="center"
              textAlign="center"
              color="$textLight400"
              paddingVertical="$40"
            >
              Add a Solana account to get started
            </Heading>
          }
          ListFooterComponent={
            <HStack padding="$3" style={{ alignSelf: 'center' }}>
              <CreateVirtualAddressButton onCreate={onCreate} />
            </HStack>
          }
        />
      )}
    </View>
  );
}
