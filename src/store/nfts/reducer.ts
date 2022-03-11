import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Categories, NftsState } from 'types';
import { TokenFull } from 'types/api/TokenFull';

const initialState: NftsState = {
  nfts: [],
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
    setCategories: (state, action: PayloadAction<Categories[]>) => ({
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
  clearNfts,
  setCategories
} = nftsReducer.actions;

export default nftsReducer.reducer;
