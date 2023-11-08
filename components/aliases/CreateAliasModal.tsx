import {
  Button,
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
import React from 'react';

import { Alias } from '@/types/aliases.types';

type Props = {
  onCreate: (_f: { fields: Pick<Alias, 'title' | 'description' | 'address'> }) => Promise<unknown>;
  address?: Alias['address'];
  show?: boolean;
  onClose: () => void;
};

const CreateAliasModal: React.FC<Props> = ({ onCreate, address, show, onClose }) => {
  const formik = useFormik({
    initialValues: { title: '', address: address || '', description: '' },
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
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={show}
      onClose={() => {
        onClose();
      }}
    >
      <ModalBackdrop />
      <ModalContent bgColor="$trueGray800">
        <ModalHeader>
          <Heading size="lg" color="$textLight100">
            Add a Solana account
          </Heading>
          <ModalCloseButton>
            <Icon color="$light100" as={CloseIcon} />
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
                <FormControlLabelText color="$textLight200">Title</FormControlLabelText>
              </FormControlLabel>
              <Input borderColor="$trueGray600">
                <InputField
                  color="$textLight100"
                  placeholder="Title..."
                  onChangeText={formik.handleChange('title')}
                  onBlur={formik.handleBlur('title')}
                  value={formik.values.title}
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
                <FormControlLabelText color="$textLight200">Address</FormControlLabelText>
              </FormControlLabel>
              <Input isDisabled={!!address} borderColor="$trueGray600">
                <InputField
                  color="$textLight100"
                  placeholder="Address"
                  onChangeText={formik.handleChange('address')}
                  onBlur={formik.handleBlur('address')}
                  value={formik.values.address}
                />
              </Input>
              <FormControlError>
                <FormControlErrorText>{formik.errors.address}</FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isDisabled={formik.isSubmitting}>
              <FormControlLabel>
                <FormControlLabelText color="$textLight200">Description</FormControlLabelText>
              </FormControlLabel>
              <Input borderColor="$trueGray600">
                <InputField
                  color="$textLight100"
                  placeholder="Description"
                  onChangeText={formik.handleChange('description')}
                  value={formik.values.description}
                />
              </Input>
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
          <Button isDisabled={formik.isSubmitting} size="sm" action="negative" borderWidth="$0" onPress={handleCancel}>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateAliasModal;
