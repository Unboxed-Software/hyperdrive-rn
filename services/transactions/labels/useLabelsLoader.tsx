import { useToast } from '@gluestack-ui/themed';
import { useQuery } from '@tanstack/react-query';

import { DEFAULT_TRANSACTION_LABEL_OPTIONS, getCustomLabels } from './labels.service';

import { SimplifiedToast } from '@/components/SimplifiedToast';

const customLabelsCacheKey = 'customLabels';

const useLabelsLoader = () => {
  const toast = useToast();

  const queryKey = [customLabelsCacheKey];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: getCustomLabels,
    onError: () => {
      toast.show({
        render: ({ id }) => (
          <SimplifiedToast nativeID={id} action="error" description="Failed to get your Transaction Data" />
        ),
      });
    },
  });

  return {
    defaultLabels: DEFAULT_TRANSACTION_LABEL_OPTIONS,
    customLabels: data,
    isCustomLabelsLoading: isLoading,
    customLabelsError: error ? "Couldn't get the custom labels" : '',
  };
};

export { useLabelsLoader };
