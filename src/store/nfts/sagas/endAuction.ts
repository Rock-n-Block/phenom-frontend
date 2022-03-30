/* eslint-disable max-len */
import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { Modals } from 'types';

import { endAuction } from '../actions';
import actionTypes from '../actionTypes';
import { getDetailedNftSaga } from './getDetailedNft';

export function* endAuctionSaga({
  type,
  payload: { id, web3Provider },
}: ReturnType<typeof endAuction>) {
  yield put(apiActions.request(type));

  const address: string = yield select(userSelector.getProp('address'));
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const responce = yield call(baseApi.verificateBet, { id });
    if (responce.data.invalid_bet && Object.keys(responce.data.invalid_bet).length) {
      toast.error({
        message: 'Highest bid is not correct',
      });

      yield call(getDetailedNftSaga, {
        type: actionTypes.GET_DETAILED_NFT,
        payload: {
          id,
        },
      });
    }

    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
        txHash: '',
      }),
    );

    const { data } = yield call(baseApi.endAuction, { id });

    const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
      ...data.initial_tx,
      from: address,
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
    yield call(baseApi.buyReject, {
      id,
    });
    yield put(
      setActiveModal({
        activeModal: err.code === 4001 ? Modals.ApproveRejected : Modals.ApproveError,
        open: true,
        txHash: '',
      }),
    );
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.END_AUCTION, endAuctionSaga);
}
