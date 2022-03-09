/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';

import { getTokenBalance } from '../actions';
import actionTypes from '../actionTypes';

export function* getTokenBalanceSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getTokenBalance>) {
  yield put(request(type));
  // const {
  //   abi: tokenAbi,
  //   address: tokenAddress,
  // } = contractsConfig.contracts[ContractsNames.token][isMainnet ? 'mainnet' : 'testnet'];

  // const myAddress = yield select(userSelector.getProp('address'));
  try {
    // const tokenContract = yield (new web3Provider.eth.Contract(tokenAbi, tokenAddress[chain]));

    // const balance = yield call(tokenContract.methods.balanceOf(myAddress).call);

    // yield put(updateBalance(balance));

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKEN_BALANCE, getTokenBalanceSaga);
}
