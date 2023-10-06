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

export type MinimalTransaction = Pick<
  Transaction,
  'type' | 'description' | 'id' | 'customLabels' | 'fee' | 'feePayer' | 'source' | 'createdAt' | 'signature'
> & {
  virtualAddress: Pick<VirtualAddress, 'title' | 'address'>;
};
