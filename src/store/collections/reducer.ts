import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Collection, CollectionsState, IBaseInfo, TrendingCollection } from 'types';

const initialState: CollectionsState = {
  collections: [],
  trendingCollections: [],
  topCollections: [],
  totalPages: 0,
};

export const collectionsReducer = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<IBaseInfo[]>) => ({
      ...state,
      collections: action.payload,
    }),
    setTrendingCollections: (state, action: PayloadAction<TrendingCollection[]>) => ({
      ...state,
      trendingCollections: action.payload,
    }),
    setTopCollections: (state, action: PayloadAction<Collection[]>) => ({
      ...state,
      topCollections: action.payload,
    }),
    setTotalPages: (state, action: PayloadAction<number>) => ({
      ...state,
      totalPages: action.payload,
    }),
    clearCollections: (state) => ({
      ...state,
      collections: [],
    }),
    clearTrendingCollections: (state) => ({
      ...state,
      trendingCollections: [],
    }),
    clearTopCollections: (state) => ({
      ...state,
      topCollections: [],
    }),
  },
});

export const {
  setCollections,
  setTrendingCollections,
  setTopCollections,
  clearCollections,
  clearTrendingCollections,
  clearTopCollections,
  setTotalPages,
} = collectionsReducer.actions;

export default collectionsReducer.reducer;
