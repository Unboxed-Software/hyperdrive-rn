import { Label, MinimalLabel } from './labels.types';
import { MinimalVirtualAddress } from './virtualAddress.types';

export type Transaction = {
  id: number;
  userId: number;
  rawTransactionId: number;
  virtualAddressId: number;
  labelId: Label['id'];
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

export type MinimalTransaction = Pick<Transaction, 'id' | 'timestamp' | 'customNote' | 'description' | 'signature'> & {
  virtualAddress: MinimalVirtualAddress;
  label: MinimalLabel | null;
};
