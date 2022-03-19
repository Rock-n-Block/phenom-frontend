import { Token } from 'types/api';

export type initialTx = {
  chainId: number;
  data: string;
  gas: number;
  gasPrice: number;
  nonce: number;
  to: string;
  value: number;
};

export type createTokenResponse = {
  initial_tx: initialTx;
  token: Token;
};
