import { Chains, IConnectWallet, IContracts } from 'types';

import { erc20Abi } from './abi';
import { isMainnet } from './constants';

export const chains: {
  [key: string]: {
    name: string;
    chainId: number;
    provider: {
      [key: string]: any;
    };
    img?: any;
  };
} = {
  'Binance-Smart-Chain': {
    name: 'Binance-Smart-Chain',
    chainId: isMainnet ? 56 : 97,
    provider: {
      MetaMask: { name: 'MetaMask' },
      /* WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              [isMainnet ? 56 : 97]: isMainnet
                ? 'https://bsc-dataseed.binance.org/'
                : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            },
            chainId: isMainnet ? 56 : 97,
          },
        },
      }, */
    },
  },
};

export const connectWallet = (newChainName: string): IConnectWallet => {
  const chain = chains[newChainName];
  return {
    network: {
      chainName: chain.name,
      chainID: chain.chainId,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

// eslint-disable-next-line no-shadow
export enum ContractsNames {
  token = 'token',
}

export type IContractsNames = keyof typeof ContractsNames;

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts: {
    [ContractsNames.token]: {
      mainnet: {
        abi: erc20Abi,
      },
      testnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: erc20Abi,
      },
    },
  },
};
