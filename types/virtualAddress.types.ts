export type VirtualAddress = {
  id: number;
  address: string;
  title: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  userId: number;
};

export type MinimalVirtualAddress = Pick<VirtualAddress, 'title' | 'id' | 'address'>;
