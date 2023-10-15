import CustomTransactionLabels from '@components/transactions/CustomTransactionLabels';
import {
  Alert,
  AlertIcon,
  AlertText,
  Heading,
  InfoIcon,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
  Divider,
  Box,
} from '@gluestack-ui/themed';
import dayjs, { DATE_FORMAT } from '@services/dateTime';
import { useTransactionLoader } from '@services/transactions/useTransactionLoader';
import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { replaceSolanaAddressesWithTruncated } from '@/utils/addresses';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';

import CustomTransactionNote from '@/components/transactions/CustomTransactionNote';

export default function Transactions() {
  const { txId } = useLocalSearchParams<{ txId: string }>();

  const { transaction, isLoading, onUpdateCustomLabels, onUpdateCustomNote } = useTransactionLoader(parseInt(txId, 10));

  if (isLoading)
    return (
      <View flex={1} justifyContent="center">
        <Spinner size="large" />
      </View>
    );

  return transaction ? (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{ width: '100%' }}>
        <ScrollView>
          <VStack paddingStart="$4">
            <Heading color="$textLight100" textAlign="center" paddingHorizontal="$4">
              Transaction {truncateMiddle(transaction.signature)}
            </Heading>
            <Heading textAlign="center" color="$textLight200" size="md" paddingHorizontal="$4" pb="$8">
              {dayjs(transaction.createdAt).format(DATE_FORMAT)}
            </Heading>
            <Text color="$textLight400" bold fontSize="$sm" paddingEnd="$4">
              Account:
            </Text>
            <Heading color="$textLight100" size="sm" pb="$2" paddingEnd="$4">
              {transaction.virtualAddress.title} (
              {replaceSolanaAddressesWithTruncated(transaction.virtualAddress.address)})
            </Heading>
            <Divider bgColor="$trueGray700" />
            <Text color="$textLight400" bold fontSize="$sm" pt="$2" paddingEnd="$4">
              Description:
            </Text>
            <Heading color="$textLight100" size="sm" pb="$2" paddingEnd="$4">
              {replaceSolanaAddressesWithTruncated(
                transaction.description.replace(
                  transaction.virtualAddress.address,
                  `'${transaction.virtualAddress.title}'`,
                ),
              )}
            </Heading>
            <Divider bgColor="$trueGray700" />
            <Text color="$textLight400" bold fontSize="$sm" paddingEnd="$4">
              Transaction type:
            </Text>
            <Heading color="$textLight100" size="sm" pb="$2" paddingEnd="$4">
              {transaction.type}
            </Heading>
            <Divider bgColor="$trueGray700" />

            <Text color="$textLight400" bold fontSize="$sm" paddingEnd="$4" pt="$2">
              Label:
            </Text>
            <CustomTransactionLabels
              labels={transaction.customLabels}
              onUpdateLabels={(customLabels) => onUpdateCustomLabels({ customLabels, txId: transaction.id })}
            />
            <Divider bgColor="$trueGray700" />
            <Text color="$textLight400" bold fontSize="$sm" paddingEnd="$4" pt="$2">
              Notes:
            </Text>
            <Box paddingEnd="$2" paddingVertical="$2">
              <CustomTransactionNote
                note={transaction.customNote}
                onUpdateNote={(note) => onUpdateCustomNote({ txId: transaction.id, customNote: note })}
              />
            </Box>
            <Divider bgColor="$trueGray700" />
            <Box paddingEnd="$4" paddingVertical="$2">
              <Link href={`https://explorer.solana.com/tx/${transaction.signature}`}>
                <Text flexGrow={1} textAlign="right" color="$pink600">
                  View transaction on explorer
                </Text>
              </Link>
            </Box>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
