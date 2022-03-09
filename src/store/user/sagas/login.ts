/* eslint-disable max-len */
import { toast } from 'react-toastify';

import { disconnectWalletState, updateWallet } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { login, updateUserInfo } from '../actions';
import actionTypes from '../actionTypes';

export function* loginSaga({ type, payload: { address, web3Provider } }: ReturnType<typeof login>) {
  yield put(request(type));
  try {
    const { data: metamaskMessage } = yield call(baseApi.getMetamaskMessage);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const signedMessage = yield call(web3Provider.eth.personal.sign, metamaskMessage, address, '');

    const {
      data: { key },
    } = yield call(baseApi.metamaskLogin, {
      address,
      msg: metamaskMessage,
      signed_msg: signedMessage,
    });

    yield put(
      updateWallet({
        address,
        key,
      }),
    );

    yield put(updateUserInfo({ web3Provider }));

    toast.success(`Wallet connected: ${address.slice(0, 5)}...${address.slice(-5)}`);

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
    yield put(disconnectWalletState());
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.LOGIN, loginSaga);
}
