export type Label = {
  id: number;
  title: string;
  description?: string;
  groupId: LabelGroup['id'];
  userId: string;
};

export type MinimalLabel = Omit<Label, 'userId' | 'groupId'>;

export type LabelGroup = {
  id: number;
  title: string;
  description?: string;
};

export type LabelGroupWithLabels = {
  id: number;
  title: string;
  description?: string;
  labels: MinimalLabel[];
};

export type LabelsCacheType = {
  defaultLabelGroups: LabelGroupWithLabels[];
  userLabels: MinimalLabel[];
};
