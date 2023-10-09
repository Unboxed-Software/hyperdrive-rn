import { request } from '@services/request';

import { VirtualAddress } from '@/types/virtualAddress.types';

export const getVirtualAddress = async () => {
  const res = await request<{ virtualAddresses: VirtualAddress[] }>('/me/virtual-addresses');
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
    `/me/virtual-addresses/${vAddressId}/${currentIsActive ? 'inactivate' : 'activate'}`,
  );
  return res.virtualAddress;
};

export const creatVirtualAddress = async ({
  fields,
}: {
  fields: Pick<VirtualAddress, 'title' | 'description' | 'address'>;
}) => {
  const res = await request<{ virtualAddress: VirtualAddress }>('/me/virtual-addresses', { data: fields });
  return res.virtualAddress;
};

export const deleteVirtualAddress = async (vAddressId: VirtualAddress['id']) => {
  const res = await request<{ virtualAddress: VirtualAddress }>(`/me/virtual-addresses/${vAddressId}`);
  return res.virtualAddress;
};
