/* eslint-disable max-len */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { contractsConfig, ContractsNames } from 'config';
import { nftAbi } from 'config/abi';
import { isMainnet } from 'config/constants';

import { Chains, Modals } from 'types';

import { approveNft } from '../actions';
import actionTypes from '../actionTypes';

export function* approveNftSaga({
  type,
  payload: { id, web3Provider },
}: ReturnType<typeof approveNft>) {
  yield put(apiActions.request(type));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const myAddress = yield select(userSelector.getProp('address'));
  try {
    const nftAddress =
      contractsConfig.contracts[ContractsNames.nft][isMainnet ? 'mainnet' : 'testnet'].address[
        Chains.bsc
      ];
    const marketpalceAddress =
      contractsConfig.contracts[ContractsNames.marketpalce][isMainnet ? 'mainnet' : 'testnet']
        .address[Chains.bsc];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const nftContract = yield new web3Provider.eth.Contract(nftAbi, nftAddress);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const approvedContractAddress = yield call(nftContract.methods.getApproved(id).call);
    if (approvedContractAddress === marketpalceAddress) {
      yield put(apiActions.success(type));
      return;
    }

    yield put(
      setActiveModal({
        activeModal: Modals.ApprovePending,
        open: true,
        txHash: ''
      }),
    );

    yield call(nftContract.methods.approve(marketpalceAddress, id).send, {
      from: myAddress,
    });

    yield put(
      setActiveModal({
        activeModal: Modals.none,
        open: false,
        txHash: ''
      }),
    );

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(
      setActiveModal({
        activeModal: Modals.ApproveRejected,
        open: true,
        txHash: ''
      }),
    );

    yield put(apiActions.error(type, err));
    throw new Error('Approve Error');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE_NFT, approveNftSaga);
}
