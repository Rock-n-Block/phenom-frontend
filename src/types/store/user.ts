import { Collection } from 'types';

export type UserState = {
  id: number | null;
  avatar: string;
  address: string;
  balance: string | number;
  key: string;
  provider: string;
  chain: string;
  displayName: string;
  collections: Collection[];
  isWhitelisted: boolean,
  // rates: 
};

export type LoginReq = {
  address: string;
  msg: string;
  signed_msg: string;
};
