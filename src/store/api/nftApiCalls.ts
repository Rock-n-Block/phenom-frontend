import { DEFAULT_CURRENCY, URL } from 'appConstants';
import { SetOnAuctionReq, SetOnSaleReq } from 'types/requests';

import ajax from './ajax';

export default {
  getTokenById(params: { id: string | number }) {
    return ajax({
      method: 'get',
      url: URL.getTokenById(params.id),
    });
  },
  like(data: { id: string | number }) {
    return ajax({
      method: 'post',
      url: URL.like,
      data,
    });
  },
  buy(data: { id: string | number; amount: string | number; sellerId: string | number }) {
    return ajax({
      method: 'post',
      url: URL.buy,
      data,
    });
  },
  bid(data: { token_id: number | string; amount: number | string; currency: string }) {
    return ajax({
      method: 'post',
      url: URL.bid,
      data,
    });
  },
  changePrice(data: { id: string | number; price: string | number }) {
    return ajax({
      method: 'patch',
      url: URL.getTokenById(data.id),
      data: {
        price: data.price,
        currency: DEFAULT_CURRENCY,
      },
    });
  },
  removeFromSale(data: { id: string | number; currency: string }) {
    return ajax({
      method: 'post',
      url: URL.setOnSale(data.id),
      data: {
        selling: false,
        ...data,
      },
    });
  },
  setOnAuction(data: SetOnAuctionReq) {
    return ajax({
      method: 'post',
      url: URL.setOnAuction(data.id),
      data: {
        selling: true,
        ...data,
      },
    });
  },
  setOnSale(data: SetOnSaleReq) {
    return ajax({
      method: 'post',
      url: URL.setOnSale(data.id),
      data: {
        selling: true,
        ...data,
      },
    });
  },
  verificateBet(data: { id: number | string }) {
    return ajax({
      method: 'get',
      url: URL.verificateBet(data.id),
    });
  },
  endAuction(data: { id: number | string }) {
    return ajax({
      method: 'post',
      url: URL.endAuction(data.id),
    });
  },
  trendingTokens(data: { category: string }) {
    return ajax({
      method: 'get',
      url: URL.trendingTokens,
      data,
    });
  },
  transfer(data: { id: string | number; address: string; amount: string | number }) {
    return ajax({
      method: 'post',
      url: URL.transfer(data.id),
    });
  },
};
