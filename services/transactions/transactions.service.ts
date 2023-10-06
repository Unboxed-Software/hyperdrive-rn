import { MinimalTransaction } from '../../types/transactions.types';
import { request } from '../request';

export const getTransactions = async () => {
  const res = await request<{ transactions: MinimalTransaction[] }>('/me/transactions');
  return res.transactions;
};

export const updateCustomLabels = async ({
  txId,
  customLabels,
}: {
  txId: MinimalTransaction['id'];
  customLabels: MinimalTransaction['customLabels'];
}) => {
  const res = await request<{ transaction: MinimalTransaction }>(`/me/transactions/${txId}`, {
    data: customLabels,
  });
  return res.transaction;
};

export const CUSTOM_LABEL_OPTIONS = [
  { value: 'sell', label: 'Sell' },
  { value: 'buy', label: 'Buy' },
];
