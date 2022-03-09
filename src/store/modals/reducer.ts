import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Modals, ModalState, ModalsInitialState } from 'types';

const initialState: ModalsInitialState = {
  modalState: {
    activeModal: Modals.none,
    txHash: '',
    open: false,
  },
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

export const { setActiveModal } = modalsReducer.actions;

export default modalsReducer.reducer;
