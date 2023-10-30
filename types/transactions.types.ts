import { VirtualAddress } from './virtualAddress.types';

export type Transaction = {
  id: number;
  userId: number;
  rawTransactionId: number;
  virtualAddressId: number;
  labels: string[];
  customNote?: string;
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

export type MinimalTransaction = Pick<Transaction, 'id' | 'timestamp' | 'labels' | 'customNote' | 'description'> & {
  virtualAddress: Pick<VirtualAddress, 'title' | 'address'>;
};
