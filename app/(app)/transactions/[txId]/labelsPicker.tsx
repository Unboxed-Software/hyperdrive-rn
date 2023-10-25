import { Divider, Heading, Pressable, ScrollView, Text, View, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomLabelsContainer from '@/components/labels/CustomLabelsContainer';
import LabelCard from '@/components/labels/LabelCard';
import { useLabelsLoader } from '@/services/transactions/labels/useLabelsLoader';
import { useTransactionLoader } from '@/services/transactions/useTransactionLoader';

export default function Transactions() {
  const { txId } = useLocalSearchParams<{ txId: string }>();

  const { customLabels, defaultLabels, isCustomLabelsLoading, customLabelsError } = useLabelsLoader();

  const { transaction, onUpdateLabels, isUpdatingLabel } = useTransactionLoader(parseInt(txId, 10));

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{ width: '100%' }}>
        <ScrollView>
          <VStack paddingStart="$4">
            <CustomLabelsContainer
              labels={customLabels}
              isLoading={isCustomLabelsLoading}
              error={customLabelsError}
              activeLabel={transaction?.labels[0]}
              onUpdateLabels={(label) =>
                onUpdateLabels({
                  txId: parseInt(txId, 10),
                  labels: label ? [label] : [],
                })
              }
            />
            {defaultLabels.map((g) => (
              <View key={g.title} marginBottom="$4">
                <Heading color="$textLight100">{g.title}</Heading>
                {g.options.map((l) => {
                  const isActive = l === transaction?.labels[0];
                  return (
                    <LabelCard
                      key={l}
                      onPress={() =>
                        onUpdateLabels({
                          txId: parseInt(txId, 10),
                          labels: isActive ? [] : [l],
                        })
                      }
                      title={l}
                      isActive={isActive}
                      isDisabled={isUpdatingLabel}
                    />
                  );
                })}
              </View>
            ))}
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
