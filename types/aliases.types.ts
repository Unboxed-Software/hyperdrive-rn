export type Alias = {
  id: number;
  address: string;
  title: string;
  description: string | null;
  createdAt: Date;
  userId: number;
};

export type MinimalAlias = Omit<Alias, 'userId' | 'createdAt'>;

export type AliasMapItem = Pick<Alias, 'id' | 'address' | 'title' | 'description'> & { isVAddress?: boolean };
