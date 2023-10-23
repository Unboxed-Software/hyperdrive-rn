import { SimplifiedToast } from '@components/SimplifiedToast';
import { useToast } from '@gluestack-ui/themed';
import useMutationSimplified from '@hooks/useMutationSimplified';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import cloneDeep from 'lodash/cloneDeep';

import { getTransactions, updateCustomLabels } from './transactions.service';

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
      return lastPage.hasMore ? { after: lastPage.nextCursor } : undefined;
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

  const handleUpdateCustomLabels = useMutationSimplified({
    queryKey: [transactionListCacheKey],
    mutationFn: updateCustomLabels,
    invalidateOnSuccess: false,
    onMutate: ({ txId, customLabels }) => {
      const previousData = queryClient.getQueryData<MinimalTransaction[]>([transactionListCacheKey]);

      queryClient.setQueryData<MinimalTransaction[]>([transactionListCacheKey], (currentData) => {
        const labelsClone = cloneDeep(currentData);
        const label = labelsClone?.find((va) => va.id === txId);
        if (label) {
          label.customLabels = customLabels;
        }
        return labelsClone;
      });

      return { previousData };
    },
    errorMessage: 'Failed to update the Transaction.',
  });

  return {
    transactionList,
    error,
    isLoading,
    onUpdateCustomLabels: handleUpdateCustomLabels.mutate,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export { useTransactionsLoader };
