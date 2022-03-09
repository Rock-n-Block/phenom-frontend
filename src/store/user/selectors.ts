import type { State, UserState } from 'types';

export default {
  getUser: (state: State): UserState => state.user,
  // eslint-disable-next-line max-len
  getProp: <T extends keyof UserState>(propKey: T) => (state: State) => state.user[propKey],
};
