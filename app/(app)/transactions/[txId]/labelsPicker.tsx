import { Divider, Heading, Pressable, ScrollView, Text, View, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLabelsLoader } from '@/services/transactions/useLabelsLoader';
import { useTransactionLoader } from '@/services/transactions/useTransactionLoader';

export default function Transactions() {
  const { txId } = useLocalSearchParams<{ txId: string }>();

  const { labels } = useLabelsLoader();
  const { transaction, onUpdateLabels, isUpdatingLabel } = useTransactionLoader(parseInt(txId, 10));

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{ width: '100%' }}>
        <ScrollView>
          <VStack paddingStart="$4">
            {labels.map((g) => (
              <View key={g.title} marginBottom="$4">
                <Heading color="$textLight100">{g.title}</Heading>
                {g.options.map((l) => {
                  if (l === transaction?.customLabels[0]) {
                    return (
                      <View key={l} borderWidth="$1" borderColor="$success300">
                        <Pressable
                          paddingVertical="$2"
                          disabled={isUpdatingLabel}
                          onPress={() =>
                            onUpdateLabels({
                              txId: parseInt(txId, 10),
                              customLabels: [],
                            })
                          }
                        >
                          <Text key={l} color="$success400" bold fontSize="$sm" paddingStart="$2">
                            {l}
                          </Text>
                        </Pressable>
                        <Divider bgColor="$trueGray900" />
                      </View>
                    );
                  }

                  return (
                    <View key={l} borderWidth="$0" borderColor="$success300">
                      <Pressable
                        paddingVertical="$2"
                        disabled={isUpdatingLabel}
                        onPress={() =>
                          onUpdateLabels({
                            txId: parseInt(txId, 10),
                            customLabels: [l],
                          })
                        }
                      >
                        <Text
                          key={l}
                          color={isUpdatingLabel ? '$textLight400' : '$textLight100'}
                          fontSize="$sm"
                          paddingStart="$2"
                        >
                          {l}
                        </Text>
                      </Pressable>
                      <Divider bgColor="$trueGray900" />
                    </View>
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
