import collectionsActionTypes from 'store/collections/actionTypes';
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
  [collectionsActionTypes.CREATE_COLLECTION]: RequestStatus.INIT,
  [profileActionTypes.GET_PROFILE]: RequestStatus.INIT,
  [userActionTypes.EDIT_PROFILE_INFO]: RequestStatus.INIT,
  [nftsActionTypes.GET_LIKED]: RequestStatus.INIT,
  [nftsActionTypes.LIKE]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;
