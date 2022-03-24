/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { like } from '../actions';
import actionTypes from '../actionTypes';

export function* likeSaga({
  type,
  payload: { id, successCallback, errorCallback },
}: ReturnType<typeof like>) {
  yield put(apiActions.request(type));
  try {
    yield call(baseApi.like, { id });
    successCallback?.();
  } catch (err) {
    console.log(err);
    errorCallback?.();
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.LIKE, likeSaga);
}
