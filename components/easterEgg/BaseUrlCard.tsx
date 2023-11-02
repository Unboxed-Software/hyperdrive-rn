import { Pressable, Text, View } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Label } from '@/types/labels.types';

type Props = {
  title: Label['title'];
  isActive?: boolean;
  onPress: () => void;
};

const BaseUrlCard: React.FC<Props> = ({ title, isActive, onPress }) => {
  return (
    <View>
      <View
        borderWidth={isActive ? '$2' : '$0'}
        borderColor="$success300"
        bg={isActive ? '$secondary950' : '$secondary800'}
        borderRadius="$lg"
        padding="$2"
        style={styles.container}
      >
        <Pressable style={styles.label} onPress={onPress}>
          <Text color="$textLight100" bold fontSize="$sm" paddingStart="$2" isTruncated>
            {title}
          </Text>
        </Pressable>
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
export default BaseUrlCard;
