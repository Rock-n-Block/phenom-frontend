import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { createTokenResponse, Modals } from 'types';

import { createToken } from '../actions';
import actionTypes from '../actionTypes';

export function* createTokenSaga({ type, payload }: ReturnType<typeof createToken>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.createNewToken, payload.token);
    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
        txHash: '',
      }),
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const address = yield select(userSelector.getProp('address'));
    const { initial_tx, token } = data as createTokenResponse;
    if (initial_tx) {
      try {
        const { transactionHash } = yield call(payload.web3.eth.sendTransaction, {
          ...initial_tx,
          from: address,
        });
        yield put(
          setActiveModal({
            activeModal: Modals.SendSuccess,
            open: true,
            txHash: transactionHash,
          }),
        );
        yield put(apiActions.success(type));
      } catch (e) {
        yield call(baseApi.removeReject, {
          id: token.id,
          owner: token.creator.url,
        });
        yield put(
          setActiveModal({
            activeModal: Modals.SendRejected,
            open: true,
            txHash: '',
          }),
        );

        yield put(apiActions.error(type, e));
      }
    } else {
      Object.values(data).forEach((err) => {
        toast.error(err as any);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_TOKEN, createTokenSaga);
}
