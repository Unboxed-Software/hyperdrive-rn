import { Text } from '@gluestack-ui/themed';
import React from 'react';

import { MinimalTransaction } from '@/types/transactions.types';

type Props = {
  labels: MinimalTransaction['customLabels'];
};

const CustomTransactionLabels: React.FC<Props> = ({ labels }) => {
  // const labelOptions = useMemo(() => getLabelOptions(), []);

  return <Text>{labels[0]}</Text>;
};

export default CustomTransactionLabels;
