import LocalStorageBackend from 'i18next-localstorage-backend';
import XHRBackEnd from 'i18next-xhr-backend';

export const isDevelopmentEnv = true;

export const backEnds = isDevelopmentEnv ? [XHRBackEnd] : [LocalStorageBackend, XHRBackEnd];

export const loadPath = () => '/locales/{{lng}}/{{ns}}.json';

export const backEndOptions = isDevelopmentEnv
  ? [{ loadPath }]
  : [{ prefix: 'phenom_locale_', versions: { en: 'v1', rus: 'v1' } }, { loadPath }];
