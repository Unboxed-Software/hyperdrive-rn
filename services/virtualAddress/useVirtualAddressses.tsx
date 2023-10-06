import { useToast } from '@gluestack-ui/themed';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';

import {
  creatVirtualAddress,
  deleteVirtualAddress,
  getVirtualAddress,
  toggleIsActiveVirtualAddress,
} from './virtualAddress.service';
import { SimplifiedToast } from '../../components/SimplifiedToast';
import useMutationSimplified from '../../hooks/useMutationSimplified';
import { VirtualAddress } from '../../types/virtualAddress.types';

const vAddressCacheKey = 'addressees';

const useVirtualAddress = () => {
  const toast = useToast();

  const {
    data: virtualAddressList,
    error: virtualAddressListError,
    isLoading: isVirtualAddressListLoading,
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
    cacheKey: vAddressCacheKey,
    mutationFn: toggleIsActiveVirtualAddress,
    invalidateOnSuccess: false,
    successMessage: 'Virtual Address activated Successfully',
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
    cacheKey: vAddressCacheKey,
    mutationFn: creatVirtualAddress,
    successMessage: 'Virtual Address Added Successfully',
    errorMessage: 'Failed to add the Virtual Address.',
  });

  const deleteMutation = useMutationSimplified({
    cacheKey: vAddressCacheKey,
    mutationFn: deleteVirtualAddress,
    successMessage: 'Virtual Address Removed Successfully',
    errorMessage: 'Failed to remove your Virtual Address.',
  });

  return {
    virtualAddressList,
    virtualAddressListError,
    isVirtualAddressListLoading,
    onToggleIsActive: toggleIsActive.mutate,
    onCreate: createMutation.mutate,
    onDelete: deleteMutation.mutate,
  };
};

export { useVirtualAddress };
