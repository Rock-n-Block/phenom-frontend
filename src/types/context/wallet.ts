import { WalletService } from 'services';
import { Chains, WalletProviders } from 'types';

export interface IWalletConnext {
  connect: (provider: WalletProviders, chain: Chains) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
}
