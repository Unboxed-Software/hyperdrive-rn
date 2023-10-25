import { Divider, Pressable, Text, View } from '@gluestack-ui/themed';
import React from 'react';

import { CustomLabel } from '@/types/labels.types';

type Props = {
  title: CustomLabel['title'];
  isActive?: boolean;
  isDisabled?: boolean;
  onPress: () => void;
};

const LabelCard: React.FC<Props> = ({ title, isActive, isDisabled, onPress }) => {
  return (
    <View>
      <Pressable
        borderWidth={isActive ? '$2' : '$0'}
        borderColor="$success300"
        paddingVertical="$2"
        disabled={isDisabled}
        bg="$secondary900"
        onPress={onPress}
        marginVertical="$1"
        borderRadius="$lg"
        hardShadow="1"
      >
        <Text color={isDisabled ? '$textLight400' : '$textLight100'} bold fontSize="$sm" paddingStart="$2">
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export default LabelCard;
