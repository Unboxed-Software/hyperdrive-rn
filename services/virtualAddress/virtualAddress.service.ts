import { request } from '@services/request';

import { VirtualAddress } from '@/types/virtualAddress.types';

export const getVirtualAddress = async () => {
  const res = await request<{ virtualAddresses: VirtualAddress[] }>('me/virtual-addresses');
  return res.virtualAddresses;
};

export const toggleIsActiveVirtualAddress = async ({
  vAddressId,
  currentIsActive,
}: {
  vAddressId: VirtualAddress['id'];
  currentIsActive: boolean;
}) => {
  const res = await request<{ virtualAddress: VirtualAddress }>(
    `me/virtual-addresses/${vAddressId}/${currentIsActive ? 'inactivate' : 'activate'}`,
    {
      method: 'PUT',
    },
  );
  return res.virtualAddress;
};

export const creatVirtualAddress = async ({
  fields,
}: {
  fields: Pick<VirtualAddress, 'title' | 'description' | 'address'>;
}) => {
  const res = await request<{ virtualAddress: VirtualAddress }>('me/virtual-addresses', {
    data: { fields },
    method: 'POST',
  });
  return res.virtualAddress;
};

export const archiveVirtualAddress = async (vAddressId: VirtualAddress['id']) => {
  const res = await request<{ virtualAddress: VirtualAddress }>(`me/virtual-addresses/${vAddressId}`, {
    method: 'DELETE',
  });
  return res.virtualAddress;
};

export const editVirtualAddress = async ({
  id,
  fields,
}: {
  id: VirtualAddress['id'];
  fields: Pick<VirtualAddress, 'title' | 'description'>;
}) => {
  const res = await request<{ virtualAddress: VirtualAddress }>(`me/virtual-addresses/${id}`, {
    method: 'PUT',
    data: { fields },
  });
  return res.virtualAddress;
};
