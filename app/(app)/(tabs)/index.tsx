import { useNotifications } from '@/ctx/NotificationProvider';
import { View } from '@components/Themed';
import MinimalTransactionsCard from '@components/transactions/MinimalTransactionsCard';
import { Box, Spinner } from '@gluestack-ui/themed';
import { useTransactionsLoader } from '@services/transactions/useTransactionsLoader';
import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function Transactions() {
  const { transactionList, isLoading } = useTransactionsLoader();

  const { promptForNotificationAccessIfNeeded } = useNotifications();

  useEffect(() => {
    promptForNotificationAccessIfNeeded();
  }, []);

  if (isLoading) return <Spinner size="large" />;

  return (
    <View style={styles.container}>
      <Box padding="$3">
        <FlatList
          data={transactionList}
          renderItem={({ item }) => <MinimalTransactionsCard key={item.id} {...item} />}
        />
      </Box>
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
