import { request } from '@services/request';

import { MinimalTransaction, Transaction } from '@/types/transactions.types';
import { VirtualAddress } from '@/types/virtualAddress.types';

export const getTransactions = async () => {
  const res = await request<{ transactions: MinimalTransaction[] }>('/me/transactions');
  return res.transactions;
};

export const getTransactionById = async (txId: MinimalTransaction['id']) => {
  const res = await request<{
    transaction: Transaction & {
      virtualAddress: Pick<VirtualAddress, 'address' | 'title' | 'id'>;
    };
  }>(`/me/transactions/${txId}`);
  return res.transaction;
};

export const updateCustomLabels = async ({
  txId,
  customLabels,
}: {
  txId: MinimalTransaction['id'];
  customLabels: MinimalTransaction['customLabels'];
}) => {
  const res = await request<{ transaction: MinimalTransaction }>(`/me/transactions/${txId}`, {
    data: { customLabels },
    method: 'PUT',
  });
  return res.transaction;
};

export const CUSTOM_LABEL_OPTIONS = [
  { value: 'sell', label: 'Sell' },
  { value: 'buy', label: 'Buy' },
];
