/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { removeFromSale } from '../actions';
import actionTypes from '../actionTypes';
import { getDetailedNftSaga } from './getDetailedNft';

export function* removeFromSaleSaga({
  type,
  payload: { id, currency },
}: ReturnType<typeof removeFromSale>) {
  yield put(apiActions.request(type));

  try {
    yield call(baseApi.removeFromSale, { id, currency });

    yield call(getDetailedNftSaga, {
      type: actionTypes.GET_DETAILED_NFT,
      payload: {
        id,
      },
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.REMOVE_FROM_SALE, removeFromSaleSaga);
}
