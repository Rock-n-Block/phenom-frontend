// eslint-disable-next-line no-shadow
export enum Modals {
  ApprovePending = 'ApprovePending',
  ApproveRejected = 'ApproveRejected',
  SendPending = 'SendPending',
  SendRejected = 'SendRejected',
  SendSuccess = 'SendSuccess',
  Transfer = 'Transfer',
  ChooseSeller = 'ChooseSeller',
  Burn = 'Burn',
  none = '',
}

export interface ModalState {
  activeModal: Modals;
  txHash: string;
  open: boolean;
}

export type ModalsInitialState = {
  modalState: ModalState;
};
