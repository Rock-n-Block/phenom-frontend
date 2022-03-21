import { fork } from 'redux-saga/effects';
import nftsSaga from 'store/nfts/sagas';
import userSaga from 'store/user/sagas';

import profileSaga from './profile/sagas';

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(nftsSaga);
  yield fork(profileSaga);
}
