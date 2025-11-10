'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TranslationsContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (namespace: string, key: string, params?: any) => string;
}

const TranslationsContext = createContext<TranslationsContextType | null>(null);

interface TranslationsProviderProps {
  children: ReactNode;
}

export function TranslationsProvider({ children }: TranslationsProviderProps) {
  const [locale, setLocale] = useState('fr'); // Default to French
  const [translations, setTranslations] = useState<Record<string, any>>({});

  // Load translations whenever locale changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const modules = await Promise.all([
          import(`@/locales/${locale}/common.json`),
          import(`@/locales/${locale}/navigation.json`),
          import(`@/locales/${locale}/homepage.json`),
          import(`@/locales/${locale}/forms.json`),
          import(`@/locales/${locale}/legal.json`),
          import(`@/locales/${locale}/about.json`),
          import(`@/locales/${locale}/contact.json`),
          import(`@/locales/${locale}/loans.json`),
          import(`@/locales/${locale}/prets.json`),
          import(`@/locales/${locale}/footer.json`),
          import(`@/locales/${locale}/components.json`)
        ]);
        
        setTranslations({
          common: modules[0].default,
          navigation: modules[1].default,
          homepage: modules[2].default,
          forms: modules[3].default,
          legal: modules[4].default,
          about: modules[5].default,
          contact: modules[6].default,
          loans: modules[7].default,
          prets: modules[8].default,
          footer: modules[9].default,
          components: modules[10].default,
        });
      } catch (error) {
        console.error('Translation loading error:', error);
      }
    };

    loadTranslations();
  }, [locale]); // ✅ Added locale dependency

  // Load initial locale from localStorage
  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale && (savedLocale === 'fr' || savedLocale === 'en')) {
      setLocale(savedLocale);
    }
  }, []);

  // Save locale to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred-locale', locale);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (namespace: string, key: string, params?: any): string => {
    const ns = translations[namespace];
    if (!ns) return key;
    
    const keys = key.split('.');
    let value = ns;
    for (const k of keys) {
      value = value?.[k];
    }
    
    let result = value || key;
    if (params && typeof result === 'string') {
      Object.keys(params).forEach(param => {
        result = result.replace(`{{${param}}}`, params[param]);
      });
    }
    
    return result;
  };

  return (
    <TranslationsContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationsProvider');
  }
  return context;
}
