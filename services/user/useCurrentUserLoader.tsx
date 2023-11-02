import { SimplifiedToast } from '@components/SimplifiedToast';
import { useToast } from '@gluestack-ui/themed';
import useMutationSimplified from '@hooks/useMutationSimplified';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { editSolanaExplorer, getCurrentUser } from './user.service';

import { UserType } from '@/types/user.types';

const userCacheKey = 'currentUser';

const useCurrentUserLoader = () => {
  const toast = useToast();

  const queryKey = [userCacheKey];

  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: getCurrentUser,
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

  const handleUpdateSolanaExplorer = useMutationSimplified({
    queryKey,
    mutationFn: editSolanaExplorer,
    invalidateOnSuccess: false,
    onMutate: (newExplorer) => {
      const previousData = queryClient.getQueryData<UserType>(queryKey);

      queryClient.setQueryData<UserType>(queryKey, (currentData) => {
        if (currentData) {
          return {
            ...currentData,
            preferredSolanaExplorer: newExplorer,
          };
        }
        return currentData;
      });

      return { previousData };
    },
    errorMessage: 'Failed to update Solana Explorer.',
  });

  return {
    user: data,
    error,
    isLoading,
    onEditSolanaExplorer: handleUpdateSolanaExplorer.mutate,
  };
};

export default useCurrentUserLoader;
