import { Collection, User } from 'types/api';

export type AdditionalUserInfo = {
  balance: string;
  collections: Collection[];
};

export type ProfileState = User & AdditionalUserInfo;
