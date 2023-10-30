import { CUSTOM_LABEL_OPTIONS_GROUPED } from './transactions.service';

const useLabelsLoader = () => {
  return {
    labels: CUSTOM_LABEL_OPTIONS_GROUPED,
  };
};

export { useLabelsLoader };
