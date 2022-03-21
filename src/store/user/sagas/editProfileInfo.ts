/* eslint-disable max-len */
import { toast } from 'react-toastify';

import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { editProfileInfo } from '../actions';
import actionTypes from '../actionTypes';

export function* editProfileInfoSaga({ type, payload }: ReturnType<typeof editProfileInfo>) {
  yield put(request(type));
  try {
    const { data } = yield call(baseApi.editProfile, payload);
    console.log(data);
    toast.success('Profile edit successfully');
    yield put(success(type));
  } catch (err) {
    console.log(err);
    toast.error(`Error ${err}`);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.EDIT_PROFILE_INFO, editProfileInfoSaga);
}
