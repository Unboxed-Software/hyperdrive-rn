import { VirtualAddress } from './virtualAddress.types';

export type MinimalUserType = Omit<UserType, 'preferredSolanaExplorer' | 'virtualAddress'>;

export const SOLANA_EXPLORER_OPTIONS = {
  SOLANA_EXPLORER: 'Solana Explorer',
  SOLANA_FM: 'SolanaFM',
  SOLSCAN: 'Solscan',
  X_RAY: 'XRay',
} as const;

export type SolanaExplorerType = keyof typeof SOLANA_EXPLORER_OPTIONS;

export type UserType = {
  id: number;
  name: string;
  email: string;
  image: string;
  preferredSolanaExplorer: SolanaExplorerType;
  virtualAddress: VirtualAddress[];
};
