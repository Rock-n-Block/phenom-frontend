import type { Dispatch as DispatchReact } from 'react';

import { NftsState } from 'types';

import { ModalsInitialState } from './modals';
import { UserState } from './user';

export * from './modals';
export * from './user';
export * from './nfts';
export * from './ui';

export type Action<T, P = any, M = void> = { type: T; payload?: P; meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;

export type State = {
  modals: ModalsInitialState;
  user: UserState;
  nfts: NftsState,
};
