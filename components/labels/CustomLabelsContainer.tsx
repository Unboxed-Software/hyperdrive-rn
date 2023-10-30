import { Heading, Spinner, View, VStack } from '@gluestack-ui/themed';

import CreateCustomLabelInput from './CreateCustomLabelInput';

import LabelCard from '@/components/labels/LabelCard';
import { CustomLabel } from '@/types/labels.types';

type Props = {
  labels?: CustomLabel[];
  isLoading?: boolean;
  error?: string;
  onUpdateLabels: (_label: string | null) => void;
  isDisabled?: boolean;
  activeLabel?: CustomLabel['title'];
  onDelete: (_: { labelId: CustomLabel['id'] }) => void;
  onCreate: (_title: CustomLabel['title']) => void;
  isCreatingLabel?: boolean;
};

const CustomLabelsContainer: React.FC<Props> = ({
  labels,
  onUpdateLabels,
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
      <Heading color="$textLight100">Custom Labels</Heading>

      <VStack space="sm">
        {labels?.map((l) => {
          const isActive = l.title === activeLabel;
          return (
            <LabelCard
              key={l.id}
              onPress={() => onUpdateLabels(isActive ? null : l.title)}
              title={l.title}
              isActive={isActive}
              isDisabled={isDisabled}
              onDelete={() => onDelete({ labelId: l.id })}
              canDelete
            />
          );
        })}
        <CreateCustomLabelInput onCreate={onCreate} isCreatingLabel={isCreatingLabel} />
      </VStack>
    </View>
  );
};

export default CustomLabelsContainer;
