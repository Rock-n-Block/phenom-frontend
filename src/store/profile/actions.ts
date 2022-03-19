import { createAction } from '@reduxjs/toolkit';

import { getProfileByIdRequest } from 'types/requests';

import profileActionTypes from './actionsTypes';

export const getProfileById = createAction<getProfileByIdRequest>(profileActionTypes.GET_PROFILE);

const profileActionCreators = {
  getProfileById,
};
export default profileActionCreators;
