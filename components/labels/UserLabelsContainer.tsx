import { Heading, Spinner, View, VStack } from '@gluestack-ui/themed';

import CreateLabelInput from './CreateLabelInput';

import LabelCard from '@/components/labels/LabelCard';
import { MinimalLabel } from '@/types/labels.types';
import { MinimalTransaction } from '@/types/transactions.types';

type Props = {
  labels?: MinimalLabel[];
  isLoading?: boolean;
  error?: string;
  onUpdateTransactionLabel: (_label: MinimalTransaction['label']) => void;
  isDisabled?: boolean;
  activeLabel?: MinimalTransaction['label'];
  onDelete: (_: { labelId: MinimalLabel['id'] }) => void;
  onCreate: (_title: MinimalLabel['title']) => void;
  isCreatingLabel?: boolean;
};

const UserLabelsContainer: React.FC<Props> = ({
  labels,
  onUpdateTransactionLabel,
  isDisabled,
  activeLabel,
  isLoading,
  error,
  onDelete,
  onCreate,
  isCreatingLabel,
}) => {
  if (isLoading) return <Spinner size="large" />;

  if (error) return error;

  return (
    <View marginBottom="$4">
      <Heading color="$textLight100">Labels</Heading>

      <VStack space="sm">
        {labels?.map((l) => {
          const isActive = l.id === activeLabel?.id;
          return (
            <LabelCard
              key={l.id}
              onPress={() => onUpdateTransactionLabel(isActive ? null : l)}
              title={l.title}
              isActive={isActive}
              isDisabled={isDisabled}
              onDelete={() => onDelete({ labelId: l.id })}
              canDelete
            />
          );
        })}
        <CreateLabelInput onCreate={onCreate} isCreatingLabel={isCreatingLabel} />
      </VStack>
    </View>
  );
};

export default UserLabelsContainer;
