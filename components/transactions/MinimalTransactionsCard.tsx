import { Badge, BadgeText, Heading, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import dayjs, { DATE_FORMAT } from '@services/dateTime';
import { Link } from 'expo-router';
import React, { useMemo } from 'react';

import { getLabelBadge } from '@/services/transactions/transactions.service';
import { MinimalTransaction } from '@/types/transactions.types';
import { replaceSolanaAddressesWithTruncated } from '@/utils/addresses';

type IProps = MinimalTransaction;

const MinimalTransactionsCard: React.FC<IProps> = ({ virtualAddress, id, createdAt, customLabels, description }) => {
  const label = useMemo(() => {
    const currentLabel = customLabels[0];
    if (currentLabel) {
      return getLabelBadge(currentLabel);
    } else {
      return undefined;
    }
  }, [customLabels]);

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
                <BadgeText>{label}</BadgeText>
              </Badge>
            ) : (
              <Badge action="error">
                <BadgeText>Not Labeled</BadgeText>
              </Badge>
            )}
          </HStack>
          <Text color="$textLight400">
            {replaceSolanaAddressesWithTruncated(
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
