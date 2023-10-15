import {
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonGroup,
  ButtonIcon,
  Center,
  Heading,
  HStack,
  Switch,
  Text,
  TrashIcon,
  VStack,
} from '@gluestack-ui/themed';

import { VirtualAddress } from '@/types/virtualAddress.types';
import { replaceSolanaAddressesWithTruncated } from '@/utils/addresses';

interface Props {
  title: VirtualAddress['title'];
  addressText: VirtualAddress['address'];
  description?: VirtualAddress['description'];
  isActive: VirtualAddress['isActive'];
  onDelete: () => void;
  onToggleActive: () => void;
}

export default function VirtualAddressCard({
  title,
  addressText,
  description,
  isActive,
  onDelete,
  onToggleActive,
}: Props) {
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
      <Switch alignSelf="center" size="sm" onToggle={onToggleActive} value={isActive} />
    </HStack>
  );
}
