import { setCollections } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { searchNfts } from '../actions';
import actionTypes from '../actionTypes';

export function* searchCollectionsSaga({
  type,
  payload: { requestData },
}: ReturnType<typeof searchNfts>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.searchNfts, requestData);
    yield put(setCollections(data.results));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SEARCH_NFTS, searchCollectionsSaga);
}
