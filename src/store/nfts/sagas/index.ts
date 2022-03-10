/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import getCategoriesSaga from './getCategories';

export default function* nftSagas() {
  yield fork(getCategoriesSaga);
}
