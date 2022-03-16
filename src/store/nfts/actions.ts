/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import { Token } from 'types';
import { CreateCollectionAction, SearchNftAction } from 'types/requests';

import actionTypes from './actionTypes';

export const getCategories = createAction<any>(actionTypes.GET_CATEGORIES);
export const createToken = createAction<Token>(actionTypes.CREATE_TOKEN);
export const searchNfts = createAction<SearchNftAction>(actionTypes.SEARCH_NFTS);
export const createCollection = createAction<CreateCollectionAction>(actionTypes.CREATE_COLLECTION);
