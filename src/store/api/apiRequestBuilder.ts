import { URL } from 'appConstants';
import {
  RequestWithNetwork,
  SearchCollectionsReq,
  SearchNftReq,
  SearchTrendingsReq,
  TrackTransactionReq,
} from 'types/requests';

import accountApiCalls from './accountApiCalls';
import activityApiCalls from './activityApiCalls';
import ajax from './ajax';
import createApiCalls from './createApiCalls';
import NftApiCalls from './nftApiCalls';
import profileApiCalls from './profileApiCalls';

export const baseApi = {
  getTrendingNfts(params: { type: string }) {
    return ajax({
      method: 'get',
      url: URL.getTrendingNfts,
      params,
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
  searchCollections(params: SearchCollectionsReq) {
    return ajax({
      method: 'get',
      url: URL.searchNfts,
      params,
    });
  },
  searchSingleCollection(data: { id: string | number; network: string }) {
    return ajax({
      method: 'get',
      url: URL.getSingleCollection(data.id),
      params: { network: data.network },
    });
  },
  searchTrendingCollections(params: SearchTrendingsReq) {
    return ajax({
      method: 'get',
      url: URL.trendingCollections,
      params,
    });
  },
  getCategories() {
    return ajax({
      method: 'get',
      url: URL.getCategories,
    });
  },
  trackTransaction(data: TrackTransactionReq) {
    return ajax({
      method: 'post',
      url: URL.trackTransaction,
      data,
    });
  },
  getRates(params: RequestWithNetwork) {
    return ajax({
      method: 'get',
      url: URL.rates,
      params,
    });
  },
  ...createApiCalls,
  ...profileApiCalls,
  ...NftApiCalls,
  ...activityApiCalls,
  ...accountApiCalls,
};
