import { ProfileState, State } from 'types';

const profileSelector = {
  getProfile: (state: State): ProfileState => state.profile,
  getProp:
    <T extends keyof ProfileState>(key: T) =>
    (state: State): ProfileState[T] =>
      state.profile[key],
};

export default profileSelector;
