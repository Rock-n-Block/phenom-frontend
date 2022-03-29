/* eslint-disable max-len */

import { updateIsWhitelisted } from '../reducer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';

import { contractsConfig, ContractsNames } from 'config';
import { whitelistAbi } from 'config/abi';
import { isMainnet } from 'config/constants';

import { Chains } from 'types';

import { checkWhitelist } from '../actions';
import actionTypes from '../actionTypes';

export function* checkWhitelistSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof checkWhitelist>) {
  yield put(request(type));

  const address: string = yield select(userSelector.getProp('address'));

  try {
    const whitelistAddress: string =
      contractsConfig.contracts[ContractsNames.whitelist][isMainnet ? 'mainnet' : 'testnet']
        .address[Chains.bsc];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const contract = yield new web3Provider.eth.Contract(whitelistAbi, whitelistAddress);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isWhitelisted = yield call(contract.methods.isWhitelisted(address).call);

    yield put(updateIsWhitelisted({ isWhitelisted }));

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CHECK_WHITELIST, checkWhitelistSaga);
}
