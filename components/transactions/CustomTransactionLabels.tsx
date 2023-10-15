import Select from '@components/Select';
import { useToken } from '@gluestack-ui/themed';
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
  const textColor = useToken('colors', 'textLight100');

  const labelOptions = useMemo(() => getLabelOptions(), []);

  return (
    <Select
      disabled={disabled}
      style={{
        inputIOS: {
          color: textColor.toString(),
          fontSize: 16,
          fontWeight: 'bold',
          paddingVertical: 12,
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
  );
};

export default CustomTransactionLabels;
