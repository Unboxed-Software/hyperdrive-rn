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
  txId: Transaction['id'];
  customLabels: Transaction['customLabels'];
}) => {
  const res = await request<{ transaction: MinimalTransaction }>(`/me/transactions/${txId}`, {
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
  const res = await request<{ transaction: MinimalTransaction }>(`/me/transactions/${txId}`, {
    data: { customNote },
    method: 'PUT',
  });
  return res.transaction;
};

const CUSTOM_LABEL_OPTIONS_GROUPED = [
  {
    label: 'Trading',
    value: 'trading',
    options: [
      { value: 'coinSwap', label: 'Coin Swap / Exchange' },
      { value: 'coinBuy', label: 'Coin Buy' },
      { value: 'coinSell', label: 'Coin Sell' },
      { value: 'nftSwap', label: 'NFT Swap' },
      { value: 'nftMint', label: 'NFT Buy / Mint' },
      { value: 'nftBurn', label: 'NFT Sell / Burn' },
    ],
  },
  {
    label: 'Friends & Businesses',
    value: 'friends&Businesses',
    options: [
      { value: 'receive', label: 'Receive' },
      { value: 'payment', label: 'Payment' },
      { value: 'donation', label: 'Donation' },
      { value: 'gift', label: 'Gift' },
    ],
  },
  {
    label: 'Perpetuals / Futures',
    options: [
      { value: 'openPosition', label: 'Open Position' },
      { value: 'closePosition', label: 'Close Position' },
    ],
  },
  {
    label: 'Staking & LP',
    value: 'staking&LP',
    options: [
      { value: 'stakingDeposit', label: 'Staking Deposit' },
      { value: 'stakingSwap', label: 'Staking Swap' },
      { value: 'claimRewards', label: 'Claim Rewards' },
      { value: 'unstakingWithdraw', label: 'Unstaking Withdraw' },
      { value: 'unstakingSwap', label: 'Unstaking Swap' },
      { value: 'addLiquidity', label: 'Add Liquidity' },
      { value: 'removeLiquidity', label: 'Remove Liquidity' },
    ],
  },
  {
    label: 'Income',
    value: 'income',
    options: [
      { value: 'airdrop', label: 'Airdrop' },
      { value: 'income', label: 'Income' },
      { value: 'rewards', label: 'Rewards' },
      { value: 'miningIncome', label: 'Mining Income' },
      { value: 'spam', label: 'Spam' },
    ],
  },
  {
    label: 'Loans',
    value: 'loans',
    options: [
      { value: 'lendDeposit', label: 'Lend Deposit' },
      { value: 'lendSwap', label: 'Lend Swap' },
      { value: 'unlend', label: 'Unlend' },
      { value: 'unlendSwap', label: 'Unlend Swap' },
      { value: 'borrow', label: 'Borrow' },
      { value: 'repay', label: 'Repay' },
    ],
  },
  {
    label: 'Transfers',
    value: 'transfers',
    options: [
      { value: 'bridging', label: 'Bridging' },
      { value: 'walletTransfer', label: 'Wallet Transfer' },
    ],
  },
  {
    label: 'Other',
    value: 'other',
    options: [
      { value: 'nonTaxable', label: 'Non-Taxable' },
      { value: 'feeExpenseDeduction', label: 'Fee Expense Deduction' },
    ],
  },
];

export const getLabelOptions = () =>
  CUSTOM_LABEL_OPTIONS_GROUPED.reduce<{ label: string; value: string }[]>(
    (acc, cur) => [
      ...acc,
      ...cur.options.map((l) => ({
        value: `${cur.value} - ${l.value}`,
        label: `${cur.label} - ${l.label}`,
      })),
    ],
    [],
  );

export const getLabelBadge = (label: string): string | undefined => {
  return CUSTOM_LABEL_OPTIONS_GROUPED.reduce<{ label: string; value: string }[]>(
    (acc, cur) => [
      ...acc,
      ...cur.options.map((l) => ({
        value: `${cur.value} - ${l.value}`,
        label: l.label,
      })),
    ],
    [],
  ).find((l) => l.value === label)?.label;
};
