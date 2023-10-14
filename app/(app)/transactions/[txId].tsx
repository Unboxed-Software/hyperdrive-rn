import { View } from '@components/Themed';
import CustomTransactionLabels from '@components/transactions/CustomTransactionLabels';
import { Alert, AlertIcon, AlertText, Box, Heading, InfoIcon, Spinner, Text, VStack } from '@gluestack-ui/themed';
import dayjs, { DATE_FORMAT } from '@services/dateTime';
import { useTransactionLoader } from '@services/transactions/useTransactionLoader';
import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import CustomTransactionNote from '@/components/transactions/CustomTransactionNote';

export default function Transactions() {
  const { txId } = useLocalSearchParams<{ txId: string }>();

  const { transaction, isLoading, onUpdateCustomLabels, onUpdateCustomNote } = useTransactionLoader(parseInt(txId, 10));

  if (isLoading) return <Spinner size="large" />;

  return transaction ? (
    <View style={styles.container}>
      <VStack px="$6" pt="$4" pb="$6">
        <Heading textAlign="center" mb="$7">
          Transaction from: {transaction.source}
        </Heading>
        <Box mb="$3">
          <Heading fontSize="$md" mb="$0">
            Address: {transaction.virtualAddress.title}
          </Heading>
          <Text fontSize="$xs">{transaction.virtualAddress.address}</Text>
        </Box>
        <Heading size="sm">{transaction.type}</Heading>
        <Text my="$1.5" fontSize="$xs" isTruncated>
          {transaction.description}
        </Text>
        <CustomTransactionLabels
          labels={transaction.customLabels}
          onUpdateLabels={(customLabels) => onUpdateCustomLabels({ customLabels, txId: transaction.id })}
        />
        <Text my="$1.5" fontSize="$xs">
          {dayjs(transaction.createdAt).format(DATE_FORMAT)}
        </Text>
        <Text my="$1.5" fontSize="$xs">
          {transaction.description}
        </Text>
        <CustomTransactionNote
          note={transaction.customNote}
          onUpdateNote={(note) => onUpdateCustomNote({ txId: transaction.id, customNote: note })}
        />
        <Link href={`https://explorer.solana.com/tx/${transaction.signature}`}>
          <Text color="$pink600">Find out more</Text>
        </Link>
      </VStack>
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
