import { request } from '@services/request';

import { Label, LabelGroupWithLabels, MinimalLabel } from '@/types/labels.types';

export const getLabels = async () => {
  const res = await request<{
    defaultLabelGroups: LabelGroupWithLabels[];
    userLabels: MinimalLabel[];
  }>(`me/labels/all`);
  return res;
};

export const deleteLabel = async ({ labelId }: { labelId: Label['id'] }) => {
  const res = await request<{ label: Label }>(`me/labels/user/${labelId}`, {
    method: 'Delete',
  });
  return res.label;
};

export const addLabel = async (fields: Pick<Label, 'title' | 'description'>) => {
  const res = await request<{ label: Label }>(`me/labels/user`, {
    method: 'POST',
    data: { fields },
  });
  return res.label;
};
