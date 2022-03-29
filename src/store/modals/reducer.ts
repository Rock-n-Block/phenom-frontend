import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalProps, Modals, ModalsInitialState, ModalState } from 'types';

const initialState: ModalsInitialState = {
  modalState: {
    activeModal: Modals.none,
    txHash: '',
    open: false,
  },
  modalProps: {},
};

export const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setActiveModal: (state, action: PayloadAction<ModalState>) => ({
      ...state,
      modalState: {
        ...action.payload,
      },
    }),
    setModalProps: (state, action: PayloadAction<ModalProps>) => ({
      ...state,
      modalProps: {
        ...action.payload,
      },
    }),
    closeModal: (state) => ({
      ...state,
      modalState: {
        activeModal: Modals.none,
        txHash: '',
        open: false,
      },
    }),
  },
});

export const { setActiveModal, closeModal, setModalProps } = modalsReducer.actions;

export default modalsReducer.reducer;
