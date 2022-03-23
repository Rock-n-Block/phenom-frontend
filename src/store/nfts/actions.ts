/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import {
  ApproveNftReq,
  ApproveReq,
  BidReq,
  BurnTokenReq,
  BuyReq,
  CreateTokenRequest,
  EndAucReq,
  GetDetailedNftReq,
  GetLikedNFTsRequest,
  GetTrendingNftsReq,
  LikeReq,
  SearchNftAction,
  SetOnAuctionPreReq,
  SetOnSalePreReq,
  TrackTransactionReq,
  TransferTokenReq,
} from 'types/requests';

import actionTypes from './actionTypes';

export const getCategories = createAction<any>(actionTypes.GET_CATEGORIES);
export const createToken = createAction<CreateTokenRequest>(actionTypes.CREATE_TOKEN);
export const searchNfts = createAction<SearchNftAction>(actionTypes.SEARCH_NFTS);
export const presearchNfts = createAction<SearchNftAction>(actionTypes.PRESEARCH_NFTS);
export const getDetailedNft = createAction<GetDetailedNftReq>(actionTypes.GET_DETAILED_NFT);
export const buy = createAction<BuyReq>(actionTypes.BUY);
export const approve = createAction<ApproveReq>(actionTypes.APPROVE);
export const setOnAuction = createAction<SetOnAuctionPreReq>(actionTypes.SET_ON_AUCTION);
export const setOnSale = createAction<SetOnSalePreReq>(actionTypes.SET_ON_SALE);
export const approveNft = createAction<ApproveNftReq>(actionTypes.APPROVE_NFT);
export const bid = createAction<BidReq>(actionTypes.BID);
export const removeFromSale = createAction<any>(actionTypes.REMOVE_FROM_SALE);
export const like = createAction<LikeReq>(actionTypes.LIKE);
export const endAuction = createAction<EndAucReq>(actionTypes.END_AUCTION);
export const trackTransaction = createAction<TrackTransactionReq>(actionTypes.TRACK_TRANSACTION);
export const getTrending = createAction<GetTrendingNftsReq>(actionTypes.GET_TRENDING);
export const transfer = createAction<TransferTokenReq>(actionTypes.TRANSFER);
export const burn = createAction<BurnTokenReq>(actionTypes.BURN);
export const getLikedNFTs = createAction<GetLikedNFTsRequest>(actionTypes.GET_LIKED);
