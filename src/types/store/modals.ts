// eslint-disable-next-line no-shadow
export enum Modals {
  ApprovePending = 'ApprovePending',
  ApproveRejected = 'ApproveRejected',
  SendPending = 'SendPending',
  SendRejected = 'SendRejected',
  SendSuccess = 'SendSuccess',
  SendError = 'SendError',
  Transfer = 'Transfer',
  ChooseSeller = 'ChooseSeller',
  Burn = 'Burn',
  none = 'none',
}

export interface ModalState {
  activeModal: Modals;
  txHash: string;
  open: boolean;
}

export interface ModalProps {
  [key: string]: any;
}

export type ModalsInitialState = {
  modalState: ModalState;
  modalProps: ModalProps;
};
