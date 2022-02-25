/* eslint-disable @typescript-eslint/ban-ts-comment */

import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-xhr-backend';

import { backEndOptions, backEnds, isDevelopmentEnv } from './utils';

if (isDevelopmentEnv) {
  window.i18n = i18n;
}

i18n
  .use(backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    // @ts-ignore
    ns: ['common', 'Home', 'Explore'],
    defaultNS: 'Home',
    fallbackLng: 'en',
    debug: true,
    load: 'languageOnly',
    returnObjects: true,
    joinArrays: true,
    cleanCode: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      useSuspense: false,
    },
    backend: {
      backends: backEnds,
      backendOptions: backEndOptions,
    },
  });

export default i18n;
