import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  CloseIcon,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Icon,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
} from '@gluestack-ui/themed';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import { VirtualAddress } from '@/types/virtualAddress.types';

type Props = {
  onCreate: (_f: { fields: Pick<VirtualAddress, 'title' | 'description' | 'address'> }) => Promise<unknown>;
};

const CreateVirtualAddressButton: React.FC<Props> = ({ onCreate }) => {
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: { title: '', address: '', description: '' },
    validate(values) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors: any = {};
      if (!values.title) {
        errors.title = 'Title is Required';
      }

      if (!values.address) {
        errors.address = 'Title is Required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await onCreate({ fields: values });
        formik.resetForm();
        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setShowModal(false);
  };

  return (
    <Box mx="$7" justifyContent="flex-start" alignSelf="flex-start" alignItems="flex-start">
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>Add</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Engage with Modals</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack space="md">
              <FormControl
                isInvalid={!!formik.errors.title && formik.touched.title}
                isRequired
                isDisabled={formik.isSubmitting}
              >
                <FormControlLabel>
                  <FormControlLabelText>Title</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder="Title..."
                    onChangeText={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>{formik.errors.title}</FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isRequired
                isDisabled={formik.isSubmitting}
                isInvalid={!!formik.errors.address && formik.touched.address}
              >
                <FormControlLabel>
                  <FormControlLabelText>Address</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder="Address"
                    onChangeText={formik.handleChange('address')}
                    onBlur={formik.handleBlur('address')}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>{formik.errors.address}</FormControlErrorText>
                </FormControlError>
              </FormControl>

              <FormControl isDisabled={formik.isSubmitting}>
                <FormControlLabel>
                  <FormControlLabelText>Description</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField placeholder="Description" onChangeText={formik.handleChange('description')} />
                </Input>
                <Input />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="positive"
              mr="$3"
              onPress={() => formik.handleSubmit()}
              isDisabled={formik.isSubmitting || !formik.isValid}
            >
              <ButtonText>Submit</ButtonText>
            </Button>
            <Button size="sm" action="negative" borderWidth="$0" onPress={handleCancel}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateVirtualAddressButton;
