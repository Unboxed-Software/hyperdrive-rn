import { Divider, ScrollView, Spinner, VStack } from '@gluestack-ui/themed';
import { useAliasesLoader } from '@services/aliases/useAliasesLoader';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AliasCard from '@/components/aliases/AliasCard';
import CreateAliasButton from '@/components/aliases/CreateAliasButton';

export default function Aliases() {
  const { aliases, isLoading, onEdit, onCreate, onDelete, isDeleting } = useAliasesLoader();

  if (isLoading) return <Spinner size="large" />;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{ width: '100%' }}>
        <ScrollView>
          <VStack space="sm">
            {aliases.map((alias) => (
              <AliasCard
                onDelete={() => onDelete(alias.id)}
                isDeleting={isDeleting}
                onEdit={({ fields }) => onEdit({ id: alias.id, fields })}
                key={alias.id}
                title={alias.title}
                description={alias.description}
                addressText={alias.address}
              />
            ))}
            <Divider marginVertical="$2" />
            <CreateAliasButton onCreate={onCreate} />
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
  },
});
