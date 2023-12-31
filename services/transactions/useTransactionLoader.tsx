import { SimplifiedToast } from '@components/SimplifiedToast';
import { useToast } from '@gluestack-ui/themed';
import useMutationSimplified from '@hooks/useMutationSimplified';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getTransactionById, updateCustomNote, updateLabel } from './transactions.service';
import { transactionListCacheKey } from './useTransactionsLoader';

import { Transaction } from '@/types/transactions.types';

const useTransactionLoader = (txId: Transaction['id']) => {
  const toast = useToast();

  const queryKey = [transactionListCacheKey, txId];

  const {
    data: transaction,
    error,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn: () => getTransactionById(txId),
    cacheTime: 0,
    onError: () => {
      toast.show({
        render: ({ id }) => (
          <SimplifiedToast nativeID={id} action="error" description="Failed to get your Transaction Data" />
        ),
      });
    },
  });

  const queryClient = useQueryClient();

  const handleUpdateTransactionLabel = useMutationSimplified({
    queryKey: [transactionListCacheKey, txId],
    mutationFn: updateLabel,
    invalidateOnSuccess: false,
    onMutate: ({ labelTitle, labelId }) => {
      const previousData = queryClient.getQueryData<Transaction>(queryKey);

      queryClient.setQueryData<Transaction>(queryKey, (currentData) => {
        if (currentData) {
          return {
            ...currentData,
            label: labelId ? { id: labelId, title: labelTitle } : null,
          };
        }
        return currentData;
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [transactionListCacheKey] });
    },
    errorMessage: 'Failed to update the Transaction.',
  });

  const handleUpdateCustomNote = useMutationSimplified({
    queryKey: [transactionListCacheKey, txId],
    mutationFn: updateCustomNote,
    invalidateOnSuccess: false,
    onMutate: ({ customNote }) => {
      const previousData = queryClient.getQueryData<Transaction>(queryKey);

      queryClient.setQueryData<Transaction>(queryKey, (currentData) => {
        if (currentData) {
          return { ...currentData, customNote };
        }
        return currentData;
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [transactionListCacheKey] });
    },
    errorMessage: 'Failed to update the Transaction.',
  });

  return {
    transaction,
    error,
    isLoading,
    onUpdateTransactionLabel: handleUpdateTransactionLabel.mutate,
    isUpdatingLabel: handleUpdateTransactionLabel.isLoading,
    onUpdateCustomNote: handleUpdateCustomNote.mutate,
  };
};

export { useTransactionLoader };
