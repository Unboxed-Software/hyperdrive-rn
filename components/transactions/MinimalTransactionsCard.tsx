import { Box, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed';
import dayjs, { DATE_FORMAT } from '@services/dateTime';
import { Link } from 'expo-router';
import React from 'react';

import { CUSTOM_LABEL_OPTIONS } from '@/services/transactions/transactions.service';
import { MinimalTransaction } from '@/types/transactions.types';

type IProps = MinimalTransaction;

const MinimalTransactionsCard: React.FC<IProps> = ({ virtualAddress, id, createdAt, customLabels }) => {
  const customLabel = CUSTOM_LABEL_OPTIONS.find((l) => l.value === customLabels[0])?.label || 'Not Labeled';
  return (
    <Box borderColor="$borderLight200" borderRadius="$lg" borderWidth="$1" mb="$4" overflow="hidden">
      <Link href={`/transactions/${id}`} asChild>
        <Pressable>
          <VStack px="$6" pt="$4" pb="$6">
            <Box mb="$3">
              <Heading fontSize="$md" mb="$0">
                Address: {virtualAddress.title}
              </Heading>
              <Text fontSize="$xs" mt="$0">
                {virtualAddress.address}
              </Text>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Heading fontSize="$md" mr="$2">
                Label:
              </Heading>
              <Text fontSize="$sm">{customLabel}</Text>
            </Box>
            <Text my="$1.5" fontSize="$xs" isTruncated>
              {dayjs(createdAt).format(DATE_FORMAT)}
            </Text>
            <Text color="$pink600">Show More...</Text>
          </VStack>
        </Pressable>
      </Link>
    </Box>
  );
};

export default MinimalTransactionsCard;
