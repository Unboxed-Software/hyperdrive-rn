import { useToast } from '@gluestack-ui/themed';
import { useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { SimplifiedToast } from '../components/SimplifiedToast';

function useMutationSimplified<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>({
  networkMode = 'always',
  invalidateOnSuccess = true,
  mutationFn,
  errorMessage,
  successMessage,
  cacheKey,
  onMutate,
}: {
  errorMessage: string;
  successMessage?: string;
  invalidateOnSuccess?: boolean;
  cacheKey: string;
} & Pick<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'networkMode' | 'mutationFn' | 'onMutate'
>): UseMutationResult<TData, TError, TVariables, TContext> {
  const toast = useToast();
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mutate = useMutation<TData, TError, TVariables, any>({
    mutationFn,
    networkMode,

    onMutate: (vars) => {
      if (onMutate) onMutate(vars);
    },

    onSuccess: () => {
      if (invalidateOnSuccess) {
        queryClient.invalidateQueries({ queryKey: [cacheKey] });
      }
      if (successMessage) {
        toast.show({
          render: ({ id }) => <SimplifiedToast nativeID={id} action="success" description={successMessage} />,
        });
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (_error: any, _vars, ctx: { previousData: unknown }) => {
      if (onMutate && ctx?.previousData) {
        queryClient.setQueryData([cacheKey], ctx?.previousData);
      }

      toast.show({
        render: ({ id }) => <SimplifiedToast nativeID={id} action="error" description={errorMessage} />,
      });
    },
  });

  return mutate;
}

export default useMutationSimplified;
