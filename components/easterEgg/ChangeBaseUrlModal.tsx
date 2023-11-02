import {
  Button,
  ButtonIcon,
  CheckIcon,
  CloseIcon,
  Heading,
  Icon,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import BaseUrlCard from './BaseUrlCard';

import { BASE_URL_OPTIONS } from '@/services/request';

type Props = {
  onClose: () => void;
  onSelect: (_item: string) => void;
  activeItem: string;
  isOpen: boolean;
};

export default function ChangeBaseUrlModal({ activeItem, onSelect, onClose, isOpen }: Props) {
  const [customBaseUrl, setCustomBaseUrl] = useState(activeItem.startsWith('http') ? activeItem : '');

  const verifyURL = (input: string) => {
    const urlRegex = /^(https?:\/\/)/;
    return urlRegex.test(input);
  };

  const handleSubmit = () => {
    if (verifyURL(customBaseUrl)) {
      onSelect(customBaseUrl.toLowerCase());
    } else {
      alert('Invalid URL, baseUrl must be a valid http or https URL');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent bgColor="$trueGray800">
        <ModalHeader>
          <Heading size="lg" color="$textLight100">
            Change the Base URL
          </Heading>
          <ModalCloseButton>
            <Icon color="$light100" as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <View>
            <VStack>
              {Object.values(BASE_URL_OPTIONS).map((item) => {
                const isActive = item === activeItem;
                return <BaseUrlCard key={item} onPress={() => onSelect(item)} title={item} isActive={isActive} />;
              })}

              <View style={styles.container}>
                <Input size="sm" style={styles.input}>
                  <InputField
                    autoCapitalize="none"
                    autoComplete="off"
                    borderColor="$success300"
                    borderWidth={activeItem.startsWith('http') ? '$2' : '$0'}
                    value={customBaseUrl}
                    color="$textLight100"
                    placeholder="Enter a custom baseUrl"
                    onChangeText={setCustomBaseUrl}
                    textAlignVertical="center"
                  />
                </Input>
                <Button size="sm" onPress={handleSubmit} disabled={customBaseUrl.trim() === ''}>
                  <ButtonIcon as={CheckIcon} />
                </Button>
              </View>
            </VStack>
          </View>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 5,
  },
});
