import { request } from '@services/request';

import { CustomLabel } from '@/types/labels.types';

export const getCustomLabels = async () => {
  const res = await request<{ customLabels: CustomLabel[] }>(`me/custom-labels/`);
  return res.customLabels;
};

export const DEFAULT_TRANSACTION_LABEL_OPTIONS = [
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
