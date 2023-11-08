import { HStack, Text } from '@gluestack-ui/themed';
import base58 from 'bs58';
import { keyBy, pick, unionBy } from 'lodash';
import { ReactNode, useCallback, useMemo } from 'react';

import { useAliasesLoader } from './useAliasesLoader';
import { useVirtualAddressesLoader } from '../virtualAddress/useVirtualAddresses';

import InlineSolanaAddress from '@/components/aliases/InlineSolanaAddress';
import { Alias, AliasMapItem } from '@/types/aliases.types';

const SOLANA_ADDRESS_REGEX = /([1-9A-HJ-NP-Za-km-z]{32,44})/g;
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
    (string: string): ReactNode => {
      const parts = string.split(SOLANA_ADDRESS_REGEX).filter((a) => a !== '');

      return (
        <HStack flexWrap="wrap">
          {parts.map((p, i) => {
            if (SOLANA_ADDRESS_REGEX.test(p)) {
              const decoded = base58.decode(p);

              if (decoded.length === SOLANA_ADDRESS_LENGTH) {
                return <InlineSolanaAddress key={p} alias={aliasesMap[p]} address={p} />;
              }
            }

            // If not a valid Solana address, return the original match
            return <Text key={`${p} - ${i}`}>{p}</Text>;
          })}
        </HStack>
      );
    },
    [aliasesMap],
  );

  return {
    replaceSolanaAddressesWithAliasOrTruncate,
  };
};

export { useAliases };
