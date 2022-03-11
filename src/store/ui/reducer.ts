import nftActionTypes from 'store/nfts/actionTypes';
import userActionTypes from 'store/user/actionTypes';
import { RequestStatus } from 'types/store';

import { UIState } from 'types';

import { getUIReducer } from '.';

const initialState: UIState = {
  [userActionTypes.GET_TOKEN_BALANCE]: RequestStatus.INIT,
  [nftActionTypes.CREATE_TOKEN]: RequestStatus.REQUEST,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;
