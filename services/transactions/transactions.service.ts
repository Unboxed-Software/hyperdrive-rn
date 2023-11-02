import { request } from '@services/request';

import { Label, MinimalLabel } from '@/types/labels.types';
import { MinimalTransaction, Transaction } from '@/types/transactions.types';
import { MinimalVirtualAddress } from '@/types/virtualAddress.types';

export const getTransactions = async ({
  pageParam,
}: {
  pageParam?: {
    id: number;
    timestamp: number;
  };
}) => {
  const res = await request<{ transactions: MinimalTransaction[] }>('me/transactions/paginated', {
    params: pageParam,
  });

  return {
    items: res.transactions,
    hasMore: res.transactions.length !== 0,
    nextCursor: {
      id: res.transactions[res.transactions.length - 1]?.id,
      timestamp: res.transactions[res.transactions.length - 1]?.timestamp,
    },
  };
};

export const getTransactionById = async (txId: MinimalTransaction['id']) => {
  const res = await request<{
    transaction: Transaction & {
      virtualAddress: MinimalVirtualAddress;
      label: MinimalLabel;
    };
  }>(`me/transactions/${txId}`);
  return res.transaction;
};

export const updateLabel = async ({
  txId,
  labelId,
}: {
  txId: Transaction['id'];
  labelId: Transaction['labelId'] | null;
  labelTitle: Label['title'] | null;
}) => {
  const res = await request<{ transaction: MinimalTransaction }>(`me/transactions/${txId}`, {
    data: { labelId },
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
