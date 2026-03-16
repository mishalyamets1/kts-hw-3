'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Locale, translations } from '@/i18n/translations';

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
};

const STORAGE_KEY = 'locale';

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const COOKIE_KEY = 'locale';

export default function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    localStorage.setItem(STORAGE_KEY, nextLocale);
    document.cookie = `${COOKIE_KEY}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const toggleLocale = useCallback(() => {
    const nextLocale: Locale = locale === 'en' ? 'ru' : 'en';
    setLocale(nextLocale);
  }, [locale, setLocale]);

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: string) => {
      return translations[locale][key] ?? key;
    },
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, setLocale, t, toggleLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
};
