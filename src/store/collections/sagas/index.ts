/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import createCollectionSaga from './createCollection';
import getTopCollectionsSaga from './getTopCollections';
import searchCollectionsSaga from './searchCollections';
import searchSingleCollectionSaga from './searchSingleCollection';

export default function* collectionsSagas() {
  yield fork(searchCollectionsSaga);
  yield fork(createCollectionSaga);
  yield fork(getTopCollectionsSaga);
  yield fork(searchSingleCollectionSaga);
}
