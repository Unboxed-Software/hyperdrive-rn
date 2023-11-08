import { Button, ButtonText, Text, VStack } from '@gluestack-ui/themed';
import { useRef, useState } from 'react';
import Tooltip from 'rn-tooltip';

import CreateAliasModal from './CreateAliasModal';

import { useAliasesLoader } from '@/services/aliases/useAliasesLoader';
import { AliasMapItem } from '@/types/aliases.types';

interface Props {
  address: string;
  alias?: AliasMapItem;
}

export default function InlineSolanaAddress({ address, alias }: Props) {
  const [showCreateAliasModal, setShowCreateAliasModal] = useState(false);
  const { onCreate } = useAliasesLoader();

  const tooltipRef = useRef<Tooltip>();

  if (!alias) {
    return (
      <>
        <Tooltip
          actionType="press"
          height={100}
          width={250}
          containerStyle={{
            justifyContent: 'flex-start',
          }}
          // @ts-ignore
          ref={tooltipRef}
          popover={
            <VStack justifyContent="flex-start" alignItems="flex-start" space="sm">
              <Text color="$white" size="xs">
                {address}
              </Text>

              <Button
                onPress={() => {
                  if (tooltipRef.current && tooltipRef.current.toggleTooltip) {
                    tooltipRef.current.toggleTooltip();
                  }
                  setShowCreateAliasModal(true);
                }}
                size="xs"
              >
                <ButtonText>Add as Alias</ButtonText>
              </Button>
            </VStack>
          }
        >
          <Text paddingHorizontal="$1" bg="$light700" color="$white">
            {`${address.slice(0, 4)}...${address.slice(-4)}`}
          </Text>
        </Tooltip>
        <CreateAliasModal
          show={showCreateAliasModal}
          address={address}
          onCreate={onCreate}
          onClose={() => setShowCreateAliasModal(false)}
        />
      </>
    );
  }

  return (
    <Tooltip
      actionType="press"
      height={alias.description ? 60 : 40}
      containerStyle={{
        justifyContent: 'flex-start',
      }}
      popover={
        <VStack>
          <Text color="$white" size="sm">
            {`${address.slice(0, 4)}...${address.slice(-4)}`}
          </Text>
          {alias.description && (
            <Text size="xs" color="$white" isTruncated>
              {alias.description}
            </Text>
          )}
        </VStack>
      }
    >
      <Text paddingHorizontal="$1" bg="$light700" color="$white">
        {alias.title}
      </Text>
    </Tooltip>
  );
}
