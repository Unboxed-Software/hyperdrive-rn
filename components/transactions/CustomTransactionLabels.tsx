import Select from '@components/Select';
import { Box, Heading } from '@gluestack-ui/themed';
import { getLabelOptions } from '@services/transactions/transactions.service';
import React, { useMemo, useState } from 'react';

import { MinimalTransaction } from '@/types/transactions.types';

type Props = {
  labels: MinimalTransaction['customLabels'];
  disabled?: boolean;
  onUpdateLabels: (_labels: MinimalTransaction['customLabels']) => void;
};

const CustomTransactionLabels: React.FC<Props> = ({ labels, onUpdateLabels, disabled }) => {
  const [value, setValue] = useState<string | undefined>(labels[0]);

  const labelOptions = useMemo(() => getLabelOptions(), []);

  return (
    <Box flexDirection="row" alignItems="center">
      <Heading fontSize="$md" mr="$3">
        Label:
      </Heading>
      <Select
        disabled={disabled}
        style={{
          inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30,
          },
          inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
          },
        }}
        onValueChange={(a) => setValue(a)}
        onDonePress={() => onUpdateLabels(value ? [value] : [])}
        items={labelOptions}
        value={value}
      />
    </Box>
  );
};

export default CustomTransactionLabels;
