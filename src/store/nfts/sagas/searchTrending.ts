import { setTrending } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { camelize } from 'utils/camelize';

import { TokenFull } from 'types';

import { getTrending } from '../actions';
import actionTypes from '../actionTypes';

export function* searchTrendingSaga({
  type,
  payload: { category },
}: ReturnType<typeof getTrending>) {
  yield put(apiActions.request(type));
  const requestData = { category: String(category) };

  try {
    const { data } = yield call(baseApi.trendingTokens, requestData);

    const camelizedResult = camelize(data) as TokenFull[];

    yield put(setTrending(camelizedResult));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TRENDING, searchTrendingSaga);
}
