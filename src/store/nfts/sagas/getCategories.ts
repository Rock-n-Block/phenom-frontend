import { setCategories } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { getCategories } from '../actions';
import actionTypes from '../actionTypes';

export function* getCategoriesSaga({ type }: ReturnType<typeof getCategories>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.getCategories);
    console.log('data', data);
    yield put(setCategories(data));

  } catch (err) {
    console.log(err);
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_CATEGORIES, getCategoriesSaga);
}
