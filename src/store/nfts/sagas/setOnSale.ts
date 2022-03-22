/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';

import { snakeize } from 'utils/camelize';

import { DEFAULT_CURRENCY } from 'appConstants';
import { Modals } from 'types';
import { SetOnSaleReq } from 'types/requests';

import { setOnSale } from '../actions';
import actionTypes from '../actionTypes';
import { approveNftSaga } from './approveNft';
import { getDetailedNftSaga } from './getDetailedNft';

export function* setOnSaleSaga({
  type,
  payload: { id, internalId, currency = DEFAULT_CURRENCY, isSingle, price, amount, web3Provider },
}: ReturnType<typeof setOnSale>) {
  yield put(apiActions.request(type));
  let requestData: Partial<SetOnSaleReq> = {};
  requestData = {
    price,
    currency,
    amount,
  };

  try {
    yield call(approveNftSaga, {
      type: actionTypes.APPROVE_NFT,
      payload: {
        id: internalId,
        isSingle,
        web3Provider,
      },
    });

    yield call(baseApi.setOnSale, {
      id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...snakeize(requestData),
    });

    yield put(
      setActiveModal({
        activeModal: Modals.SendSuccess,
        open: true,
        txHash: '',
      }),
    );

    yield call(getDetailedNftSaga, {
      type: actionTypes.GET_DETAILED_NFT,
      payload: {
        id,
      },
    });

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
  yield takeLatest(actionTypes.SET_ON_SALE, setOnSaleSaga);
}
