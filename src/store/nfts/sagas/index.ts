/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import bid from './bid';
import buy from './buy';
import createTokenSaga from './createToken';
import getCategoriesSaga from './getCategories';
import getDetailedNftSaga from './getDetailedNft';
import like from './like';
import removeFromSale from './removeFromSale';
import searchNftsSaga from './searchNfts';

export default function* nftSagas() {
  yield fork(getDetailedNftSaga);
  yield fork(searchNftsSaga);
  yield fork(buy);
  yield fork(bid);
  yield fork(getCategoriesSaga);
  yield fork(createTokenSaga);
  yield fork(removeFromSale);
  yield fork(like);
}
