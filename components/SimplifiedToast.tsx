import { Toast, ToastDescription, ToastTitle, VStack } from '@gluestack-ui/themed';
import React from 'react';

type Props = {
  title?: string;
  description?: string;
  action: React.ComponentProps<typeof Toast>['action'];
  nativeID: React.ComponentProps<typeof Toast>['nativeID'];
};

export const SimplifiedToast: React.FC<Props> = ({ description, title, action, nativeID }) => {
  return (
    <Toast nativeID={nativeID} action={action} variant="solid">
      <VStack space="xs">
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </VStack>
    </Toast>
  );
};
