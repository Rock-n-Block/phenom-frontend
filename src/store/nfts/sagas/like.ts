/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { like } from '../actions';
import actionTypes from '../actionTypes';

export function* likeSaga({ type, payload: { id } }: ReturnType<typeof like>) {
  yield put(apiActions.request(type));
  try {
    yield call(baseApi.like, { id });
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.LIKE, likeSaga);
}
