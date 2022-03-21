import { updateWallet } from '../reducer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { updateProfile } from 'store/profile/reducer';
import userSelector from 'store/user/selectors';

import { contractsConfig, ContractsNames } from 'config';
import { isMainnet } from 'config/constants';

import { Chains } from 'types';

import { getTokenBalance } from '../actions';
import actionTypes from '../actionTypes';
import { getTokenAmountDisplay } from 'utils';

export function* getTokenBalanceSaga({
  type,
  payload: { web3Provider, address },
}: ReturnType<typeof getTokenBalance>) {
  yield put(request(type));
  const { abi: tokenAbi, address: tokenAddress } =
    contractsConfig.contracts[ContractsNames.token][isMainnet ? 'mainnet' : 'testnet'];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const myAddress = yield select(userSelector.getProp('address'));
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tokenContract = yield new web3Provider.eth.Contract(tokenAbi, tokenAddress[Chains.bsc]);
    if (address) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const balance = yield call(tokenContract.methods.balanceOf(address).call);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const decimals = yield call(tokenContract.methods.decimals().call);
      if (myAddress === address) {
        yield put(updateWallet({ balance: getTokenAmountDisplay(balance, decimals) }));
      } else {
        yield put(updateProfile({ balance: getTokenAmountDisplay(balance, decimals) }));
      }
    }

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKEN_BALANCE, getTokenBalanceSaga);
}
