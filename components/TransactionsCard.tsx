import { Box, Heading, Text, VStack } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { MinimalTransaction } from '../types/transactions.types';

type IProps = MinimalTransaction;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TransactionsCard: React.FC<IProps> = ({
  virtualAddress,
  type,
  id,
  description,
  fee,
  source,
  feePayer,
  createdAt,
  customLabels,
  signeture,
}) => {
  return (
    <Box borderColor="$borderLight200" borderRadius="$lg" borderWidth="$1" mb="$4" overflow="hidden">
      <VStack px="$6" pt="$4" pb="$6">
        <Text fontSize="$sm" my="$1.5">
          {virtualAddress.title}
        </Text>
        <Text fontSize="$sm" my="$1.5">
          {virtualAddress.address}
        </Text>
        <Heading size="sm">{type}</Heading>
        <Text my="$1.5" fontSize="$xs" isTruncated>
          {description}
        </Text>
        <Text my="$1.5" fontSize="$xs" isTruncated>
          {createdAt.toString()}
        </Text>
        <Link href={`https://explorer.solana.com/tx/${signeture}`}>
          <Text color="$pink600">Find out more</Text>
        </Link>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({});

export default TransactionsCard;
