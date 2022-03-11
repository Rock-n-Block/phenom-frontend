/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import { Token } from 'types';

import actionTypes from './actionTypes';

export const getCategories = createAction<any>(actionTypes.GET_CATEGORIES);
export const createToken = createAction<Token>(actionTypes.CREATE_TOKEN);
