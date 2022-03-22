/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import {
  CreateCollectionAction,
  RequestWithNetwork,
  SearchCollectionAction,
  SearchTrendingsReq,
} from 'types/requests';

import actionTypes from './actionTypes';

export const searchCollections = createAction<SearchCollectionAction>(
  actionTypes.SEARCH_COLLECTIONS,
);
export const createCollection = createAction<CreateCollectionAction>(actionTypes.CREATE_COLLECTION);
export const getTrendingCollections = createAction<SearchTrendingsReq>(
  actionTypes.GET_TRENDING_COLLECTIONS,
);
export const getTopCollections = createAction<RequestWithNetwork>(actionTypes.GET_TOP_COLLECTIONS);
