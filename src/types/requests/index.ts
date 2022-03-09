import Web3 from 'web3';

export type BodyWithToken<T = never> = {
  token?: string;
} & T;

export type ApiResponse<T = never> = {
  data: BodyWithToken<T>;
  statusCode?: number;
  error?: string;
  message?: string | string[];
};

// STAKE REQUESTS
export type StakeReq = {
  web3Provider: Web3;
  amount: string;
  stakingContractAddress: string;
};

export type UnstakeReq = {
  web3Provider: Web3;
  stakingContractAddress: string;
};

export type GetStakesReq = {
  web3Provider: Web3;
};

export type ApproveReq = {
  web3Provider: Web3;
  spender: string;
  amount: string;
};

export type CreateNewPoolReq = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  poolData: any;
  web3Provider: Web3;
};

export type GetTokenBalanceReq = {
  web3Provider: Web3;
};

export type LoginReq = {
  address: string;
  web3Provider: Web3;
};

export type UpdateUserInfoReq = {
  web3Provider: Web3;
};

export type GetDetailedNftReq = {
  id: number | string;
  web3Provider: Web3;
};

export type GetTrendingNftsReq = {
  type: string;
};

export type BuyReq = {
  id: number | string;
  web3Provider: Web3;
};

export type LikeReq = {
  id: number | string;
};

export type BidReq = {
  id: number | string;
  amount: number;
  currency: string;
  web3Provider: Web3;
};

export type GetProfileInfoReq = {
  id: number | string;
  web3Provider: Web3;
};

export type SearchNftReq = {
  page: number;
  nft_type?: any;
  attributes?: string;
  rarity?: string;
  on_timed_auc_sale?: boolean;
  order_by?: string;
  items_per_page?: number;
};

export type SearchNftAction = {
  requestData: SearchNftReq;
  shouldConcat?: boolean;
};