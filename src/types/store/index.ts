import type { Dispatch as DispatchReact } from 'react';

import { NftsState } from 'types';

import { ModalsInitialState } from './modals';
import { UserState } from './user';

export * from './modals';
export * from './ui';
export * from './user';

export type Action<T, P = any, M = void> = { type: T; payload?: P; meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;

export type State = {
  user: UserState;
  modals: ModalsInitialState;
  nfts: NftsState;
};
