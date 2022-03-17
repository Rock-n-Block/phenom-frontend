/* eslint-disable max-len */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { contractsConfig, ContractsNames } from 'config';
import { isMainnet } from 'config/constants';
import { getTokenAmount } from 'utils';

import { Chains, Modals } from 'types';

import { buy } from '../actions';
import actionTypes from '../actionTypes';
import { approveSaga } from './approve';
import { getDetailedNftSaga } from './getDetailedNft';

export function* buySaga({
  type,
  payload: { id, amount, sellerId, web3Provider },
}: ReturnType<typeof buy>) {
  yield put(apiActions.request(type));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const address = yield select(userSelector.getProp('address'));
  try {
    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
        txHash: '',
      }),
    );

    const marketpalceAddress =
      contractsConfig.contracts[ContractsNames.marketpalce][isMainnet ? 'mainnet' : 'testnet']
        .address[Chains.bsc];

    const tokenAddress =
      contractsConfig?.contracts[ContractsNames.token][isMainnet ? 'mainnet' : 'testnet'].address[
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

    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
        txHash: '',
      }),
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { data } = yield call(baseApi.buy, { id, amount, sellerId });

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
  } catch (err) {
    console.log(err);

    yield put(
      setActiveModal({
        activeModal: Modals.SendRejected,
        open: true,
        txHash: '',
      }),
    );

    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BUY, buySaga);
}