import { request } from '@services/request';

import { Alias } from '@/types/aliases.types';

export const getAliases = async () => {
  const res = await request<{ aliases: Alias[] }>('me/aliases');
  return res.aliases;
};

export const createAlias = async ({ fields }: { fields: Pick<Alias, 'title' | 'description' | 'address'> }) => {
  const res = await request<{ alias: Alias }>('me/aliases', {
    data: { fields },
    method: 'POST',
  });
  return res.alias;
};

export const deleteAlias = async (aliasId: Alias['id']) => {
  const res = await request<{ alias: Alias }>(`me/aliases/${aliasId}`, {
    method: 'DELETE',
  });
  return res.alias;
};

export const editAlias = async ({ id, fields }: { id: Alias['id']; fields: Pick<Alias, 'title' | 'description'> }) => {
  const res = await request<{ alias: Alias }>(`me/aliases/${id}`, {
    method: 'PUT',
    data: { fields },
  });
  return res.alias;
};
