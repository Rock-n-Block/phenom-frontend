import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import {
  put, call, select, CallEffect, PutEffect, SelectEffect,
} from 'redux-saga/effects';
import { validateStatus } from '../../utils/validateStatus';
import { disconnectWalletState } from '../user/reducer';
import userSelector from '../user/selectors';

const client: AxiosInstance = axios.create({
  baseURL: 'https://phenom.rocknblock.io/api/v1/',
  validateStatus,
});

export default function* ajax(
  config: AxiosRequestConfig,
): Generator<SelectEffect | CallEffect | PutEffect> {
  const accessToken = yield select(userSelector.getProp('key'));

  if (accessToken) {
    client.defaults.headers.common['Authorization'] = `Token ${accessToken}`;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response: AxiosResponse<ApiResponse<unknown>> =
    yield call<(configVar: AxiosRequestConfig) => void>(client, config);

  if (accessToken && response.status === 401) {
    yield put(disconnectWalletState());
  }

  return response;
}
