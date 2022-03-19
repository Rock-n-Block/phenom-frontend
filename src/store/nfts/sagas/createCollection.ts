import { toast } from 'react-toastify';

import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { createCollection } from '../actions';
import actionTypes from '../actionTypes';

export function* createCollectionSaga({ type, payload }: ReturnType<typeof createCollection>) {
  yield put(apiActions.request(type));
  try {
    const { data } = yield call(baseApi.createNewCollection, payload);
    if (data.unique_name || data.unique_symbol) {
      Object.values(data).forEach((err) => {
        toast.error(err as any);
      });
      yield put(apiActions.error(type));
    } else {
      toast.success('Collection created successfully');
      yield put(apiActions.success(type));
    }
  } catch (err) {
    toast.error('Something went wrong');
    console.error(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_COLLECTION, createCollectionSaga);
}
