import Select from '@components/Select';
import { Pressable, Text, View } from '@gluestack-ui/themed';
import { useRef, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

import { SOLANA_EXPLORER_OPTIONS, SolanaExplorerType } from '@/types/user.types';

type Props = {
  value: SolanaExplorerType;
  onChange: (_value: SolanaExplorerType) => void;
};

export default function SolanaExplorer({ value, onChange }: Props) {
  const pickerRef = useRef<RNPickerSelect>();
  const [explorer, setExplorer] = useState(value);

  const options = Object.entries(SOLANA_EXPLORER_OPTIONS).map(([value, label]) => ({
    label,
    value,
  }));

  const handleOpen = () => {
    pickerRef?.current?.togglePicker(true);
  };

  return (
    <Pressable
      onPress={handleOpen}
      bg="$secondary800"
      borderRadius="$lg"
      padding="$3"
      flexDirection="row"
      alignItems="center"
    >
      <View>
        <Text color="$textLight100" bold fontSize="$sm" paddingStart="$2" isTruncated>
          Explorer:
        </Text>
      </View>
      <Select
        // @ts-ignore
        innerRef={pickerRef}
        placeholder={{}}
        style={{
          viewContainer: {
            flex: 1,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'stretch',
          },
          inputIOS: {
            color: '#E5E5E5',
            alignItems: 'center',
            textAlign: 'right',
          },
        }}
        onValueChange={(newValue) => {
          setExplorer(newValue);
        }}
        items={options}
        value={explorer}
        onDonePress={() => {
          onChange(explorer);
        }}
      />
    </Pressable>
  );
}
