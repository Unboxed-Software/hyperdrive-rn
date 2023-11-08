import { Badge, BadgeText, Heading, HStack, Pressable, Text, View, VStack } from '@gluestack-ui/themed';
import dayjs, { DATE_FORMAT } from '@services/dateTime';
import { Link } from 'expo-router';
import React from 'react';

import { useAliases } from '@/services/aliases/useAliases';
import { MinimalTransaction } from '@/types/transactions.types';

type IProps = MinimalTransaction;

const MinimalTransactionsCard: React.FC<IProps> = ({ virtualAddress, id, timestamp, label, description }) => {
  const { replaceSolanaAddressesWithAliasOrTruncate } = useAliases();
  return (
    <Link href={`/transactions/${id}`} asChild>
      <Pressable>
        <VStack paddingEnd="$4" paddingVertical="$2">
          <Heading fontSize="$md" color="$textLight300">
            {virtualAddress.title}
          </Heading>
          <HStack paddingVertical="$2">
            {label ? (
              <Badge action="success" flexGrow={0}>
                <BadgeText>{label.title}</BadgeText>
              </Badge>
            ) : (
              <Badge action="error">
                <BadgeText>Not Labeled</BadgeText>
              </Badge>
            )}
          </HStack>
          <View>{description && replaceSolanaAddressesWithAliasOrTruncate(description)}</View>
          <Text pt="$1" fontSize="$xs" color="$textLight400">
            {dayjs.unix(timestamp).format(DATE_FORMAT)}
          </Text>
        </VStack>
      </Pressable>
    </Link>
  );
};

export default MinimalTransactionsCard;
