import { SimplifiedToast } from '@components/SimplifiedToast';
import { useToast } from '@gluestack-ui/themed';
import useMutationSimplified from '@hooks/useMutationSimplified';
import { useQuery } from '@tanstack/react-query';

import { createAlias, deleteAlias, editAlias, getAliases } from './aliases.service';

import { Alias } from '@/types/aliases.types';

const aliasesCacheKey = 'aliases';

const useAliasesLoader = () => {
  const toast = useToast();

  const {
    data: aliases,
    error,
    isLoading,
  } = useQuery<Alias[]>({
    queryKey: [aliasesCacheKey],
    queryFn: getAliases,
    onError: () => {
      toast.show({
        render: ({ id }) => <SimplifiedToast nativeID={id} description="Failed to get the aliases." action="error" />,
      });
    },
  });

  const createMutation = useMutationSimplified({
    queryKey: [aliasesCacheKey],
    mutationFn: createAlias,
    successMessage: 'Alias Added Successfully',
    errorMessage: 'Failed to add the Alias.',
  });

  const deleteMutation = useMutationSimplified({
    queryKey: [aliasesCacheKey],
    mutationFn: deleteAlias,
    successMessage: 'Alias Removed Successfully',
    errorMessage: 'Failed to remove your Alias.',
  });

  const editMutation = useMutationSimplified({
    queryKey: [aliasesCacheKey],
    mutationFn: editAlias,
    successMessage: 'Alias edited Successfully',
    errorMessage: 'Failed to edit your Alias.',
  });

  return {
    aliases: aliases || [],
    error,
    isLoading,
    onCreate: createMutation.mutateAsync,
    onDelete: deleteMutation.mutate,
    isDeleting: deleteMutation.isLoading,
    onEdit: editMutation.mutateAsync,
  };
};

export { useAliasesLoader };
