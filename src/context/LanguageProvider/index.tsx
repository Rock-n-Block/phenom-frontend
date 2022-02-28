import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { i18n, TFunction } from 'i18next';

export const availableLanguages = ['en', 'rus'] as const;
export type TAvailableLanguages = typeof availableLanguages[number];

type TLocalList = {
  id: number;
  name: string;
  locale: TAvailableLanguages;
};

interface ILanguageContext {
  currentLanguage: TAvailableLanguages;
  isReady: boolean;
  locales: TLocalList[];
  currentNS: string;
  i18nProvider: i18n;
  setReady: (state: boolean) => void;
  loadNamespaces: (ns: string) => void;
  changeLanguage: (lang: TAvailableLanguages) => Promise<boolean>;
  hasNamespaceLoaded: (ns: string) => boolean;
  setEntityPreferredLocale: (locale: TAvailableLanguages) => void;
  t: TFunction;
}

const LanguageContext = createContext<ILanguageContext>({} as ILanguageContext);

interface ILanguageProvider {
  i18nProvider: i18n;
}

const LanguageProvider: FC<ILanguageProvider> = ({ children, i18nProvider }) => {
  const [currentLanguage, setCurrentLanguage] = useState<TAvailableLanguages>('en');
  const [currentNS, setCurrentNS] = useState<string>(i18nProvider.options.defaultNS || '');
  const [isReady, setIsReady] = useState<boolean>(false);
  const [locales] = useState<TLocalList[]>([
    {
      id: 1,
      name: 'English',
      locale: 'en',
    },
    {
      id: 2,
      name: 'Russian',
      locale: 'rus',
    },
  ]);

  const t = useCallback(() => i18nProvider.t, [i18nProvider.t]);

  const setReady = useCallback((state: boolean) => {
    setIsReady(state);
  }, []);

  const setLang = useCallback((lang: TAvailableLanguages) => {
    setCurrentLanguage(lang);
  }, []);

  const loadNamespaces = useCallback(
    (ns: string) => {
      setReady(false);
      i18nProvider.loadNamespaces(ns).then(() => {
        i18nProvider.setDefaultNamespace(ns);
        setCurrentNS(ns);
        console.log(`set default namespace: ${i18nProvider.options.defaultNS}`);
        setReady(true);
      });
    },
    [i18nProvider, setReady],
  );

  const changeLanguage = useCallback(
    (lang: TAvailableLanguages) => {
      setReady(false);
      return i18nProvider.changeLanguage(lang).then(() => {
        setReady(true);
        if (lang in availableLanguages) {
          setLang(lang);
          return true;
        }
        const sliceLang = lang.toLocaleLowerCase().slice(0, 2) as TAvailableLanguages;
        if (sliceLang in availableLanguages) {
          setLang(sliceLang);
          return true;
        }
        return false;
      });
    },
    [i18nProvider, setLang, setReady],
  );

  const hasNamespaceLoaded = useCallback(
    (ns: string) => {
      return i18nProvider.options.ns?.indexOf(ns) !== -1;
    },
    [i18nProvider.options.ns],
  );

  const setEntityPreferredLocale = useCallback(
    (locale: TAvailableLanguages) => {
      changeLanguage(locale);
    },
    [changeLanguage],
  );

  useEffect(() => {
    i18nProvider.on('languageChanged', () => setReady(false));
    if (i18nProvider && i18nProvider.language) {
      setLang(i18nProvider.language.slice(0, 2).toLocaleLowerCase() as TAvailableLanguages);
    }
  }, [i18nProvider, setLang, setReady]);

  const values = useMemo(
    () => ({
      currentLanguage,
      isReady,
      locales,
      setReady,
      loadNamespaces,
      changeLanguage,
      hasNamespaceLoaded,
      setEntityPreferredLocale,
      t,
      currentNS,
      i18nProvider,
    }),
    [
      changeLanguage,
      currentLanguage,
      currentNS,
      hasNamespaceLoaded,
      isReady,
      loadNamespaces,
      locales,
      setEntityPreferredLocale,
      setReady,
      t,
      i18nProvider,
    ],
  );

  return <LanguageContext.Provider value={values}>{children}</LanguageContext.Provider>;
};

/**
 *
 * @description
 * * currentLanguage: TAvailableLanguages;
 * * isReady: boolean;
 * * locales: TLocalList[];
 * * setReady: (state: boolean) => void;
 * * loadNamespaces: (ns: string) => void;
 * * changeLanguage: (lang: TAvailableLanguages) => Promise<boolean>;
 * * hasNamespaceLoaded: (ns: string) => boolean;
 * * setEntityPreferredLocale: (locale: TAvailableLanguages) => void;
 */
export const useLanguage = () => {
  return useContext(LanguageContext);
};

export default LanguageProvider;
