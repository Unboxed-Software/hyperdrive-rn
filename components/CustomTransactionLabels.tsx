import React from 'react';

import Select from './Select';
import { Text } from './Themed';
import { CUSTOM_LABEL_OPTIONS } from '../services/transactions/transactions.service';
import { MinimalTransaction } from '../types/transactions.types';

type Props = {
  labels: MinimalTransaction['customLabels'];
  onUpdateLabels: (_labels: MinimalTransaction['customLabels']) => void;
};

const CustomTransactionLabels: React.FC<Props> = ({ labels, onUpdateLabels }) => {
  return <Text>{labels[0]}</Text>;
  // return (
  //   <Select
  //     placeholder="Select a Label"
  //     onValueChange={(a) => onUpdateLabels(a ? [a.value] : [])}
  //     items={CUSTOM_LABEL_OPTIONS}
  //     value={CUSTOM_LABEL_OPTIONS.find((a) => a.value === labels[0])}
  //   />
  // );
};

export default CustomTransactionLabels;
