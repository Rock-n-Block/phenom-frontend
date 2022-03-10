import { ModalsInitialState } from './store/modals';
import { UserState } from './store/user';

import { i18n } from 'i18next';

import { Category } from './api/Category';
import { TokenFull } from './api/TokenFull';

export * from './components';
export * from './hooks';
export * from './config';
export * from './context';
export * from './store';

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
export interface INft {
  USD_price: number;
  available: number;
  auction_amount: TNullable<number>;
  bids: IBidder[];
  collection: IBaseInfo;
  creator: IBaseInfo;
  currency: ICurrency;
  description: string;
  details: TNullable<any>;
  digital_key: TNullable<string>;
  highest_bid: TNullable<IBidder>;
  highest_bid_USD: TNullable<string | number>;
  id: number;
  internal_id: number;
  is_auc_selling: boolean;
  is_liked: boolean;
  is_selling: boolean;
  like_count: number;
  media: string;
  minimal_bid: TNullable<string>;
  name: string;
  owner_auction: any[];
  owners: IOwner | IOwner[];
  price: number;
  royalty: number;
  sellers: IOwner[];
  selling: boolean;
  service_fee: any;
  standart: 'ERC721' | 'ERC1155';
  total_supply: number;
  updated_at: number;
  format: string;
  animation: string;
  network: {
    name: string;
    native_symbol: string;
    ipfs_icon: string;
    short_name: string | null;
  };
  currency_service_fee: number;
  views: number;
  start_auction: TNullable<string>;
  end_auction: TNullable<string>;
  has_digital_key: boolean;
  is_timed_auc_selling: boolean;
}

export type NftsState = {
  nfts: TokenFull[];
  // detailedNft: TokenFull;
  totalPages: number;
  categories: TNullable<Category[]>
};

export type State = {
  user: UserState;
  modals: ModalsInitialState;
  nfts: NftsState;
};

export interface IOwner extends Omit<IBaseInfo, 'address'> {
  price: number;
  quantity: number;
  currency: ICurrency;
}

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;
