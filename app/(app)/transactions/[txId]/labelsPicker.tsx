import { Heading, ScrollView, Spinner, View, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LabelCard from '@/components/labels/LabelCard';
import UserLabelsContainer from '@/components/labels/UserLabelsContainer';
import { useLabelsLoader } from '@/services/transactions/labels/useLabelsLoader';
import { useTransactionLoader } from '@/services/transactions/useTransactionLoader';

export default function Transactions() {
  const { txId } = useLocalSearchParams<{ txId: string }>();

  const { userLabels, defaultLabels, isLoading, labelsError, onCreateLabel, isCreatingLabel, onDeleteLabel } =
    useLabelsLoader();

  const { transaction, onUpdateTransactionLabel, isUpdatingLabel } = useTransactionLoader(parseInt(txId, 10));

  if (isLoading) return <Spinner size="large" />;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{ width: '100%' }}>
        <ScrollView>
          <VStack paddingStart="$4">
            <UserLabelsContainer
              labels={userLabels}
              isLoading={isLoading}
              error={labelsError}
              activeLabel={transaction?.label}
              onDelete={onDeleteLabel}
              onCreate={(title) => onCreateLabel({ title })}
              isCreatingLabel={isCreatingLabel}
              onUpdateTransactionLabel={(label) =>
                onUpdateTransactionLabel({
                  txId: parseInt(txId, 10),
                  labelId: label ? label.id : null,
                  labelTitle: label ? label.title : null,
                })
              }
            />
            {defaultLabels!.map((g) => (
              <View key={g.title} marginBottom="$4">
                <Heading color="$textLight100">{g.title}</Heading>

                <VStack space="sm">
                  {g.labels.map((l) => {
                    const isActive = l.id === transaction?.label?.id;
                    return (
                      <LabelCard
                        key={l.id}
                        onPress={() =>
                          onUpdateTransactionLabel({
                            txId: parseInt(txId, 10),
                            labelId: isActive ? null : l.id,
                            labelTitle: isActive ? null : l.title,
                          })
                        }
                        title={l.title}
                        isActive={isActive}
                        isDisabled={isUpdatingLabel}
                      />
                    );
                  })}
                </VStack>
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
