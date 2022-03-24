import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileState } from 'types';

const initialState: ProfileState = {
  address: undefined,
  avatar: undefined,
  bio: undefined,
  cover: undefined,
  createdAt: undefined,
  customUrl: undefined,
  displayName: undefined,
  facebook: undefined,
  followers: undefined,
  followersCount: undefined,
  follows: undefined,
  followsCount: undefined,
  id: undefined,
  instagram: undefined,
  isVerificated: undefined,
  name: undefined,
  site: undefined,
  twitter: undefined,
  url: undefined,
  email: undefined,
  balance: '0',
  collections: [],
};

export const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { updateProfile } = profileReducer.actions;
export default profileReducer.reducer;