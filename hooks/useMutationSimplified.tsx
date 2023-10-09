import { SimplifiedToast } from '@components/SimplifiedToast';
import { useToast } from '@gluestack-ui/themed';
import { QueryKey, useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import React from 'react';

function useMutationSimplified<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>({
  networkMode = 'always',
  invalidateOnSuccess = true,
  mutationFn,
  errorMessage,
  successMessage,
  queryKey,
  onMutate,
  onSuccess,
}: {
  errorMessage: string;
  successMessage?: string;
  invalidateOnSuccess?: boolean;
  queryKey: QueryKey;
} & Pick<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'networkMode' | 'mutationFn' | 'onMutate' | 'onSuccess'
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

    onSuccess: (...args) => {
      if (invalidateOnSuccess) {
        queryClient.invalidateQueries({ queryKey });
      }
      if (successMessage) {
        toast.show({
          render: ({ id }) => <SimplifiedToast nativeID={id} action="success" description={successMessage} />,
        });
      }
      if (onSuccess) onSuccess(...args);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (_error: any, _vars, ctx: { previousData: unknown }) => {
      if (onMutate && ctx?.previousData) {
        queryClient.setQueryData(queryKey, ctx?.previousData);
      }

      toast.show({
        render: ({ id }) => <SimplifiedToast nativeID={id} action="error" description={errorMessage} />,
      });
    },
  });

  return mutate;
}

export default useMutationSimplified;
