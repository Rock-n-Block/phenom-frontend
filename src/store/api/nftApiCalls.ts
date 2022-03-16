import { DEFAULT_CURRENCY, URL } from 'appConstants';
import { BidReq, CreateLotReq } from 'types/requests';

import ajax from './ajax';

export default {
  getTokenById(params: { id: string | number }) {
    return ajax({
      method: 'get',
      url: URL.getTokenById(params.id),
    });
  },
  // like(data: { id: string | number }) {
  //   return ajax({
  //     method: 'post',
  //     url: URL.like,
  //     data,
  //   });
  // },
  buy(data: { id: string | number }) {
    return ajax({
      method: 'post',
      url: URL.buy,
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
  removeFromSale(data: { id: string | number }) {
    return ajax({
      method: 'patch',
      url: URL.getTokenById(data.id),
      data: {
        selling: false,
      },
    });
  },
  setOnAuction(data: CreateLotReq) {
    return ajax({
      method: 'post',
      url: URL.set_on_auction(data.id),
      data: {
        selling: true,
        ...data,
      },
    });
  },
  bid({ amount, id, currency }: BidReq) {
    return ajax({
      method: 'post',
      url: URL.bid,
      data: {
        amount,
        currency,
        token_id: id,
      },
    });
  },
};
