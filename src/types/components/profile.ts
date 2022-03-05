export type TAvailableSocials = 'email' | 'instagram' | 'twitter' | 'site';

type TSocial = {
  [key in TAvailableSocials]: string;
};

export interface IProfile {
  id: number;
  avatarURL: string;
  name: string;
  balance: string;
  currency: string;
  address: string;
  socials: TSocial;
  description: string;
}

export type TSort = {
  field: string | null;
  dir: 'asc' | 'desc' | null;
  name: string;
};

export const TAvailableSorts: TSort[] = [
  { field: null, dir: null, name: 'Sort by' },
  { field: 'price', dir: 'asc', name: 'Price: Low to High' },
  { field: 'price', dir: 'desc', name: 'Price: High to Low' },
  { field: 'date', dir: 'asc', name: 'Date: Old' },
  { field: 'date', dir: 'desc', name: 'Date: New' },
];
