import nftsActionTypes from 'store/nfts/actionTypes';
import { RequestStatus } from 'types/store';

import { UIState } from 'types';

import { getUIReducer } from '.';

const initialState: UIState = {
  [nftsActionTypes.GET_CATEGORIES]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;
