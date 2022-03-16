import { Chains, IConnectWallet, IContracts } from 'types';

import { erc20Abi, marketPlaceAbi, nftAbi } from './abi';
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
  marketpalce = 'marketpalce',
  nft = 'nft',
}

export type IContractsNames = keyof typeof ContractsNames;

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts: {
    [ContractsNames.token]: {
      testnet: {
        address: {
          [Chains.bsc]: '0x906041Be37F54D50c37c76c31351dA7CDddb0eBc',
        },
        abi: erc20Abi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: erc20Abi,
      },
    },
    [ContractsNames.marketpalce]: {
      testnet: {
        address: {
          [Chains.bsc]: '0xFfa329d313d371ECC595539847a300eF231bEafB',
        },
        abi: marketPlaceAbi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: marketPlaceAbi,
      },
    },
    [ContractsNames.nft]: {
      testnet: {
        address: {
          [Chains.bsc]: '0xcec38C5b1B4b869835623CFCB7F42a206589A446',
        },
        abi: nftAbi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: nftAbi,
      },
    },
  },
};
