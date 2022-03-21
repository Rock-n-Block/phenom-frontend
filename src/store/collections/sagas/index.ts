/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import createCollectionSaga from './createCollection';
import searchCollectionsSaga from './searchCollections';

export default function* collectionsSagas() {
  yield fork(searchCollectionsSaga);
  yield fork(createCollectionSaga);
}
