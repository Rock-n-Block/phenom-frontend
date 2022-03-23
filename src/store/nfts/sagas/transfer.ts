/* eslint-disable max-len */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { Modals } from 'types';

import { transfer } from '../actions';
import actionTypes from '../actionTypes';
import { getDetailedNftSaga } from './getDetailedNft';

export function* transferSaga({
  type,
  payload: { id, address, amount, web3Provider },
}: ReturnType<typeof transfer>) {
  yield put(apiActions.request(type));

  const userAddress: string = yield select(userSelector.getProp('address'));
  try {
    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
        txHash: '',
      }),
    );
    const { data } = yield call(baseApi.transfer, { id, address, amount });

    const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
      ...data.initial_tx,
      from: userAddress,
    });

    yield call(getDetailedNftSaga, {
      type: actionTypes.GET_DETAILED_NFT,
      payload: {
        id,
      },
    });

    yield put(
      setActiveModal({
        activeModal: Modals.SendSuccess,
        open: true,
        txHash: transactionHash,
      }),
    );

    yield put(apiActions.success(type));
  } catch (err: any) {
    yield put(
      setActiveModal({
        activeModal: err.code === 4001 ? Modals.SendRejected : Modals.SendError,
        open: true,
        txHash: '',
      }),
    );
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.TRANSFER, transferSaga);
}
