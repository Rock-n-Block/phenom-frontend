import type { State, UserState } from 'types';

export default {
  getUser: (state: State): UserState => state.user,
  getProp:
    <T extends keyof UserState>(propKey: T) =>
    (state: State) =>
      state.user[propKey],
};
