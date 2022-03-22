import { setTopCollections } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { camelize } from 'utils/camelize';

import { Collection } from 'types';

import { getTopCollections } from '../actions';
import actionTypes from '../actionTypes';

export function* getTopCollectionsSaga({
  type,
  payload: { network },
}: ReturnType<typeof getTopCollections>) {
  yield put(apiActions.request(type));
  const requestData = { network };

  try {
    const { data } = yield call(baseApi.getTopCollections, requestData);

    const camelizedResult = camelize(data.results) as Collection[];

    yield put(setTopCollections(camelizedResult));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOP_COLLECTIONS, getTopCollectionsSaga);
}
