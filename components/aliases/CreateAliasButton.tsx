import { AddIcon, Box, Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import React, { useState } from 'react';

import CreateAliasModal from './CreateAliasModal';

import { Alias } from '@/types/aliases.types';

type Props = {
  onCreate: (_f: { fields: Pick<Alias, 'title' | 'description' | 'address'> }) => Promise<unknown>;
};

const CreateAliasButton: React.FC<Props> = ({ onCreate }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box justifyContent="flex-start" alignSelf="flex-start" alignItems="flex-start">
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>Add</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
      <CreateAliasModal show={showModal} onCreate={onCreate} onClose={() => setShowModal(false)} />
    </Box>
  );
};

export default CreateAliasButton;
