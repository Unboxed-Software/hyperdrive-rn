import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonGroup,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import React from 'react';

type Props = {
  onSubmit: () => void;
  children: React.ReactNode;
  bodyText: string;
  headerText: string;
  cancelBtnText?: string;
  submitBtnText?: string;
  isSubmitting?: boolean;
} & Omit<React.ComponentProps<typeof Button>, 'onPress'>;

const ButtonWithConfirmation: React.FC<Props> = ({
  onSubmit,
  children,
  bodyText,
  headerText,
  cancelBtnText = 'Cancel',
  submitBtnText = 'Confirm',
  isSubmitting,
  ...rest
}) => {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  return (
    <>
      <Button {...rest} onPress={() => setShowAlertDialog(true)}>
        {children}
      </Button>
      <AlertDialog isOpen={showAlertDialog} onClose={() => setShowAlertDialog(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">{headerText}</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">{bodyText}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button variant="outline" action="secondary" onPress={() => setShowAlertDialog(false)}>
                <ButtonText>{cancelBtnText}</ButtonText>
              </Button>
              <Button bg="$error600" action="negative" onPress={onSubmit} isDisabled={isSubmitting}>
                <ButtonText>{submitBtnText}</ButtonText>
                {isSubmitting && <Spinner ml="$1" color="$secondary0" />}
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ButtonWithConfirmation;
