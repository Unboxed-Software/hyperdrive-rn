import Select from '@components/Select';
import { Box, Button, ButtonText, Heading, Textarea, TextareaInput } from '@gluestack-ui/themed';
import React, { useState } from 'react';

import { MinimalTransaction } from '@/types/transactions.types';

type Props = {
  note: MinimalTransaction['customNote'];
  onUpdateNote: (_labels: MinimalTransaction['customNote']) => void;
};

const CustomTransactionNote: React.FC<Props> = ({ note, onUpdateNote }) => {
  console.log('note', note);
  const [value, setValue] = useState<string | undefined>(note);

  return (
    <Box my="$4" alignItems="flex-start">
      <Heading fontSize="$md" mr="$3">
        Custom Note:
      </Heading>
      <Textarea mb="$2" size="md" w="100%">
        <TextareaInput value={value} onChangeText={setValue} placeholder="Your custom notes goes here..." />
      </Textarea>
      {value?.trim() !== note?.trim() && (
        <Button onPress={() => onUpdateNote(value)}>
          <ButtonText>Save</ButtonText>
        </Button>
      )}
    </Box>
  );
};

export default CustomTransactionNote;
