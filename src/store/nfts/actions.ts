/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import { Token } from 'types';
import {
  ApproveNftReq,
  ApproveReq,
  BidReq,
  BuyReq,
  SetOnAuctionPreReq,
  GetDetailedNftReq,
  SearchNftAction,
} from 'types/requests';

import actionTypes from './actionTypes';

export const getCategories = createAction<any>(actionTypes.GET_CATEGORIES);
export const createToken = createAction<Token>(actionTypes.CREATE_TOKEN);
export const searchNfts = createAction<SearchNftAction>(actionTypes.SEARCH_NFTS);
export const getDetailedNft = createAction<GetDetailedNftReq>(actionTypes.GET_DETAILED_NFT);
export const buy = createAction<BuyReq>(actionTypes.BUY);
export const approve = createAction<ApproveReq>(actionTypes.APPROVE);
export const setOnAuction = createAction<SetOnAuctionPreReq>(actionTypes.SET_ON_AUCTION);
export const approveNft = createAction<ApproveNftReq>(actionTypes.APPROVE_NFT);
export const bid = createAction<BidReq>(actionTypes.BID);
