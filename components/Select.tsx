import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

const Select = (
  props: React.ComponentProps<typeof RNPickerSelect> & {
    innerRef?: React.MutableRefObject<RNPickerSelect>;
  },
) => <RNPickerSelect ref={props.innerRef} {...props} />;

export default Select;
