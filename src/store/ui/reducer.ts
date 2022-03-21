import nftsActionTypes from 'store/nfts/actionTypes';
import profileActionTypes from 'store/profile/actionsTypes';
import userActionTypes from 'store/user/actionTypes';
import { RequestStatus } from 'types/store';

import { UIState } from 'types';

import { getUIReducer } from '.';

const initialState: UIState = {
  [nftsActionTypes.GET_CATEGORIES]: RequestStatus.INIT,
  [userActionTypes.GET_TOKEN_BALANCE]: RequestStatus.INIT,
  [nftsActionTypes.CREATE_TOKEN]: RequestStatus.INIT,
  [nftsActionTypes.CREATE_COLLECTION]: RequestStatus.INIT,
  [profileActionTypes.GET_PROFILE]: RequestStatus.INIT,
  [userActionTypes.EDIT_PROFILE_INFO]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;
