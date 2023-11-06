import { Box, Button, ButtonIcon, EditIcon, Heading, HStack, Text, TrashIcon, VStack } from '@gluestack-ui/themed';
import { useState } from 'react';

import EditAliasModal from './EditAliasModal';
import ButtonWithConfirmation from '../ButtonWithConfirmation';

import { Alias } from '@/types/aliases.types';
import { replaceSolanaAddressesWithTruncated } from '@/utils/addresses';

interface Props {
  title: Alias['title'];
  addressText: Alias['address'];
  description?: Alias['description'];
  onDelete: () => void;
  onEdit: (_f: { fields: Pick<Alias, 'title' | 'description'> }) => Promise<unknown>;
  isDeleting?: boolean;
}

export default function AliasCard({ title, addressText, description, onEdit, onDelete, isDeleting }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <HStack paddingVertical="$2" mr="$5" bg="$secondary800" borderRadius="$lg" padding="$2">
      <VStack flexGrow={1}>
        <Heading color="$textLight100" size="sm" isTruncated>
          {title}
        </Heading>
        <Text color="$textLight100" size="xs" isTruncated>
          {replaceSolanaAddressesWithTruncated(addressText)}
        </Text>
      </VStack>
      <Box flexDirection="row" alignItems="center">
        <Button size="sm" mx="$1" onPress={() => setIsEditModalOpen(true)}>
          <ButtonIcon as={EditIcon} />
        </Button>
        <ButtonWithConfirmation
          onSubmit={onDelete}
          headerText="Deleting an Account"
          bodyText="Are you sure you want to delete this account?"
          size="sm"
          variant="solid"
          action="negative"
          isSubmitting={isDeleting}
        >
          <ButtonIcon as={TrashIcon} />
        </ButtonWithConfirmation>
      </Box>
      {isEditModalOpen && (
        <EditAliasModal
          onClose={() => setIsEditModalOpen(false)}
          title={title}
          description={description || ''}
          onSubmit={onEdit}
          isOpen={isEditModalOpen}
        />
      )}
    </HStack>
  );
}
