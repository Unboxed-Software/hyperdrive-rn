import { CloseIcon, Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed';
import React from 'react';

type Props = {
  value: string;
  onChange: (_value: string) => void;
  debounce?: number;
  isClearable?: boolean;
} & Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value'>;

const DebouncedInput: React.FC<Props> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  isClearable = false,
  ...props
}) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(String(value));
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input>
      <InputField {...props} />
      {isClearable && value.length > 0 && (
        <InputSlot onPress={() => setValue('')} pl="$3">
          <InputIcon as={CloseIcon} />
        </InputSlot>
      )}
    </Input>
  );
};

export default DebouncedInput;
