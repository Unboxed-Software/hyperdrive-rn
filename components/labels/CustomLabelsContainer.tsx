import { Heading, Spinner, View } from '@gluestack-ui/themed';

import LabelCard from '@/components/labels/LabelCard';
import { CustomLabel } from '@/types/labels.types';

type Props = {
  labels?: CustomLabel[];
  isLoading?: boolean;
  error?: string;
  onUpdateLabels: (_label: string | null) => void;
  isDisabled?: boolean;
  activeLabel?: CustomLabel['title'];
};

const CustomLabelsContainer: React.FC<Props> = ({
  labels,
  onUpdateLabels,
  isDisabled,
  activeLabel,
  isLoading,
  error,
}) => {
  if (isLoading) return <Spinner size="large" />;

  if (error) return error;

  return (
    <View marginBottom="$4">
      <Heading color="$textLight100">Custom Titles</Heading>

      {labels?.map((l) => {
        const isActive = l.title === activeLabel;
        return (
          <LabelCard
            key={l.id}
            onPress={() => onUpdateLabels(isActive ? null : l.title)}
            title={l.title}
            isActive={isActive}
            isDisabled={isDisabled}
          />
        );
      })}
    </View>
  );
};

export default CustomLabelsContainer;
