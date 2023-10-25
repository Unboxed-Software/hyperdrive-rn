import { Badge, BadgeText, Heading, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import dayjs, { DATE_FORMAT } from '@services/dateTime';
import { Link } from 'expo-router';
import React from 'react';

import { MinimalTransaction } from '@/types/transactions.types';
import { replaceSolanaAddressesWithTruncated } from '@/utils/addresses';

type IProps = MinimalTransaction;

const MinimalTransactionsCard: React.FC<IProps> = ({ virtualAddress, id, createdAt, labels, description }) => {
  return (
    <Link href={`/transactions/${id}`} asChild>
      <Pressable>
        <VStack paddingEnd="$4" paddingVertical="$2">
          <Heading fontSize="$md" color="$textLight300">
            {virtualAddress.title}
          </Heading>
          <HStack paddingVertical="$2">
            {labels[0] ? (
              <Badge action="success" flexGrow={0}>
                <BadgeText>{labels[0]}</BadgeText>
              </Badge>
            ) : (
              <Badge action="error">
                <BadgeText>Not Labeled</BadgeText>
              </Badge>
            )}
          </HStack>
          <Text color="$textLight400">
            {description &&
              replaceSolanaAddressesWithTruncated(
                description.replace(virtualAddress.address, `'${virtualAddress.title}'`),
              )}
          </Text>
          <Text pt="$1" fontSize="$xs" color="$textLight400">
            {dayjs(createdAt).format(DATE_FORMAT)}
          </Text>
        </VStack>
      </Pressable>
    </Link>
  );
};

export default MinimalTransactionsCard;
