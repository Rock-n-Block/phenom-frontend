import type { Dispatch as DispatchReact } from 'react';

export * from './modals';
export * from './ui';
export * from './user';
export * from './nfts';
export * from './profile';
export * from './collections';

export type Action<T, P = any, M = void> = { type: T; payload?: P; meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;
