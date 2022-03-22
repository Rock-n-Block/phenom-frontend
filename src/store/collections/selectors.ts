import type { State, CollectionsState } from 'types';

export default {
  getCollections: (state: State): CollectionsState => state.collections,
  // eslint-disable-next-line max-len
  getProp:
    <T extends keyof CollectionsState>(propKey: T) =>
    (state: State) =>
      state.collections[propKey],
};
