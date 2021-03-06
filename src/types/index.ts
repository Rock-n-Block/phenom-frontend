import { NftsState, ProfileState } from './store';
import { CollectionsState } from './store/collections';
import { ModalsInitialState } from './store/modals';
import { UserState } from './store/user';

import { i18n } from 'i18next';

export * from './components';
export * from './hooks';
export * from './config';
export * from './context';
export * from './store';
export * from './api';
export * from './response';

declare global {
  interface Window {
    i18n: i18n;
    ethereum: unknown;
  }
}

export interface ICurrency {
  image: string;
  name: string;
  rate: string;
  symbol: string;
}

export interface IBaseInfo {
  is_verificated: TOptionable<boolean>;
  address: string;
  avatar: string;
  id: number;
  name: string;
  display_theme: 'Padded' | 'Contained' | 'Covered';
}

export interface IBidder {
  amount: string | number;
  bidder: string;
  bidder_avatar: string;
  bidder_id: number | string;
  currency: ICurrency;
  id: number | string;
}

export type State = {
  user: UserState;
  modals: ModalsInitialState;
  nfts: NftsState;
  profile: ProfileState;
  collections: CollectionsState;
};

export interface IOwner extends Omit<IBaseInfo, 'address'> {
  price: number;
  quantity: number;
  currency: ICurrency;
}

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export enum CategoryName {
  rooms = 'Rooms',
  area = 'Area',
  skins = 'Skins',
  buildings = 'Buildings',
  allCategories = 'All categories',
}