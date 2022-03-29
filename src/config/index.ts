import { Chains, IConnectWallet, IContracts } from 'types';

import { erc20Abi, erc721Abi, erc1155Abi, marketPlaceAbi, whitelistAbi } from './abi';
import { isMainnet } from './constants';

export const chains: {
  [key: string]: {
    name: string;
    chainId: number;
    provider: {
      [key: string]: any;
    };
    img?: any;
    scanner?: string;
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
    scanner: isMainnet ? 'https://bscscan.com/' : 'https://testnet.bscscan.com/',
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
  erc721 = 'erc721',
  erc1155 = 'erc1155',
  whitelist = 'whitelist',
}

export type IContractsNames = keyof typeof ContractsNames;

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts: {
    [ContractsNames.whitelist]: {
      testnet: {
        address: {
          [Chains.bsc]: '0x3F79F1DEDc1596179d8fCfd62270eCCC344C6517',
        },
        abi: whitelistAbi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: whitelistAbi,
      },
    },
    [ContractsNames.token]: {
      testnet: {
        address: {
          [Chains.bsc]: '0xcec38C5b1B4b869835623CFCB7F42a206589A446',
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
    [ContractsNames.erc721]: {
      testnet: {
        address: {
          [Chains.bsc]: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
        },
        abi: erc721Abi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: erc721Abi,
      },
    },
    [ContractsNames.erc1155]: {
      testnet: {
        address: {
          [Chains.bsc]: '0xf58248adaDE39b1ECA2e59Ff6219642aE0Ea2Bf5',
        },
        abi: erc1155Abi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: erc1155Abi,
      },
    },
  },
};
