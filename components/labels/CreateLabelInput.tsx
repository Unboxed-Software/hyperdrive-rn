import { AddIcon, Button, ButtonIcon, Input, InputField, Spinner, View } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Label } from '@/types/labels.types';

type Props = {
  onCreate: (_title: Label['title']) => void;
  isCreatingLabel?: boolean;
  isDisabled?: boolean;
};

const CreateLabelInput: React.FC<Props> = ({ onCreate, isDisabled, isCreatingLabel }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    onCreate(value);
    setValue('');
  };

  return (
    <View style={styles.container}>
      <Input size="sm" style={styles.input}>
        <InputField value={value} color="$textLight100" placeholder="Add a new  Label..." onChangeText={setValue} />
      </Input>
      <Button size="sm" onPress={handleSubmit} disabled={isDisabled || isCreatingLabel || value.trim() === ''}>
        {isCreatingLabel ? <Spinner size="small" color="$textLight100" /> : <ButtonIcon as={AddIcon} />}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 5,
  },
});

export default CreateLabelInput;
