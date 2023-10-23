import MinimalTransactionsCard from '@components/transactions/MinimalTransactionsCard';
import { Divider, FlatList, Heading, Spinner, View, VStack } from '@gluestack-ui/themed';
import { useTransactionsLoader } from '@services/transactions/useTransactionsLoader';
import { useEffect } from 'react';
import { RefreshControl } from 'react-native';

import TransactionsListFooter from '@/components/transactions/TransactionsListFooter';
import { useNotifications } from '@/ctx/NotificationProvider';
import { MinimalTransaction } from '@/types/transactions.types';

export default function Transactions() {
  const { transactionList, isLoading, refetch, isRefetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useTransactionsLoader();

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
          width="100%"
          data={transactionList?.pages.flatMap((page) => page.items) || []}
          renderItem={({ item }) => (
            <VStack paddingLeft="$4">
              <MinimalTransactionsCard key={(item as MinimalTransaction).id} {...(item as MinimalTransaction)} />
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
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          ListFooterComponent={() => (
            <TransactionsListFooter isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
          )}
        />
      )}
    </View>
  );
}
