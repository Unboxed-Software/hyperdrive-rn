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
  onSubmit: (_f: { fields: Pick<Alias, 'title' | 'description'> }) => Promise<unknown>;
  onClose: () => void;
  isOpen: boolean;
  title: Alias['title'];
  description: Alias['description'];
};

const EditAliasModal: React.FC<Props> = ({ onSubmit, isOpen, title, description, onClose }) => {
  const formik = useFormik({
    initialValues: { title, description },
    validate(values) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors: any = {};
      if (!values.title) {
        errors.title = 'Title is Required';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await onSubmit({ fields: values });
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent bgColor="$trueGray800">
        <ModalHeader>
          <Heading size="lg" color="$textLight100">
            Edit your Alias
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

            <FormControl isDisabled={formik.isSubmitting}>
              <FormControlLabel>
                <FormControlLabelText color="$textLight200">Description</FormControlLabelText>
              </FormControlLabel>
              <Input borderColor="$trueGray600">
                <InputField
                  color="$textLight100"
                  placeholder="Description"
                  onChangeText={formik.handleChange('description')}
                  value={formik.values.description || ''}
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

export default EditAliasModal;
