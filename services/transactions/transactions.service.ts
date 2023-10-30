import { request } from '@services/request';

import { MinimalTransaction, Transaction } from '@/types/transactions.types';
import { VirtualAddress } from '@/types/virtualAddress.types';

export const getTransactions = async ({ pageParam }: { pageParam?: { after: Transaction['id'] } }) => {
  const res = await request<{ transactions: MinimalTransaction[] }>('me/transactions/paginated', {
    params: pageParam,
  });

  return {
    items: res.transactions,
    hasMore: res.transactions.length !== 0,
    nextCursor: res.transactions[res.transactions.length - 1]?.id,
  };
};

export const getTransactionById = async (txId: MinimalTransaction['id']) => {
  const res = await request<{
    transaction: Transaction & {
      virtualAddress: Pick<VirtualAddress, 'address' | 'title' | 'id'>;
    };
  }>(`me/transactions/${txId}`);
  return res.transaction;
};

export const updateCustomLabels = async ({
  txId,
  labels,
}: {
  txId: Transaction['id'];
  labels: Transaction['labels'];
}) => {
  const res = await request<{ transaction: MinimalTransaction }>(`me/transactions/${txId}`, {
    data: { labels },
    method: 'PUT',
  });
  return res.transaction;
};

export const updateCustomNote = async ({
  txId,
  customNote,
}: {
  txId: Transaction['id'];
  customNote: Transaction['customNote'];
}) => {
  const res = await request<{ transaction: MinimalTransaction }>(`me/transactions/${txId}`, {
    data: { customNote },
    method: 'PUT',
  });
  return res.transaction;
};
