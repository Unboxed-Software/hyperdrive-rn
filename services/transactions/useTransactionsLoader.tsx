import { SimplifiedToast } from '@components/SimplifiedToast';
import { useToast } from '@gluestack-ui/themed';
import useMutationSimplified from '@hooks/useMutationSimplified';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import cloneDeep from 'lodash/cloneDeep';

import { getTransactions, updateLabel } from './transactions.service';

import { MinimalTransaction } from '@/types/transactions.types';

export const transactionListCacheKey = 'transactions';

const useTransactionsLoader = () => {
  const toast = useToast();

  const {
    data: transactionList,
    error,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [transactionListCacheKey],
    queryFn: getTransactions,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore
        ? {
            after_id: lastPage.nextCursor.id,
            after_timestamp: lastPage.nextCursor.timestamp,
          }
        : undefined;
    },
    onError: () => {
      toast.show({
        render: ({ id }) => (
          <SimplifiedToast nativeID={id} action="error" description="Failed to get your Transactions." />
        ),
      });
    },
  });

  const queryClient = useQueryClient();

  const handleUpdateLabel = useMutationSimplified({
    queryKey: [transactionListCacheKey],
    mutationFn: updateLabel,
    invalidateOnSuccess: false,
    onMutate: ({ txId, labelId, labelTitle }) => {
      const previousData = queryClient.getQueryData<MinimalTransaction[]>([transactionListCacheKey]);

      queryClient.setQueryData<MinimalTransaction[]>([transactionListCacheKey], (currentData) => {
        const transactionsCloned = cloneDeep(currentData);
        const transaction = transactionsCloned?.find((va) => va.id === txId);
        if (transaction) {
          transaction.Label = { id: labelId, title: labelTitle };
        }
        return transactionsCloned;
      });

      return { previousData };
    },
    errorMessage: 'Failed to update the Transaction.',
  });

  return {
    transactionList,
    error,
    isLoading,
    onUpdateLabels: handleUpdateLabel.mutate,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export { useTransactionsLoader };
