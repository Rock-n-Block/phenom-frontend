import { setSingleCollection } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { camelize } from 'utils/camelize';

import { Collection } from 'types';

import { searchSingleCollection } from '../actions';
import actionTypes from '../actionTypes';

export function* searchSingleCollectionSaga({
  type,
  payload: { id, network },
}: ReturnType<typeof searchSingleCollection>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.searchSingleCollection, {
      id,
      network,
    });

    const camelizedResult = camelize(data) as Collection;

    yield put(setSingleCollection(camelizedResult));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SEARCH_SINGLE_COLLECTION, searchSingleCollectionSaga);
}
