import type { State, NftsState } from 'types';

export default {
  getNfts: (state: State): NftsState => state.nfts,
  // eslint-disable-next-line max-len
  getProp:
    <T extends keyof NftsState>(propKey: T) =>
    (state: State) =>
      state.nfts[propKey],
};
