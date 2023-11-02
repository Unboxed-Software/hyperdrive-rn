import { request } from '../request';

import { SolanaExplorerType, UserType } from '@/types/user.types';

export const getCurrentUser = async () => {
  const res = await request<{ user: UserType }>(`me/user`);
  return res.user;
};

export const editSolanaExplorer = async (solanaExplorer: SolanaExplorerType) => {
  const res = await request<{ user: UserType }>(`me/user/solanaExplorer`, {
    method: 'PUT',
    data: { solanaExplorer },
  });
  return res.user;
};

const parseXRayURL = (txId: string): `http${string}` => `https://xray.helius.xyz/tx/${txId}`;
const parseSolscanURL = (txId: string): `http${string}` => `https://solscan.io/tx/${txId}`;
const parseSolanaFMURL = (txId: string): `http${string}` => `https://solana.fm/tx/${txId}`;
const parseSolanaExplorerURL = (txId: string): `http${string}` => `https://explorer.solana.com/${txId}`;

export const solanaExplorersMap: Record<SolanaExplorerType, (_txId: string) => `http${string}`> = {
  X_RAY: parseXRayURL,
  SOLSCAN: parseSolscanURL,
  SOLANA_FM: parseSolanaFMURL,
  SOLANA_EXPLORER: parseSolanaExplorerURL,
};
