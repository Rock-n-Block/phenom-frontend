import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { LanguageProvider, WalletProvider } from 'context';

import { combineProviders } from 'utils';

import { App } from './App';
import i18n from './i18n';

import 'styles/index.scss';

const CombinedProviders = combineProviders([
  WalletProvider,
  [LanguageProvider, { i18nProvider: i18n }],
  Router,
  [PersistGate, { loading: null, persistor: store.persistor }],
  [Provider, { store: store.store }],
]);

const root = document.getElementById('root');
const app = (
  <CombinedProviders>
    <App />
  </CombinedProviders>
);

ReactDOM.render(app, root);
