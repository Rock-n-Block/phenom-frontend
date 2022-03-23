import { setNfts, setTotalPages } from '../reducer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { camelize, snakeize } from 'utils/camelize';

import { TokenFull } from 'types';

import { getLikedNFTs } from '../actions';
import actionTypes from '../actionTypes';

export function* getLikedNFTsSaga({ type, payload }: ReturnType<typeof getLikedNFTs>) {
  yield put(apiActions.request(type));
  const { userId, network, page, shouldConcat } = payload;
  try {
    const { data } = yield call(baseApi.searchNfts, snakeize({ userId, network, page }));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const nfts = yield select(nftSelector.getProp('nfts'));
    const camelizedResult = camelize(data.results) as TokenFull[];

    yield put(setNfts(shouldConcat ? [...nfts, ...camelizedResult] : camelizedResult));
    yield put(setTotalPages(data.total_pages));

    yield put(apiActions.success(type));
  } catch (e: any) {
    console.error(e);
    yield put(apiActions.error(type, e));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_LIKED, getLikedNFTsSaga);
}
