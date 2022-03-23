import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Collection, CollectionsState, TrendingCollection } from 'types';

const initialState: CollectionsState = {
  collections: [],
  trendingCollections: [],
  topCollections: [],
  totalPages: 0,
  singleCollection: null,
};

export const collectionsReducer = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => ({
      ...state,
      collections: action.payload,
    }),
    setSingleCollection: (state, action: PayloadAction<Collection>) => ({
      ...state,
      singleCollection: action.payload,
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
    clearSingleCollection: (state) => ({
      ...state,
      singleCollection: null,
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
  setSingleCollection,
  clearSingleCollection,
} = collectionsReducer.actions;

export default collectionsReducer.reducer;
