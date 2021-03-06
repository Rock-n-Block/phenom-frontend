import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { checkWhitelist, login, updateUserInfo } from 'store/user/actions';
import { disconnectWalletState, updateChain, updateProvider } from 'store/user/reducer';
import userSelector from 'store/user/selectors';

import { Subscription } from 'rxjs';

import { useShallowSelector } from 'hooks';
import { WalletService } from 'services';
import { Chains, IWalletConnext, State, TNullable, UserState, WalletProviders } from 'types';

const WCContext = createContext({} as IWalletConnext);

const WalletConnectContext: FC = ({ children }) => {
  const [currentSubscriber, setCurrentSubscriber] = useState<TNullable<Subscription>>();
  const WalletConnect = useRef<WalletService>(new WalletService());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    address,
    key,
    provider: WalletProvider,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

  const subscriberSuccess = useCallback(
    (data: any) => {
      if (data.name === 'accountsChanged') {
        dispatch(login({ address: data.address, web3Provider: WalletConnect.current.Web3() }));
        toast.info('Please sign login message at MetaMask');
      }
    },
    [dispatch],
  );

  const subscriberError = useCallback(
    (err: any) => {
      console.error(err);
      if (err.code === 4) {
        WalletConnect.current.resetConnect();
        toast.error('You changed to wrong network. Please choose Binance-Smart-Chain');
        dispatch(disconnectWalletState());
      }
    },
    [dispatch],
  );

  const connect = useCallback(
    async (provider: WalletProviders, chain: Chains) => {
      const connected = await WalletConnect.current.initWalletConnect(provider, chain);
      if (connected) {
        try {
          if (!currentSubscriber) {
            const sub = WalletConnect.current
              .eventSubscribe()
              .subscribe(subscriberSuccess, subscriberError);
            setCurrentSubscriber(sub);
          }
          const accountInfo: any = await WalletConnect.current.getAccount();
          if (key?.length && address === accountInfo?.address) {
            dispatch(updateUserInfo({ web3Provider: WalletConnect.current.Web3() }));

            dispatch(checkWhitelist({ web3Provider: WalletConnect.current.Web3() }));
            return;
          }

          if (accountInfo.address) {
            dispatch(
              login({ address: accountInfo.address, web3Provider: WalletConnect.current.Web3() }),
            );
            dispatch(updateProvider({ provider: accountInfo.type }));
            dispatch(updateChain({ chain }));

            dispatch(checkWhitelist({ web3Provider: WalletConnect.current.Web3() }));
          }

          // setCurrentSubscriber(sub);
        } catch (error: any) {
          console.log(error);
          if (error.code === 4) {
            window.open(
              `https://metamask.app.link/dapp/${
                window.location.hostname + window.location.pathname
              }/?utm_source=mm`,
            );
          }
        }
      }
    },
    [address, currentSubscriber, dispatch, key.length, subscriberError, subscriberSuccess],
  );

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    WalletConnect.current.resetConnect();
    currentSubscriber?.unsubscribe();
    setCurrentSubscriber(null);
    navigate('/');
  }, [currentSubscriber, dispatch, navigate]);

  useEffect(() => {
    if (WalletProvider) {
      connect(WalletProviders.metamask, Chains.bsc);
    }
  }, [WalletProvider, connect]);

  const values = useMemo(
    () => ({ connect, disconnect, walletService: WalletConnect.current }),
    [connect, disconnect],
  );

  return <WCContext.Provider value={values}>{children}</WCContext.Provider>;
};

export const useWalletConnectContext = () => useContext(WCContext);

export default WalletConnectContext;
