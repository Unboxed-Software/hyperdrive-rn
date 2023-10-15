import CustomTransactionLabels from '@components/transactions/CustomTransactionLabels';
import {
  Alert,
  AlertIcon,
  AlertText,
  Box,
  Heading,
  InfoIcon,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import dayjs, { DATE_FORMAT } from '@services/dateTime';
import { useTransactionLoader } from '@services/transactions/useTransactionLoader';
import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { replaceSolanaAddressesWithTruncated } from '@/utils/addresses';

import CustomTransactionNote from '@/components/transactions/CustomTransactionNote';

export default function Transactions() {
  const { txId } = useLocalSearchParams<{ txId: string }>();

  const { transaction, isLoading, onUpdateCustomLabels, onUpdateCustomNote } = useTransactionLoader(parseInt(txId, 10));

  if (isLoading)
    return (
      <View justifyContent="center" style={styles.container}>
        <Spinner size="large" />
      </View>
    );

  return transaction ? (
    <View style={styles.container}>
      <ScrollView>
        <VStack px="$6" paddingVertical="$8" pb="$6">
          <Heading color="$textLight100" textAlign="center">
            Transaction {truncateMiddle(transaction.signature)}
          </Heading>
          <Heading textAlign="center" color="$textLight200" size="md" my="$1.5" pb="$6">
            {dayjs(transaction.createdAt).format(DATE_FORMAT)}
          </Heading>
          <Heading color="$textLight100" fontSize="$md" mb="$0">
            Relevant Account: {transaction.virtualAddress.title} (
            {replaceSolanaAddressesWithTruncated(transaction.virtualAddress.address)})
          </Heading>
          <Heading color="$textLight100" fontSize="$md" mb="$0">
            Transaction type: {transaction.type}
          </Heading>
          <Heading color="$textLight100" fontSize="$md" mb="$0">
            Description:
            {replaceSolanaAddressesWithTruncated(transaction.description)}
          </Heading>
          <Link href={`https://explorer.solana.com/tx/${transaction.signature}`}>
            <Text color="$pink600">View transaction on explorer</Text>
          </Link>

          <CustomTransactionLabels
            labels={transaction.customLabels}
            onUpdateLabels={(customLabels) => onUpdateCustomLabels({ customLabels, txId: transaction.id })}
          />

          <CustomTransactionNote
            note={transaction.customNote}
            onUpdateNote={(note) => onUpdateCustomNote({ txId: transaction.id, customNote: note })}
          />
        </VStack>
      </ScrollView>
    </View>
  ) : (
    <Alert mx="$2.5" action="error" variant="solid">
      <AlertIcon as={InfoIcon} mr="$3" />
      <AlertText>Something Went Wrong while getting the transaction</AlertText>
    </Alert>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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

function truncateMiddle(text: string): string {
  const length = text.length;
  const firstHalf = text.slice(0, 4);
  const secondHalf = text.slice(-4);
  return `${firstHalf}...${secondHalf}`;
}
