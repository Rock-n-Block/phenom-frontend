import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Chains, UserState } from 'types';

const initialState: UserState = {
  id: null,
  avatar: '',
  address: '',
  balance: 0,
  key: '',
  provider: '',
  displayName: '',
  collections: [],
  chain: Chains.bsc,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateWallet: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateProvider: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateChain: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    connectWalletState: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateCollections: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    disconnectWalletState: () => {
      localStorage.removeItem('phenom-wallet-connect');
      return {
        ...initialState,
      };
    },
  },
});

export const {
  connectWalletState,
  disconnectWalletState,
  updateWallet,
  updateProvider,
  updateCollections,
  updateChain,
} = userReducer.actions;

export default userReducer.reducer;
