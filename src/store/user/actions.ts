import { createAction } from '@reduxjs/toolkit';

import {
  EditProfile,
  GetTokenBalanceReq,
  LoginReq,
  RequestWithNetwork,
  UpdateUserInfoReq,
} from 'types/requests';

import actionTypes from './actionTypes';

export const getTokenBalance = createAction<GetTokenBalanceReq>(actionTypes.GET_TOKEN_BALANCE);
export const login = createAction<LoginReq>(actionTypes.LOGIN);
export const updateUserInfo = createAction<UpdateUserInfoReq>(actionTypes.UPDATE_USER_INFO);
export const getSelfCollections = createAction<RequestWithNetwork>(actionTypes.GET_SELF_COLLECTION);
export const editProfileInfo = createAction<EditProfile>(actionTypes.EDIT_PROFILE_INFO);
export const checkWhitelist = createAction<UpdateUserInfoReq>(actionTypes.CHECK_WHITELIST);
export const getRates = createAction<RequestWithNetwork>(actionTypes.GET_RATES);
