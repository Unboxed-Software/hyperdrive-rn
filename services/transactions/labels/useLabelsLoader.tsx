import { useToast } from '@gluestack-ui/themed';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addCustomLabel,
  DEFAULT_TRANSACTION_LABEL_OPTIONS,
  deleteCustomLabel,
  getCustomLabels,
} from './labels.service';

import { SimplifiedToast } from '@/components/SimplifiedToast';
import useMutationSimplified from '@/hooks/useMutationSimplified';
import { CustomLabel } from '@/types/labels.types';

const customLabelsCacheKey = 'customLabels';

const useLabelsLoader = () => {
  const toast = useToast();

  const queryKey = [customLabelsCacheKey];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: getCustomLabels,
    onError: () => {
      toast.show({
        render: ({ id }) => (
          <SimplifiedToast nativeID={id} action="error" description="Failed to get your Transaction Data" />
        ),
      });
    },
  });

  const queryClient = useQueryClient();

  const handleCreateCustomLabel = useMutationSimplified({
    queryKey,
    mutationFn: addCustomLabel,
    invalidateOnSuccess: false,
    onSuccess: (createdLabel) => {
      queryClient.setQueryData<CustomLabel[]>(queryKey, (currentData) => {
        if (currentData) {
          return [createdLabel, ...currentData];
        }
        return currentData;
      });
    },
    errorMessage: 'Failed to create new Custom Label.',
  });

  const handleDeleteCustomLabel = useMutationSimplified({
    queryKey,
    mutationFn: deleteCustomLabel,
    errorMessage: 'Failed to create new Custom Label.',
  });

  return {
    defaultLabels: DEFAULT_TRANSACTION_LABEL_OPTIONS,
    customLabels: data,
    isCustomLabelsLoading: isLoading,
    customLabelsError: error ? "Couldn't get the custom labels" : '',
    onCreateCustomLabel: handleCreateCustomLabel.mutate,
    isCreatingCustomLabel: handleCreateCustomLabel.isLoading,
    onDeleteCustomLabel: handleDeleteCustomLabel.mutate,
  };
};

export { useLabelsLoader };
