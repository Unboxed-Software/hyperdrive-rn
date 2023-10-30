import { Button, ButtonText, Textarea, TextareaInput, VStack } from '@gluestack-ui/themed';
import React, { useState } from 'react';

import { MinimalTransaction } from '@/types/transactions.types';

type Props = {
  note: MinimalTransaction['customNote'];
  onUpdateNote: (_note: MinimalTransaction['customNote']) => void;
};

const CustomTransactionNote: React.FC<Props> = ({ note, onUpdateNote }) => {
  const [value, setValue] = useState<string | undefined>(note);

  return (
    <VStack space="sm" alignItems="flex-end">
      <Textarea size="md" w="100%" borderColor="$trueGray500">
        <TextareaInput
          color="$textLight100"
          value={value}
          onChangeText={setValue}
          placeholder="Add extra context here..."
        />
      </Textarea>
      {value?.trim() !== note?.trim() && (
        <Button pb="$2" onPress={() => onUpdateNote(value)}>
          <ButtonText>Save</ButtonText>
        </Button>
      )}
    </VStack>
  );
};

export default CustomTransactionNote;
