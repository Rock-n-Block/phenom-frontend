import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Categories, IBaseInfo, NftsState } from 'types';
import { TokenFull } from 'types/api/TokenFull';

const initialState: NftsState = {
  nfts: [],
  collections: [],
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
    setCollections: (state, action: PayloadAction<IBaseInfo[]>) => ({
      ...state,
      collections: action.payload,
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
    clearCollections: (state) => ({
      ...state,
      collections: [],
    }),
  },
});

export const {
  setNfts,
  setCollections,
  setDetailedNft,
  setTotalPages,
  clearNfts,
  clearCollections,
  setCategories,
} = nftsReducer.actions;

export default nftsReducer.reducer;
