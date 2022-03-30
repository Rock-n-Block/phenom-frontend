/* eslint-disable max-len */
import { updateRate } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { getRates } from '../actions';
import actionTypes from '../actionTypes';

export function* getRatesSaga({ type, payload }: ReturnType<typeof getRates>) {
  yield put(request(type));
  try {
    const { data } = yield call(baseApi.getRates, payload);

    yield put(updateRate({ rate: data[0].rate }));

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_RATES, getRatesSaga);
}
