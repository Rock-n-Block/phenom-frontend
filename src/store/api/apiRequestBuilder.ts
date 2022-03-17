import { URL } from 'appConstants';
import { LoginReq, Token } from 'types';
import { CreateCollectionAction, RequestWithNetwork, SearchNftReq } from 'types/requests';

import ajax from './ajax';
import NftApiCalls from './nftApiCalls';

export const baseApi = {
  getMetamaskMessage() {
    return ajax({
      method: 'get',
      url: URL.getMetamaskMessage,
    });
  },
  metamaskLogin(data: LoginReq) {
    return ajax({
      method: 'post',
      url: URL.metamaskLogin,
      data,
    });
  },
  getTrendingNfts(params: { type: string }) {
    return ajax({
      method: 'get',
      url: URL.getTrendingNfts,
      params,
    });
  },
  getProfileInfo(params: { id: string | number }) {
    return ajax({
      method: 'get',
      url: URL.getProfileInfo(params.id),
    });
  },
  getSelfInfo() {
    return ajax({
      method: 'get',
      url: URL.getSelfInfo,
    });
  },
  getSelfCollections({ network }: RequestWithNetwork) {
    return ajax({
      method: 'get',
      url: URL.getSelfCollection,
      params: { network },
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  presearchNfts(params: any) {
    return ajax({
      method: 'get',
      url: URL.presearchNfts,
      params,
    });
  },
  searchNfts({ items_per_page = 6, ...params }: SearchNftReq) {    
    return ajax({
      method: 'get',
      url: URL.searchNfts,
      params: { ...params, items_per_page },
    });
  },
  getCategories() {
    return ajax({
      method: 'get',
      url: URL.getCategories,
    });
  },
  createNewToken(token: Token) {
    return ajax({
      method: 'post',
      url: URL.createNewToken,
      data: token,
    });
  },
  createNewCollection({ collection, network }: CreateCollectionAction) {
    return ajax({
      method: 'post',
      url: URL.createNewCollection,
      params: { network },
      data: collection,
    });
  },
  
  ...NftApiCalls,
};
