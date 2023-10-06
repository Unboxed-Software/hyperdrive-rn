import { Spinner } from '@gluestack-ui/themed';
import { FlatList, StyleSheet } from 'react-native';

import DebouncedInput from '../../../components/DebounceInput';
import { Text, View } from '../../../components/Themed';
import TransactionsCard from '../../../components/TransactionsCard';
import { useTransactionLoader } from '../../../services/transactions/useTransactionsLoader';

export default function Transactions() {
  const { transactionList, isLoading } = useTransactionLoader();

  if (isLoading) return <Spinner size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Page</Text>

      <FlatList data={transactionList} renderItem={({ item }) => <TransactionsCard key={item.id} {...item} />} />
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
