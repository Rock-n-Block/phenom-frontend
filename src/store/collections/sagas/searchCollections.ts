import { setCollections, setTotalPages } from '../reducer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import collectionsSelector from 'store/collections/selectors';

import { camelize } from 'utils/camelize';

import { TokenFull } from 'types';

import { searchCollections } from '../actions';
import actionTypes from '../actionTypes';

export function* searchCollectionsSaga({
  type,
  payload: { requestData, shouldConcat },
}: ReturnType<typeof searchCollections>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.searchCollections, requestData);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const collections = yield select(collectionsSelector.getProp('collections'));

    const camelizedResult = camelize(data.results) as TokenFull[];

    yield put(
      setCollections(shouldConcat ? [...collections, ...camelizedResult] : camelizedResult),
    );
    yield put(setTotalPages(data.total_pages));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SEARCH_COLLECTIONS, searchCollectionsSaga);
}
