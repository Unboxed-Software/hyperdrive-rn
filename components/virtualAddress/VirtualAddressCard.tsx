import {
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonIcon,
  EditIcon,
  Heading,
  HStack,
  Switch,
  TrashIcon,
  VStack,
} from '@gluestack-ui/themed';
import { useState } from 'react';

import EditVirtualAddressModal from './EditVirtualAddressModal';

import { VirtualAddress } from '@/types/virtualAddress.types';
import { replaceSolanaAddressesWithTruncated } from '@/utils/addresses';

interface Props {
  title: VirtualAddress['title'];
  addressText: VirtualAddress['address'];
  description?: VirtualAddress['description'];
  isActive: VirtualAddress['isActive'];
  onDelete: () => void;
  onToggleActive: () => void;
  onEdit: (_f: { fields: Pick<VirtualAddress, 'title' | 'description'> }) => Promise<unknown>;
}

export default function VirtualAddressCard({
  title,
  addressText,
  isActive,
  onToggleActive,
  onDelete,
  description,
  onEdit,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <HStack paddingVertical="$2">
      <VStack flexGrow={1} alignItems="flex-start" justifyContent="center" space="sm">
        <Heading flexGrow={1} color="$textLight100" mr="$5" size="sm">
          {title} ({replaceSolanaAddressesWithTruncated(addressText)})
        </Heading>
        {isActive ? (
          <Badge action="success">
            <BadgeText>Active</BadgeText>
          </Badge>
        ) : (
          <Badge action="error">
            <BadgeText>Inactive</BadgeText>
          </Badge>
        )}
      </VStack>
      <Box flexDirection="row" alignItems="center">
        <Switch alignSelf="center" size="sm" onToggle={onToggleActive} value={isActive} />
        <Button size="sm" mx="$1" onPress={() => setIsEditModalOpen(true)}>
          <ButtonIcon as={EditIcon} />
        </Button>
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
