import { setNfts } from '../reducer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import nftSelector from 'store/nfts/selectors';

import { camelize } from 'utils/camelize';

import { TokenFull } from 'types';

import { searchNfts } from '../actions';
import actionTypes from '../actionTypes';

export function* searchCollectionsSaga({
  type,
  payload: { requestData, shouldConcat },
}: ReturnType<typeof searchNfts>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.searchNfts, requestData);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const nfts = yield select(nftSelector.getProp('nfts'));

    const camelizedResult = camelize(data.results) as TokenFull[];

    yield put(setNfts(shouldConcat ? [...nfts, ...camelizedResult] : camelizedResult));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SEARCH_NFTS, searchCollectionsSaga);
}
