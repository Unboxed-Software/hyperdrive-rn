import { useToast } from '@gluestack-ui/themed';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';

import { addLabel, deleteLabel, getLabels } from './labels.service';

import { SimplifiedToast } from '@/components/SimplifiedToast';
import useMutationSimplified from '@/hooks/useMutationSimplified';
import { LabelsCacheType } from '@/types/labels.types';

const labelsCacheKey = 'labels';

const useLabelsLoader = () => {
  const toast = useToast();

  const queryKey = [labelsCacheKey];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: getLabels,
    onError: () => {
      toast.show({
        render: ({ id }) => (
          <SimplifiedToast nativeID={id} action="error" description="Failed to get your Transaction Data" />
        ),
      });
    },
  });

  const queryClient = useQueryClient();

  const handleCreateLabel = useMutationSimplified({
    queryKey,
    mutationFn: addLabel,
    invalidateOnSuccess: false,
    onSuccess: (createdLabel) => {
      queryClient.setQueryData<LabelsCacheType>(queryKey, (currentData) => {
        if (currentData) {
          const clone = cloneDeep(currentData);
          clone?.userLabels.unshift(createdLabel);
          return clone;
        }
        return currentData;
      });
    },
    errorMessage: 'Failed to create new Label.',
  });

  const handleDeleteLabel = useMutationSimplified({
    queryKey,
    mutationFn: deleteLabel,
    errorMessage: 'Failed to delete the Label.',
  });

  return {
    defaultLabels: data?.defaultLabelGroups,
    userLabels: data?.userLabels,
    isLoading,
    labelsError: error ? "Couldn't get the labels" : '',
    onCreateLabel: handleCreateLabel.mutate,
    isCreatingLabel: handleCreateLabel.isLoading,
    onDeleteLabel: handleDeleteLabel.mutate,
  };
};

export { useLabelsLoader };
