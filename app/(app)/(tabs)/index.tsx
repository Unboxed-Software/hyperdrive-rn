import { useNotifications } from '@/ctx/NotificationProvider';
import MinimalTransactionsCard from '@components/transactions/MinimalTransactionsCard';
import { Box, Divider, Heading, Spinner, VStack, View, useToken } from '@gluestack-ui/themed';
import { useTransactionsLoader } from '@services/transactions/useTransactionsLoader';
import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function Transactions() {
  const { transactionList, isLoading } = useTransactionsLoader();
  const dividerColor = useToken('colors', 'trueGray700');

  const { promptForNotificationAccessIfNeeded } = useNotifications();

  useEffect(() => {
    promptForNotificationAccessIfNeeded();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <FlatList
          data={transactionList}
          renderItem={({ item }) => (
            <VStack paddingLeft="$4">
              <MinimalTransactionsCard key={item.id} {...item} />
              <Divider bgColor="$trueGray700" />
            </VStack>
          )}
          ListEmptyComponent={
            <VStack>
              <Heading
                paddingHorizontal="$4"
                textAlignVertical="center"
                textAlign="center"
                color="$textLight400"
                paddingVertical="$40"
              >
                Head to the Accounts tab to add accounts you want to track
              </Heading>
            </VStack>
          }
        />
      )}
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
