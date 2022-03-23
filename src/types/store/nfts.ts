import { IBaseInfo, IBidder, ICurrency, IOwner, TNullable, TResponseCategories } from "types";
import { TokenFull } from "types/api/TokenFull";

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
  presearchedNfts: TokenFull[];
  detailedNft: TNullable<TokenFull>;
  totalPages: number;
  categories: TNullable<TResponseCategories>;
  trending: TokenFull[]
};