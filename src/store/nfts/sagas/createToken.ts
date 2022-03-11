import { call, put } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { createToken } from '../actions';

export function* createTokenSaga({ type, payload }: ReturnType<typeof createToken>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.createNewToken, payload);
    console.log('data', data);
  } catch (err) {
    console.log(err);
  }
}
