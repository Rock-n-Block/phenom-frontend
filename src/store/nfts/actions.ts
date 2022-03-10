/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import actionTypes from './actionTypes';

export const getCategories = createAction<any>(actionTypes.GET_CATEGORIES);
