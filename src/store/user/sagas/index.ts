import { fork } from 'redux-saga/effects';

import editProfile from './editProfileInfo';
import getCollections from './getSelfCollection';
import getTokenBalance from './getTokenBalance';
import login from './login';
import updateUserInfo from './updateUserInfo';

export default function* userSagas() {
  yield fork(getTokenBalance);
  yield fork(login);
  yield fork(updateUserInfo);
  yield fork(getCollections);
  yield fork(editProfile);
}
