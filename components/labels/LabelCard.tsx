import { Button, ButtonIcon, Pressable, Text, TrashIcon, View } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';

import { CustomLabel } from '@/types/labels.types';

type Props = {
  title: CustomLabel['title'];
  isActive?: boolean;
  isDisabled?: boolean;
  onPress: () => void;
  canDelete?: boolean;
  onDelete?: () => void;
};

const LabelCard: React.FC<Props> = ({ title, isActive, isDisabled, onPress, onDelete, canDelete }) => {
  return (
    <View>
      <View
        borderWidth={isActive ? '$2' : '$0'}
        borderColor="$success300"
        bg={isActive ? '$secondary950' : '$secondary800'}
        borderRadius="$lg"
        padding={canDelete && !isActive ? '$1' : '$2'}
        style={styles.container}
      >
        <Pressable disabled={isDisabled} style={styles.label} onPress={onPress}>
          <Text
            color={isDisabled ? '$textLight400' : '$textLight100'}
            bold
            fontSize="$sm"
            paddingStart="$2"
            isTruncated
          >
            {title}
          </Text>
        </Pressable>
        {canDelete && !isActive && (
          <Button action="negative" size="xs" onPress={onDelete}>
            <ButtonIcon as={TrashIcon} />
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
  },
});
export default LabelCard;
