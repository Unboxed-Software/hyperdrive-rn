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
  customLabels,
}: {
  txId: Transaction['id'];
  customLabels: Transaction['customLabels'];
}) => {
  const res = await request<{ transaction: MinimalTransaction }>(`me/transactions/${txId}`, {
    data: { customLabels },
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

export const CUSTOM_LABEL_OPTIONS_GROUPED = [
  {
    title: 'Trading',
    options: ['Coin Swap / Exchange', 'Coin Buy', 'Coin Sell', 'NFT Swap', 'NFT Buy / Mint', 'NFT Sell / Burn'],
  },
  {
    title: 'Friends & Businesses',
    options: ['Receive', 'Payment', 'Donation', 'Gift'],
  },
  {
    title: 'Perpetuals / Futures',
    options: ['Open Position', 'Close Position'],
  },
  {
    title: 'Staking & LP',
    options: [
      'Staking Deposit',
      'Staking Swap',
      'Claim Rewards',
      'Unstaking Withdraw',
      'Unstaking Swap',
      'Add Liquidity',
      'Remove Liquidity',
    ],
  },
  {
    title: 'Income',
    options: ['Airdrop', 'Income', 'Rewards', 'Mining Income', 'Spam'],
  },
  {
    title: 'Loans',
    options: ['Lend Deposit', 'Lend Swap', 'Unlend', 'Unlend Swap', 'Borrow', 'Repay'],
  },
  {
    title: 'Transfers',
    options: ['Bridging', 'Wallet Transfer'],
  },
  {
    title: 'Other',
    options: ['Non-Taxable', 'Fee Expense Deduction'],
  },
];

export const getLabelBadge = (label: string): string | undefined => {
  return CUSTOM_LABEL_OPTIONS_GROUPED.map((g) => g.options)
    .flat()
    .find((l) => l === label);
};
