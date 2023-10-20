import { Box, Button, ButtonIcon, EditIcon, Heading, HStack, Switch, TrashIcon } from '@gluestack-ui/themed';
import { useState } from 'react';

import EditVirtualAddressModal from './EditVirtualAddressModal';
import ButtonWithConfirmation from '../ButtonWithConfirmation';

import { VirtualAddress } from '@/types/virtualAddress.types';
import { replaceSolanaAddressesWithTruncated } from '@/utils/addresses';

interface Props {
  title: VirtualAddress['title'];
  addressText: VirtualAddress['address'];
  description?: VirtualAddress['description'];
  isActive: VirtualAddress['isActive'];
  onArchive: () => void;
  onToggleActive: () => void;
  onEdit: (_f: { fields: Pick<VirtualAddress, 'title' | 'description'> }) => Promise<unknown>;
  isArchiving: boolean;
}

export default function VirtualAddressCard({
  title,
  addressText,
  isActive,
  onToggleActive,
  onArchive,
  description,
  onEdit,
  isArchiving,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <HStack paddingVertical="$2">
      <Heading flexGrow={1} color="$textLight100" mr="$5" size="sm" isTruncated maxWidth="58%">
        {title} ({replaceSolanaAddressesWithTruncated(addressText)})
      </Heading>
      <Box flexDirection="row" alignItems="center">
        <Switch alignSelf="center" size="sm" onToggle={onToggleActive} value={isActive} />
        <Button size="sm" mx="$1" onPress={() => setIsEditModalOpen(true)}>
          <ButtonIcon as={EditIcon} />
        </Button>
        <ButtonWithConfirmation
          onSubmit={onArchive}
          headerText="Deleting an Account"
          bodyText="Are you sure you want to delete this account?"
          size="sm"
          variant="solid"
          action="negative"
          isSubmitting={isArchiving}
        >
          <ButtonIcon as={TrashIcon} />
        </ButtonWithConfirmation>
      </Box>
      <EditVirtualAddressModal
        onClose={() => setIsEditModalOpen(false)}
        title={title}
        description={description || ''}
        onSubmit={onEdit}
        isOpen={isEditModalOpen}
      />
    </HStack>
  );
}
