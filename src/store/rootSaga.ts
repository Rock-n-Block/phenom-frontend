import { fork } from 'redux-saga/effects';
import collectionsSaga from 'store/collections/sagas';
import nftsSaga from 'store/nfts/sagas';
import userSaga from 'store/user/sagas';

import profileSaga from './profile/sagas';

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(nftsSaga);
  yield fork(profileSaga);
  yield fork(collectionsSaga);
}
