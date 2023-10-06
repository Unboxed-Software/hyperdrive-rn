import { useToast } from '@gluestack-ui/themed';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import cloneDeep from 'lodash/cloneDeep';

import { getTransactions, updateCustomLabels } from './transactions.service';
import { SimplifiedToast } from '../../components/SimplifiedToast';
import useMutationSimplified from '../../hooks/useMutationSimplified';
import { MinimalTransaction } from '../../types/transactions.types';

const transactionsCacheKey = 'transactions';

const useTransactionLoader = () => {
  const toast = useToast();

  const {
    data: transactionList,
    error,
    isLoading,
  } = useQuery({
    queryKey: [transactionsCacheKey],
    queryFn: getTransactions,
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
    cacheKey: transactionsCacheKey,
    mutationFn: updateCustomLabels,
    invalidateOnSuccess: false,
    onMutate: ({ txId, customLabels }) => {
      const previousData = queryClient.getQueryData<MinimalTransaction[]>([transactionsCacheKey]);

      queryClient.setQueryData<MinimalTransaction[]>([transactionsCacheKey], (currentData) => {
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
    transactionList: transactionList || [],
    error,
    isLoading,
    onUpdateCustomLabels: handleUpdateCustomLabels.mutate,
  };
};

export { useTransactionLoader };
