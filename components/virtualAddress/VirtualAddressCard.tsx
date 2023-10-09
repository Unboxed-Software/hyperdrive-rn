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
    <Box
      maxWidth="$96"
      padding="$5"
      borderColor="$borderLight200"
      borderRadius="$lg"
      borderWidth="$1"
      my="$2"
      overflow="hidden"
    >
      <HStack space="sm" w="96%">
        <Center alignItems="flex-start" w="70%" flexDirection="column">
          <Box flexDirection="row">
            <Heading mr="$5" size="sm">
              {title}
            </Heading>
            {isActive ? (
              <Badge action="success">
                <BadgeText>Active</BadgeText>
              </Badge>
            ) : (
              <Badge>
                <BadgeText>Inactive</BadgeText>
              </Badge>
            )}
          </Box>
          <Text fontSize="$xs" isTruncated>
            {addressText}
          </Text>
        </Center>

        <Center flexGrow={1} w="30%">
          <ButtonGroup ml={3}>
            <Switch size="sm" onToggle={onToggleActive} value={isActive} />
            <Button size="xs" padding="$1" onPress={onDelete} action="negative" variant="outline" aria-label="Delete">
              <ButtonIcon size="xs" as={TrashIcon} />
            </Button>
          </ButtonGroup>
        </Center>
      </HStack>
    </Box>
  );
}
