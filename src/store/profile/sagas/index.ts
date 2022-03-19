import { fork } from 'redux-saga/effects';

import getProfile from './getProfileById';

export default function* profileSagas() {
  yield fork(getProfile);
}
