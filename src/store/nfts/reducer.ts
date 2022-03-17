import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBaseInfo, NftsState, TResponseCategories } from 'types';
import { TokenFull } from 'types/api/TokenFull';

const initialState: NftsState = {
  nfts: [],
  collections: [],
  detailedNft: null,
  categories: null,
  totalNftsPages: 0,
  totalCollectionsPages: 0
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
    setCategories: (state, action: PayloadAction<TResponseCategories>) => ({
      ...state,
      categories: action.payload,
    }),
    setTotalNftsPages: (state, action: PayloadAction<number>) => ({
      ...state,
      totalNftsPages: action.payload,
    }),
    setTotalCollectionsPages: (state, action: PayloadAction<number>) => ({
      ...state,
      totalCollectionsPages: action.payload,
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
    clearCollections: (state) => ({
      ...state,
      collections: [],
    }),
  },
});

export const {
  setNfts,
  setCollections,
  clearCollections,
  setDetailedNft,
  setTotalNftsPages,
  setTotalCollectionsPages,
  clearDetailedNft,
  clearNfts,
  setCategories,
} = nftsReducer.actions;

export default nftsReducer.reducer;
