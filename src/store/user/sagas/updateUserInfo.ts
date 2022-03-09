/* eslint-disable max-len */
import { put, takeLatest, call } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import actionTypes from '../actionTypes';
import { updateUserInfo } from '../actions';
import { disconnectWalletState, updateWallet } from '../reducer';

export function* updateUserInfoSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof updateUserInfo>) {
  yield put(apiActions.request(type));
  try {
    // TODO: get user balance
    console.log(web3Provider);
    const { data } = yield call(baseApi.getSelfInfo);

    yield put(updateWallet(data));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
    yield put(disconnectWalletState());
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.UPDATE_USER_INFO, updateUserInfoSaga);
}
