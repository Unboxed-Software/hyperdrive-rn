import { VirtualAddress } from './virtualAddress.types';

export type Transaction = {
  id: number;
  userId: number;
  rawTransactionId: number;
  virtualAddressId: number;
  customLabels: string[];
  description: string;
  type: string;
  source: string;
  fee: number | null;
  feePayer: string | null;
  signature: string;
  slot: number;
  timestamp: number;
  createdAt: Date;
};

export type MinimalTransaction = Pick<Transaction, 'id' | 'createdAt' | 'customLabels'> & {
  virtualAddress: Pick<VirtualAddress, 'title' | 'address'>;
};
