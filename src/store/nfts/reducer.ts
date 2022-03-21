import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NftsState, TResponseCategories } from 'types';
import { TokenFull } from 'types/api/TokenFull';

const initialState: NftsState = {
  nfts: [],
  detailedNft: null,
  categories: null,
  totalPages: 0,
};

export const nftsReducer = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setNfts: (state, action: PayloadAction<TokenFull[]>) => ({
      ...state,
      nfts: action.payload,
    }),
    setCategories: (state, action: PayloadAction<TResponseCategories>) => ({
      ...state,
      categories: action.payload,
    }),
    setTotalPages: (state, action: PayloadAction<number>) => ({
      ...state,
      totalPages: action.payload,
    }),
    setDetailedNft: (state, action: PayloadAction<TokenFull>) => ({
      ...state,
      detailedNft: action.payload,
    }),
    clearDetailedNft: (state) => ({
      ...state,
      detailedNft: null,
    }),
    clearNfts: (state) => ({
      ...state,
      nfts: [],
    }),
  },
});

export const {
  setNfts,
  setDetailedNft,
  setTotalPages,
  clearDetailedNft,
  clearNfts,
  setCategories,
} = nftsReducer.actions;

export default nftsReducer.reducer;
