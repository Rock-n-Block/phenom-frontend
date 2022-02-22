import { i18n } from 'i18next';

export * from './components';
export * from './hooks';

declare global {
  interface Window {
    i18n: i18n;
  }
}
