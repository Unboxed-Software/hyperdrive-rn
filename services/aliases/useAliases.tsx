import base58 from 'bs58';
import { keyBy, pick, unionBy } from 'lodash';
import { useCallback, useMemo } from 'react';

import { useAliasesLoader } from './useAliasesLoader';
import { useVirtualAddressesLoader } from '../virtualAddress/useVirtualAddresses';

import { Alias, AliasMapItem } from '@/types/aliases.types';

const SOLANA_ADDRESS_REGEX = /[1-9A-HJ-NP-Za-km-z]{32,44}/g;
const SOLANA_ADDRESS_LENGTH = 32; // 32 bytes for Solana addresses

const useAliases = () => {
  const { aliases } = useAliasesLoader();
  const { virtualAddressList } = useVirtualAddressesLoader();

  const aliasesMap = useMemo<Record<Alias['address'], AliasMapItem>>(() => {
    const parsedAliases = aliases.map((a) => pick(a, ['address', 'title', 'description', 'id']));
    const parsedVirtualAddress = virtualAddressList.map((a) => ({
      ...pick(a, ['title', 'address', 'description', 'id']),
      isVAddress: true,
    }));

    return keyBy(unionBy(parsedAliases, parsedVirtualAddress, 'address'), 'address');

    // return keyBy('address');
  }, [aliases, virtualAddressList]);

  const replaceSolanaAddressesWithAliasOrTruncate = useCallback(
    (string: string): string =>
      string.replace(SOLANA_ADDRESS_REGEX, (match) => {
        if (aliasesMap[match]) return aliasesMap[match].title;

        const decoded = base58.decode(match);

        if (decoded.length === SOLANA_ADDRESS_LENGTH) {
          // Truncate to the desired format: "xxxx...xxxx"
          return `${match.slice(0, 4)}...${match.slice(-4)}`;
        }

        // If not a valid Solana address, return the original match
        return match;
      }),
    [aliasesMap],
  );

  return {
    replaceSolanaAddressesWithAliasOrTruncate,
  };
};

export { useAliases };
