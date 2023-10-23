import { Center, Spinner, Text } from '@gluestack-ui/themed';
import React from 'react';

type Props = {
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
};

const TransactionsListFooter: React.FC<Props> = ({ isFetchingNextPage, hasNextPage }) => {
  if (isFetchingNextPage) {
    return (
      <Center>
        <Spinner size="large" />
      </Center>
    );
  }

  if (!hasNextPage) {
    return (
      <Center>
        <Text>You are all caught up!</Text>
      </Center>
    );
  }

  return null;
};

export default TransactionsListFooter;
