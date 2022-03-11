/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import getCategoriesSaga from './getCategories';
import searchCollectionsSaga from './searchCollections';

export default function* nftSagas() {
  yield fork(getCategoriesSaga);
  yield fork(searchCollectionsSaga);
}
