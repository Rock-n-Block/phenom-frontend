/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import { CreateCollectionAction, SearchCollectionAction } from 'types/requests';

import actionTypes from './actionTypes';

export const searchCollections = createAction<SearchCollectionAction>(
  actionTypes.SEARCH_COLLECTIONS,
);
export const createCollection = createAction<CreateCollectionAction>(actionTypes.CREATE_COLLECTION);
