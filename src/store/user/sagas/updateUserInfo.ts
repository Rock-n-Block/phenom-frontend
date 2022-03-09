/* eslint-disable max-len */
import { disconnectWalletState, updateWallet } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { updateUserInfo } from '../actions';
import actionTypes from '../actionTypes';

export function* updateUserInfoSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof updateUserInfo>) {
  yield put(request(type));
  try {
    // TODO: get user balance
    console.log(web3Provider);
    const { data } = yield call(baseApi.getSelfInfo);

    yield put(updateWallet(data));

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
    yield put(disconnectWalletState());
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.UPDATE_USER_INFO, updateUserInfoSaga);
}
