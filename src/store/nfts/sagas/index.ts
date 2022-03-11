/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import createTokenSaga from './createToken';
import getCategoriesSaga from './getCategories';

export default function* nftSagas() {
  yield fork(getCategoriesSaga);
  yield fork(createTokenSaga);
}
