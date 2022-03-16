/* eslint-disable max-len */
import { updateCollections } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { getSelfCollections } from '../actions';
import actionTypes from '../actionTypes';

export function* getSelfCollectionsSaga({ type, payload }: ReturnType<typeof getSelfCollections>) {
  yield put(request(type));
  try {
    const { data } = yield call(baseApi.getSelfCollections, payload);

    yield put(updateCollections({ collections: data.results }));

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_SELF_COLLECTION, getSelfCollectionsSaga);
}
