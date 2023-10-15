import { Divider, FlatList, HStack, Heading, Spinner, VStack, View } from '@gluestack-ui/themed';
import { useVirtualAddressesLoader } from '@/services/virtualAddress/useVirtualAddresses';
import { VirtualAddress } from '@/types/virtualAddress.types';
import VirtualAddressCard from '@/components/virtualAddress/VirtualAddressCard';
import CreateVirtualAddressButton from '@/components/virtualAddress/CreateVirtualAddressButton';
import { useTransactionsLoader } from '@/services/transactions/useTransactionsLoader';

export default function Accounts() {
  const { virtualAddressList, isLoading, onDelete, onToggleIsActive, onCreate } = useVirtualAddressesLoader();
  const { refetch: refetchTransactions } = useTransactionsLoader();

  const handleAddButtonPressed = (input: { fields: Pick<VirtualAddress, 'title' | 'description' | 'address'> }) => {
    onCreate(input).then(() => {
      refetchTransactions();
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <FlatList
          width="100%"
          data={virtualAddressList as VirtualAddress[]}
          renderItem={({ item }) => (
            <VStack paddingLeft="$4">
              <VirtualAddressCard
                key={item.id}
                title={item.title}
                description={item.description}
                addressText={item.address}
                isActive={item.isActive}
                onDelete={() => onDelete(item.id)}
                onToggleActive={() => onToggleIsActive({ vAddressId: item.id, currentIsActive: item.isActive })}
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