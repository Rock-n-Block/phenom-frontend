/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';

import { contractsConfig, ContractsNames } from 'config';
import { isMainnet } from 'config/constants';
import { getTokenAmount } from 'utils';

import { Chains, Modals } from 'types';

import { bid } from '../actions';
import actionTypes from '../actionTypes';
import { approveSaga } from './approve';
import { getDetailedNftSaga } from './getDetailedNft';

export function* bidNftSaga({
  type,
  payload: { id, currency, amount, web3Provider },
}: ReturnType<typeof bid>) {
  yield put(apiActions.request(type));

  try {
    const marketpalceAddress =
      contractsConfig.contracts[ContractsNames.marketpalce][isMainnet ? 'mainnet' : 'testnet']
        .address[Chains.bsc];
    const tokenAddress =
      contractsConfig.contracts[ContractsNames.token][isMainnet ? 'mainnet' : 'testnet'].address[
        Chains.bsc
      ];

    yield call(approveSaga, {
      type: actionTypes.APPROVE,
      payload: {
        web3Provider,
        amount: getTokenAmount(amount),
        spender: marketpalceAddress,
        tokenAddress,
      },
    });

    yield call(baseApi.bid, {
      token_id: id,
      amount,
      currency,
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
        txHash: '',
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
  yield takeLatest(actionTypes.BID, bidNftSaga);
}
