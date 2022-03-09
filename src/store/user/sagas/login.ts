/* eslint-disable max-len */
import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { toast } from 'react-toastify';
import actionTypes from '../actionTypes';
import { login, updateUserInfo } from '../actions';
import { disconnectWalletState, updateWallet } from '../reducer';

export function* loginSaga({
  type, payload: {
    address,
    web3Provider,
  },
}: ReturnType<typeof login>) {
  yield put(apiActions.request(type));
  try {
    const { data: metamaskMessage } = yield call(baseApi.getMetamaskMessage);
    const signedMessage = yield call(web3Provider.eth.personal.sign, metamaskMessage, address, '');

    const { data: { key } } = yield call(baseApi.metamaskLogin, {
      address,
      msg: metamaskMessage,
      signed_msg: signedMessage,
    });

    yield put(updateWallet({
      address,
      key,
    }));

    yield put(updateUserInfo({ web3Provider }));

    toast.success(
      `Wallet connected: ${address.slice(
        0,
        5,
      )}...${address.slice(-5)}`,
    );

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
    yield put(disconnectWalletState());
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.LOGIN, loginSaga);
}
