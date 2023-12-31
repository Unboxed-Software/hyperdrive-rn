import { SimplifiedToast } from '@components/SimplifiedToast';
import { useToast } from '@gluestack-ui/themed';
import useMutationSimplified from '@hooks/useMutationSimplified';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';

import {
  archiveVirtualAddress,
  creatVirtualAddress,
  editVirtualAddress,
  getVirtualAddress,
  toggleIsActiveVirtualAddress,
} from './virtualAddress.service';

import { VirtualAddress } from '@/types/virtualAddress.types';

const vAddressCacheKey = 'addressees';

const useVirtualAddressesLoader = () => {
  const toast = useToast();

  const {
    data: virtualAddressList,
    error,
    isLoading,
  } = useQuery<VirtualAddress[]>({
    queryKey: [vAddressCacheKey],
    queryFn: getVirtualAddress,
    onError: () => {
      toast.show({
        render: ({ id }) => (
          <SimplifiedToast nativeID={id} description="Failed to get the Virtual Addresses." action="error" />
        ),
      });
    },
  });

  const queryClient = useQueryClient();

  const toggleIsActive = useMutationSimplified({
    queryKey: [vAddressCacheKey],
    mutationFn: toggleIsActiveVirtualAddress,
    invalidateOnSuccess: false,
    errorMessage: 'Failed to activate the Virtual Address.',
    onMutate: ({ vAddressId }) => {
      const previousData = queryClient.getQueryData<VirtualAddress[]>([vAddressCacheKey]);

      queryClient.setQueryData<VirtualAddress[]>([vAddressCacheKey], (currentData) => {
        const vAddressListCopy = cloneDeep(currentData);
        const vAddress = vAddressListCopy?.find((va) => va.id === vAddressId);
        if (vAddress) {
          vAddress.isActive = !vAddress.isActive;
        }
        return vAddressListCopy;
      });

      return { previousData };
    },
  });

  const createMutation = useMutationSimplified({
    queryKey: [vAddressCacheKey],
    mutationFn: creatVirtualAddress,
    successMessage: 'Virtual Address Added Successfully',
    errorMessage: 'Failed to add the Virtual Address.',
  });

  const archiveMutation = useMutationSimplified({
    queryKey: [vAddressCacheKey],
    mutationFn: archiveVirtualAddress,
    successMessage: 'Virtual Address Removed Successfully',
    errorMessage: 'Failed to remove your Virtual Address.',
  });

  const editMutation = useMutationSimplified({
    queryKey: [vAddressCacheKey],
    mutationFn: editVirtualAddress,
    successMessage: 'Virtual Address edited Successfully',
    errorMessage: 'Failed to edit your Virtual Address.',
  });

  return {
    virtualAddressList: virtualAddressList || [],
    error,
    isLoading,
    onToggleIsActive: toggleIsActive.mutate,
    onCreate: createMutation.mutateAsync,
    onArchive: archiveMutation.mutate,
    isArchiving: archiveMutation.isLoading,
    onEdit: editMutation.mutateAsync,
  };
};

export { useVirtualAddressesLoader };
